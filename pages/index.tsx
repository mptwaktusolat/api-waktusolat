import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
      <div className={styles.container}>
        <Head>
          <title>MPT Server</title>
          <meta
              name="description"
              content="Serving prayer time API and some endpoints for MPT internal use"
          />
          <meta name={"og:image"} content={"https://res.cloudinary.com/iqfareez-cloud/image/upload/v1687052462/1_r0mixv.png"}/>

          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <Link href="#">MPT Server!</Link>
          </h1>

          <p className={styles.description}>
            <span>Malaysia prayer time API is <b>available</b>! Learn more on <Link className={styles.link} href={"https://waktusolat.iqfareez.com/api"}>docs</Link>.</span>
          </p>

          <div className={styles.textContent}>
              <span>See all <Link className={styles.link} href="/locations">prayer time zones</Link>.</span>
          </div>

          <div className={styles.grid}>
            <Link
                href="https://play.google.com/store/apps/details?id=live.iqfareez.waktusolatmalaysia"
                className={styles.card}
            >
              <p>MPT App &rarr;</p>
            </Link>

            <Link
                href="https://github.com/iqfareez/mpt-server"
                className={styles.card}
            >
              <p>GitHub &rarr;</p>
            </Link>
          </div>
        </main>
        <footer className={styles.footer}>
          <Link href="https://iqfareez.com">© Muhammad Fareez Iqmal</Link>
        </footer>
      </div>
  );
}
