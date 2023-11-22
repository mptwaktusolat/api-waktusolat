import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs/promises';
import handlebars from 'handlebars';
import {initializeApp} from "firebase/app";
import {collection, doc, getDoc, getFirestore} from "firebase/firestore";
import {getJakimZonesList} from '../zones'

export default async function handler(req, res) {
    const {zone, month, year} = req.query;

    if (zone === undefined || month === undefined || year === undefined) {
        return res.status(400).send({
            message: "Please specify parameter 'zone' (eg: SGR01), 'month' (eg: 11) & 'year' (eg: 2023)"
        });
    }

    // fetch prayer times data
    let response = await getPrayerData(zone, year, month);
    const prayerTimesData = response.map(item => ({
        date: `${item.day}/${month}/${year}`,
        dhuhr: formatTime(item.dhuhr),
        syuruk: formatTime(item.syuruk),
        fajr: formatTime(item.fajr),
        isha: formatTime(item.isha),
        asr: formatTime(item.asr),
        maghrib: formatTime(item.maghrib),
        hijri: item.hijri
    }));

    const browser = await puppeteer.connect({
        browserWSEndpoint: `wss://browserless-production-cd51.up.railway.app/`,
    });
    const page = await browser.newPage();

    // Get the path to the Handlebars template file
    const templateFilePath = path.join(process.cwd(), 'public/templates', 'jadual_solat.hbs');

    // Using handlebars template to build HTML with data
    const templateContent = await fs.readFile(templateFilePath, 'utf-8');
    const template = handlebars.compile(templateContent);

    // get current formatted date & time
    const today = new Date();
    const generationDate = today.toLocaleDateString('en-MY', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // construct monthYear based on req
    const reqDate = new Date(`${year}-${month}-01`);
    const monthYear = reqDate.toLocaleDateString('en-MY', {
        month: 'long',
        year: 'numeric',
    });

    const zoneName = await getZoneDetail(zone);

    // Define dynamic data to be inserted into the template
    const dynamicData = {
        title: 'Jadual Waktu Solat',
        monthYear: monthYear,
        zone: `${zone.toUpperCase()} - ${zoneName.daerah} (${zoneName.negeri})`,
        prayerTimes: prayerTimesData,
        generationDate: generationDate,
    };

    // Render the template with dynamic data
    const htmlContent = template(dynamicData);
    await page.setContent(htmlContent);

    // Generate a PDF file
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

    await browser.close();

    res.setHeader('Vercel-CDN-Cache-Control', 'max-age=43200'); // 12 hours
    res.setHeader('CDN-Cache-Control', 'max-age=28800'); // 8 hours
    res.setHeader('Cache-Control', 'max-age=1800'); // 30 minutes

    // Send the generated PDF as a response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=generated.pdf');
    res.status(200).send(pdfBuffer);
}

// This function is simplified version used in [v2/solat/[zone].ts]
async function getPrayerData(zone: string, year: number, month:number) {
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

    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month_name = monthNames[month - 1];

    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);
    const monthCollectionRef = collection(db, `waktusolat/${year}/${month_name}`);

    // get document with the requested zone from collection
    const docRef = doc(monthCollectionRef, zone.toString().toUpperCase());
    const docSnapshot = await getDoc(docRef);

    // check if document exists
    if (!docSnapshot.exists()) {
        console.log("not exists")
        return;
    }

    const documentData = docSnapshot.data();
    return  documentData.prayerTime;
}

// Function to format Unix timestamp to HH:mm
function formatTime(timestamp: number) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kuala_Lumpur'});
}

// get zone details
async function getZoneDetail(zone: string) {
    const res = await getJakimZonesList();
    return res.find(item => item.jakimCode === zone.toUpperCase());
}