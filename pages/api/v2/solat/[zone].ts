import {NextApiRequest, NextApiResponse} from "next";
import {initializeApp} from "firebase/app";
import {collection, doc, getDoc, getDocs, getFirestore, Timestamp} from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {zone, year, month, debug} = req.query;

    const utcDate = new Date();
    // Set the time zone to GMT+8
    const gmt8Options = { timeZone: 'Asia/Kuala_Lumpur' };
    const gmt8Date = new Intl.DateTimeFormat('en-US', gmt8Options).format(utcDate);
    const malaysiaCurrentDate = new Date(gmt8Date);

    // Extract the year from the GMT+8 date
    let queryYear: number;
    if (!year) {
        queryYear = malaysiaCurrentDate.getFullYear();        
    } else {
        queryYear = parseInt(year.toString());
    }

    // check for valid year
    if (isNaN(queryYear)) {
        res.status(500).json({
            error: `Invalid year: ${year.toString()}`
        });
        return;
    }

    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: "malaysia-waktu-solat.firebaseapp.com",
        databaseURL: "https://malaysia-waktu-solat.firebaseio.com",
        projectId: "malaysia-waktu-solat",
        storageBucket: "malaysia-waktu-solat.appspot.com",
        messagingSenderId: "1012545476549",
        appId: "1:1012545476549:web:eeefcfec57ab2ab05a9dac",
        measurementId: "G-8K4GZ6RK8R"
    };

    // Initialize Firebase
    const firebaseApp = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(firebaseApp);

    // get current month (by its name)
    /// NOTE: Jangan pakai 'en-MY' sebab beza. Cth SEPT vs SEP
    const currentMonth = malaysiaCurrentDate.toLocaleString('en-US', {
        month: 'short'
    });

    // check month if an integer
    let fetch_for_month;
    if (month === undefined) {
        fetch_for_month = currentMonth.toUpperCase();
    } else {

        try {
            const monthNumber = parseInt(month.toString());

            // check if month is within 1-12
            if (monthNumber < 1 || monthNumber > 12) throw new Error(`Invalid month: ${month.toString()}. Please specify month between 1-12`)

            if (isNaN(monthNumber)) throw new Error(`Invalid month: ${month.toString()}`)
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            fetch_for_month = monthNames[monthNumber - 1];

        } catch (e) {
            return res.status(500).json({
                error: `${e.message}`
            });
        }
    }

    console.log(`waktusolat/${queryYear}/${fetch_for_month}`)

    // load db collection
    const monthCollectionRef = collection(db, `waktusolat/${queryYear}/${fetch_for_month}`);

    // get document with ID "SGR01" from collection
    const docRef = doc(monthCollectionRef, zone.toString().toUpperCase());

    // retrieve document data
    const docSnapshot = await getDoc(docRef);

    // check if document exists
    if (!docSnapshot.exists()) {
        res.status(404).json({
            error: `No data found for zone: ${zone.toString().toUpperCase()} for ${fetch_for_month.toString().toUpperCase()}/${queryYear}`
        });
        return;
    }

    const documentData = docSnapshot.data();

    // build response
    let response = {};
    if (debug && debug == '1') response['debug'] = {
        'malaysiaDate' : malaysiaCurrentDate.toLocaleDateString()
    }
    response['zone'] = zone.toString().toUpperCase()
    response['year'] = queryYear;
    response['month'] = fetch_for_month;

    // record the last update time
    const rootCollection = collection(db, `waktusolat`);
    const yearDocRef = doc(rootCollection, queryYear.toString());
    const yearDocData = await getDoc(yearDocRef);
    const lastFetchTimestamp: Timestamp = yearDocData.data().last_updated[fetch_for_month];
    response['last_updated'] = lastFetchTimestamp.toDate();

    // lastly, assign the prayer time data
    response['prayers'] = documentData.prayerTime;

    res.setHeader('Cache-Control', 'public, s-maxage=43200') // 12 hours cache
    res.status(200).json(response)
}