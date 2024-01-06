import Head from "next/head";
import Link from "next/link";
import { MdNavigateNext } from "react-icons/md";
import styles from "../styles/Home.module.css";
import { TbClockCheck } from "react-icons/tb";

export default function Home() {
  return (
    <>
      <Head>
        <title>MPT Server</title>
        <meta
          name="description"
          content="Serving prayer time API and some endpoints for MPT internal use"
        />
        <meta
          property="og:title"
          content="MPT Server - Malaysia Prayer Time API"
        />
        <meta
          property={"og:image"}
          content={
            "https://res.cloudinary.com/iqfareez-cloud/image/upload/v1687052462/1_r0mixv.png"
          }
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center justify-center min-h-screen flex-col">
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col space-y-8 text-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl/none">
                  <span>Welcome to </span>
                  <span className="text-pink-500 dark:text-pink-300" >Waktu Solat API</span>
                  <span>!</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  This REST API provides accurate prayer times for all <Link className={`font-semibold ${styles.link}`} href="/locations">locations</Link> in Malaysia. The data is obtained from JAKIM
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 sm:px-6 sm:py-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 group"
                  href="/docs"
                >
                  <span>Get Started</span>
                  <MdNavigateNext className="translate-x-1 group-hover:translate-x-2 transition"/>
                </Link>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 sm:px-6 sm:py-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="https://mpt-data-health.web.app/"
                >
                  Data health
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center h-16 px-4 border-t md:px-6 mt-auto">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2024 <a className="hover:underline underline-offset-4" href="https://iqfareez.com">Muhammad Fareez</a>. All rights reserved.
        </p>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm hover:underline underline-offset-4" href="https://docs.google.com/forms/d/e/1FAIpQLSe-zlZBW-8hO9XPDlLf-K7AUxtgupmD6bo4iouyLXFPAMnxFA/viewform?usp=sf_link">
            Feedback
          </Link>
          <Link className="text-sm hover:underline underline-offset-4" href="https://github.com/mptwaktusolat/mpt-server">
            GitHub
          </Link>
        </nav>
      </footer>
    </>
  );
}
