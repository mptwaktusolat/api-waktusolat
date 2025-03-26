import Head from "next/head";
import Link from "next/link";
import { MdNavigateNext } from "react-icons/md";
import styles from "../styles/Home.module.css";
import Footer from "@/components/footer";
import TopBanner from "@/components/top-banner";

export default function Home() {
  return (
    <>
      <Head>
        <title>Waktu Solat API</title>
        <meta
          name="description"
          content="Easily integrate Waktu Solat API into your applications for accurate prayer times and prayer zone detection. Simplify your development process with our reliable Islamic prayer time solution."
        />
        <meta
          property="og:title"
          content="Waktu Solat API - Malaysia Prayer Time API"
        />
        <meta
          property={"og:image"}
          content={"https://mpt-server.vercel.app/metaimage.png"}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBanner>
        <strong>Latest:</strong> Data for new zone: <strong>PHG07</strong> is now available!
      </TopBanner>
      <main className="flex items-center justify-center min-h-svh flex-col relative overflow-hidden">
        {/* Subtle glowing object */}
        <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[100px] opacity-50"></div>

        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48 relative z-10">
          <div className="px-4 md:px-6">
            <div className="flex flex-col space-y-8 text-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl/none">
                  <span>Welcome to </span>
                  <span className="text-pink-500 dark:text-pink-300">
                    Waktu Solat API
                  </span>
                  <span>!</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-300">
                  This REST API provides accurate prayer times for all{" "}
                  <Link
                    className={`font-semibold ${styles.link} dark:text-pink-300 dark:hover:text-pink-200`}
                    href="/locations"
                  >
                    locations
                  </Link>{" "}
                  in Malaysia, based on data from {" "}
                  <a
                    className={`font-semibold ${styles.link} dark:text-pink-300 dark:hover:text-pink-200`}
                    href="https://www.e-solat.gov.my/"
                  >
                    JAKIM
                  </a>.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 sm:px-6 sm:py-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-pink-500 dark:text-white dark:hover:bg-pink-600 dark:focus-visible:ring-pink-300 group"
                  href="/docs"
                >
                  <span>Get Started</span>
                  <MdNavigateNext className="translate-x-1 group-hover:translate-x-2 transition" />
                </Link>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 sm:px-6 sm:py-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-pink-500 dark:bg-transparent dark:text-pink-300 dark:hover:bg-pink-500/10 dark:hover:text-pink-200 dark:focus-visible:ring-pink-300"
                  href="/health"
                >
                  Data health
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

