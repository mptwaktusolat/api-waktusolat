import Head from 'next/head'
import Link from "next/link";
import useSWR from 'swr';
import Toastify from 'toastify-js'
import styles from "../styles/Locations.module.css";
import "toastify-js/src/toastify.css"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Locations() {
    const {data, error} = useSWR('/api/zones', fetcher);

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
        <div className={styles.container}>
            <Head>
                <title>Locations - MPT Server</title>
                <meta name="description" content="JAKIM zones list"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className={styles.description}>
                <h1>All locations. Based on JAKIM.</h1>
                <h3>Also available in <Link className={styles.link} href="/api/zones">JSON</Link> format</h3>
            </div>
            {
                Object.entries(zones).map(([negeri, data]) => (
                    <div key={negeri} style={{paddingBottom: 15 + 'px'}}>
                        <h2>{negeri}</h2>
                        { data ? (
                            data.map(zone => (
                                <div key={zone.jakimCode} className={styles.zoneItem}>
                                    <code className={styles.zonecode} onClick={() => copyToClipBoard(zone.jakimCode)}>
                                        {zone.jakimCode}
                                    </code> - {zone.daerah}
                                </div>
                            ))
                        ) : (
                            <div>Loading...</div>
                        )
                        }
                    </div>
                ))
            }

            <div style={{paddingBottom: "1rem"}}></div>
            <div className={styles.footer}>
                <span>This data is updated on best-effort basis. If you find the data above incorrect/outdated, kindly open an issue <Link
                    className={styles.link}
                    href={"https://github.com/mptwaktusolat/jakim-zones-grabber/issues"}>here</Link>.</span>

                <br/>
                <Link className={styles.link} href={"/"} >Back home</Link>
            </div>
        </div>
    );
}
