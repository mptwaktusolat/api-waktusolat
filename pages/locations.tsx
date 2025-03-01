import Head from 'next/head'
import Link from "next/link";
import useSWR from 'swr';
import Toastify from 'toastify-js'
import styles from "../styles/Locations.module.css";
import "toastify-js/src/toastify.css"
import { RotatingTriangles } from "react-loader-spinner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Locations() {
    const { data, error } = useSWR('/api/zones', fetcher);

    const copyToClipBoard = async copyMe => {
        try {
            await navigator.clipboard.writeText(copyMe);
            Toastify({
                text: "Copied",
                duration: 1000,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                style: {
                    background: "linear-gradient(to right, #457fca, #5691c8)",
                },
            }).showToast();
        } catch (err) {
            console.log('Copy failed', err);
        }
    };

    function groupBy(data, key) {
        return data.reduce((acc, x) => {
            acc[x[key]] = [...(acc[x[key]] || []), x];
            return acc;
        }, {});
    }

    if (error) return <div>Failed to load</div>;

    const zones: Map<String, any> = groupBy(data ?? [], 'negeri');

    return (
        <>
            <Head>
                <title>Locations | Waktu Solat API</title>
                <meta name="description" content="List of JAKIM prayer zones" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='mx-auto max-w-fit px-4 sm:px-7 xl:px-10 2xl:px-14'>
                <div className={styles.description}>
                    <h1 className="text-2xl sm:text-3xl font-semibold" >All locations. Based on JAKIM.</h1>
                    <h3 className="text-lg pt-2">Also available in <Link className={styles.link} href="/docs#tag/zones">JSON</Link> format. New: See zones on <a className={styles.link} href="https://peta.waktusolat.app">map</a>!</h3>
                </div>
                {(!data) &&
                    <div className='mx-auto max-w-max'>
                        <RotatingTriangles
                            visible={true}
                            height="90"
                            width="90"
                            ariaLabel="rotating-triangels-loading"
                            wrapperStyle={{}}
                            wrapperClass="rotating-triangels-wrapper"
                        />
                        <p className='text-center'>Loading...</p>
                    </div>
                }
                {
                    Object.entries(zones).map(([negeri, data]) => (
                        <div key={negeri} className='pb-5'>
                            <h2 className='text-xl font-semibold py-1' > {negeri}</h2>
                            {
                                data.map(zone => (
                                    <div key={zone.jakimCode} className={styles.zoneItem}>
                                        <code className={styles.zonecode}
                                            onClick={() => copyToClipBoard(zone.jakimCode)}>
                                            {zone.jakimCode}
                                        </code> - {zone.daerah}
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }

                <div style={{ paddingBottom: "1rem" }}></div>
                <div className={styles.footer}>
                    <span>This data is updated on best-effort basis. If you find the data above incorrect/outdated, kindly open an issue <Link
                        className={styles.link}
                        href={"https://github.com/mptwaktusolat/jakim-zones-grabber/issues"}>here</Link>.</span>

                    <br />
                    <Link className={styles.link} href={"/"}>Home</Link>
                </div>
            </div>
        </>
    );
}
