import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MPT Server</title>
        <meta
          name="description"
          content="Serving prayer time api and some endpoint for MPT internal use"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://mpt-server.vercel.app">MPT Server!</a>
        </h1>

        <p className={styles.description}>
          Malaysia prayer time API is <b>available</b>!
        </p>

        <div className={styles.grid}>

        </div>

        <div className={styles.grid}>
          <a
            href="https://play.google.com/store/apps/details?id=live.iqfareez.waktusolatmalaysia"
            className={styles.card}
          >
            <p>Download MPT app &rarr;</p>
          </a>

          <a
            href="https://mywaktusolat.vercel.app/api"
            className={styles.card}
          >
            <p>Docs &rarr;</p>
          </a>

          <a
            href="https://github.com/iqfareez/mpt-server"
            className={styles.card}
          >
            <p>GitHub &rarr;</p>
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://iqfareez.com"
        >
          Muhammad Fareez Iqmal
        </a>
      </footer>
    </div>
  );
}
