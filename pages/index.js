import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home(props) {
  const log = props;
  const d = new Date();
  const month = d.getMonth() + 1; // month in value 0 to 11
  const year = d.getFullYear();

  return (
      <div className={styles.container}>
        <Head>
          <title>MPT Server</title>
          <meta name="description" content="Serving prayer time api and some endpoint for MPT internal use"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://mpt-server.vercel.app">MPT Server!</a>
          </h1>

          <p className={styles.description}>
            Malaysia prayer time API is <b>available</b>!
          </p>

          <div className={styles.grid}>
            <p className={styles.textContent}>
              Prayer times data will be refresh from JAKIM's server at monthly intervals. Fetcher is scheduled
              to run
              (typically) at 8.00 am on the first day of the month.
            </p>
            <div className={styles.textContent}>
              <h3>Data healthiness</h3>

              <b>Latest fetch:</b> {log.fetcher_last_run}
              {log.valid_month == month && log.valid_year == year ? <span
                  className="badge bg-success">Healthy</span> : <span
                  className="badge bg-warning text-dark">Unuseable</span>}
            </div>

            <div className={styles.textContent}>
              <h3>Usage</h3>
              <code className={styles.code}>GET</code>
              <br/>
              <code>https://mpt-server.vercel.app/api/solat/[locationCode]</code>
                <br/><br/>
              View all location codes <a href="locations">here</a>
            </div>

            <div className={styles.textContent}>
              <h3>Disclaimer</h3>
              <p>
                This API was not meant for public use. It is designed for the <b>Malaysia
                Prayer Time app</b>. However, there is no harm in using them in
                small/medium applications.
              </p>
            </div>

          </div>

          <div className={styles.grid}>
            <a href="https://play.google.com/store/apps/details?id=live.iqfareez.waktusolatmalaysia"
               className={styles.card}>
              <p>Download MPT app &rarr;</p>
            </a>

            <a href="https://waktusolat.iqfareez.com" className={styles.card}>
              <p>Go to MPT Website &rarr;</p>
            </a>

            <a href="https://github.com/iqfareez/mpt-server" className={styles.card}>
              <p>GitHub &rarr;</p>
            </a>

          </div>
        </main>
        <footer className={styles.footer}>
          <a
              href="https://iqfareez.com"
              target="_blank"
              rel="noopener noreferrer"
          >
            Muhammad Fareez Iqmal
          </a>
        </footer>
      </div>
  )
}


// Fetching data from the JSON file
import fsPromises from 'fs/promises';
import path from 'path'

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'json/log.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData
  }
}