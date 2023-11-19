import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs/promises';
import handlebars from 'handlebars';

export default async function handler(req, res) {

    const browser = await puppeteer.connect({
        browserWSEndpoint: `wss://browserless-production-cd51.up.railway.app/`,
    });
    const page = await browser.newPage();

    // Get the path to the Handlebars template file
    const templateFilePath = path.join(process.cwd(), 'public/templates', 'jadual_solat.hbs');

    // Read the template content from the file
    const templateContent = await fs.readFile(templateFilePath, 'utf-8');

    // Compile the Handlebars template
    const template = handlebars.compile(templateContent);

    const prayerTimesData = [
        {
            date: '1/11/2023',
            subuh: '5:50',
            syuruk: '7:10',
            zohor: '12:30',
            asar: '4:00',
            maghrib: '6:50',
            isyak: '8:00'
        },
        {
            date: '2/11/2023',
            subuh: '5:50',
            syuruk: '7:10',
            zohor: '12:30',
            asar: '4:00',
            maghrib: '6:50',
            isyak: '8:00'
        },
        {
            date: '3/11/2023',
            subuh: '5:50',
            syuruk: '7:10',
            zohor: '12:30',
            asar: '4:00',
            maghrib: '6:50',
            isyak: '8:00'
        },
        {
            date: '4/11/2023',
            subuh: '5:50',
            syuruk: '7:10',
            zohor: '12:30',
            asar: '4:00',
            maghrib: '6:50',
            isyak: '8:00'
        }
    ];

    // Define dynamic data to be inserted into the template
    const dynamicData = {
        title: 'Jadual Waktu Solat Malaysia',
        prayerTimes: prayerTimesData,
    };

    // Render the template with dynamic data
    const htmlContent = template(dynamicData);

    await page.setContent(htmlContent);

    // Generate a PDF file
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

    // Close the browser
    await browser.close();

    // Send the generated PDF as a response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=generated.pdf');
    res.status(200).send(pdfBuffer);


}