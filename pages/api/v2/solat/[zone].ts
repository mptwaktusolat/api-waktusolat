import {NextApiRequest, NextApiResponse} from "next";
import {initializeApp} from "firebase/app";
import {collection, doc, getDoc, getDocs, getFirestore, Timestamp} from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {zone, year, month} = req.query;

    if (year === undefined) {
        // check is body is undefined or empty body "{}"
        return res.status(400).send({
            message: "Please specify parameter 'year'"
        });
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

    // get current year & month (by its name)
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().toLocaleString('en-MY', {
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

    const fetch_for_year = year || currentYear;

    console.log(`waktusolat/${fetch_for_year}/${fetch_for_month}`)

    // load db collection
    const monthCollectionRef = collection(db, `waktusolat/${fetch_for_year}/${fetch_for_month}`);

    // get document with ID "SGR01" from collection
    const docRef = doc(monthCollectionRef, zone.toString().toUpperCase());

    // retrieve document data
    const docSnapshot = await getDoc(docRef);

    // check if document exists
    if (!docSnapshot.exists()) {
        res.status(404).json({
            error: `No data found for zone: ${zone.toString().toUpperCase()} for ${fetch_for_month.toString().toUpperCase()}/${fetch_for_year}`
        });
        return;
    }

    const documentData = docSnapshot.data();

    // build response
    let response = {};
    response['zone'] = zone.toString().toUpperCase()
    response['year'] = currentYear;
    response['month'] = fetch_for_month;

    // record the last update time
    const rootCollection = collection(db, `waktusolat`);
    const yearDocRef = doc(rootCollection, fetch_for_year.toString());
    const yearDocData = await getDoc(yearDocRef);
    const lastFetchTimestamp: Timestamp = yearDocData.data().last_updated[fetch_for_month];
    response['last_updated'] = lastFetchTimestamp.toDate();

    // lastly, assign the prayer time data
    response['prayers'] = documentData.prayerTime;

    res.status(200).json(response)
}