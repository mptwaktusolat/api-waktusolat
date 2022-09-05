import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { randomUUID } from 'crypto';

/* POST feedback. */
export default async function handler(req, res) {

    if (!req.body){
        return res.status(400).send('No data received');
    }

    const firebaseConfig = {
        apiKey: "AIzaSyABU2oLGpbQOlaaQ-6joJDBevJ4iyfu-6k",
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

    const uuid = randomUUID();
    // slice uuid and get the last part after -
    const uuidLastPart = uuid.slice(uuid.lastIndexOf('-') + 1);
    // trim uuid first 5 character
    const uuidFirst5Char = uuidLastPart.slice(0, 5);
    // build a ticket ID starting with "MPT" added with uuidLastPart
    const feedbackId = `MPT-${uuidFirst5Char.toUpperCase()}`;

    // get current date and time formatted in MY
    const localDateTime = new Date().toLocaleString('en-MY', {
        timeZone: 'Asia/Kuala_Lumpur',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
        hour12: false
    });

    // append with the payload from client
    var payload = {
        'Date creation': serverTimestamp(),
        'ticketId': feedbackId,
        'formattedDate': localDateTime,
        ...req.body
    }

    try {
        // const docRef = await addDoc(collection(db, "tests"), payload);
        const docRef = doc(collection(db, "reports"), feedbackId);
        await setDoc(docRef, payload);
        res.json({ 'result': 'success', 'id': docRef.id, payload: payload });
    } catch (e) {
        console.log(e);
        res.json({ 'result': 'failed', 'error': e });
    }
}

