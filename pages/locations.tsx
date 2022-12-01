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
    if (!data) return <div>Loading...</div>;

    const zones: Map<String, any> = groupBy(data, 'negeri');

    return (
        <div className={styles.container}>
            <Head>
                <title>Locations - MPT Server</title>
                <meta name="description" content="JAKIM zones list"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className={styles.description}>
                <h2>All locations. Based on JAKIM.</h2>
                <h5>Also available in <Link href="/api/zones"><a>JSON</a></Link> format</h5>
            </div>
            {
                Object.entries(zones).map(([negeri, data]) => (
                    <div key={negeri} style={{paddingBottom: 15 + 'px'}}>
                        <h3>{negeri}</h3>
                        {
                            data.map(zone => (
                                    <div key={zone.jakimCode}>
                                        <code className={styles.zonecode}
                                              onClick={() => copyToClipBoard(zone.jakimCode)}>{zone.jakimCode}</code> - {zone.daerah}
                                    </div>
                                )
                            )
                        }
                    </div>
                ))
            }
            <footer>
                <sub>Note: As of November 2022, JAKIM seems to have replaced <code>KTN03</code> with <code>KTN02</code>.
                    View issue <a href="https://github.com/mptwaktusolat/app_waktu_solat_malaysia/issues/160"
                                  target={"_blank"} rel="noreferrer">#160</a>.

                </sub>
            </footer>
            <div style={{paddingBottom: "5rem"}}></div>
        </div>
    );
}
