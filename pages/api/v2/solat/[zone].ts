import {NextApiRequest, NextApiResponse} from "next";
import {initializeApp} from "firebase/app";
import {collection, doc, getDoc, getDocs, getFirestore, Timestamp} from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {zone, year, month} = req.query;
    console.log(zone, year, month);
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
        month: 'long'
    });

    // check month if an integer
    let monthName;
    if (!isNaN(parseInt(month.toString()))) {
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const monthInt = parseInt(month.toString());
        monthName = monthNames[monthInt - 1];
    }

    const fetch_for_year = year || currentYear;
    const fetch_for_month = monthName !== undefined && monthName !== null ?
        monthName : (month !== undefined && month !== null ?
            month : currentMonth);

    // load db collection
    const monthCollectionRef = collection(db, `waktusolat/${fetch_for_year}/${fetch_for_month}`);

    // get document with ID "SGR01" from collection
    const docRef = doc(monthCollectionRef, zone.toString().toUpperCase());

    // retrieve document data
    const docSnapshot = await getDoc(docRef);

    // check if document exists
    if (!docSnapshot.exists()) {
        console.log("Document does not exist!");
        res.status(404).json({
            error: `No zone found for code: ${zone}`
        });
        return;
    }

    const documentData = docSnapshot.data();

    // build response
    let response = {};
    response['zone'] = zone;
    response['year'] = currentYear;
    response['month'] = fetch_for_month;

    // record the last update time
    const rootCollection = collection(db, `waktusolat`);
    const yearDocRef = doc(rootCollection, fetch_for_year.toString());
    const yearDocData = await getDoc(yearDocRef);
    const lastFetchTimestamp: Timestamp = yearDocData.data().last_updated[fetch_for_month];
    response['last_updated'] = lastFetchTimestamp.toDate().toLocaleDateString();

    // lastly, assign the prayer time data
    response['prayers'] = documentData.prayerTime;

    res.status(200).json(response)
}