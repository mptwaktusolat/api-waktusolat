import {useState} from 'react';
import styles from "../styles/Home.module.css";

export default function Locations(props) {
  const [copySuccess, setCopySuccess] = useState(null);
  const copyToClipBoard = async copyMe => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  function groupBy(data, key) {
    return data.reduce((acc, x) => {
      acc[x[key]] = [...(acc[x[key]] || []), x];
      return acc;
    }, {});
  }

  const zones = groupBy(props.zones, 'negeri');
  return (
      <div className={styles.container}>
        <h2 className={styles.description}>
          All locations. Based on JAKIM.
        </h2>
        {
          Object.entries(zones).map(([negeri, data]) => (
              <div key={negeri} style={{paddingBottom: 15 + 'px'}}>
                <h3>{negeri}</h3>
                {
                  data.map(zone => (
                          <div key={zone.jakimCode}>
                            <code onClick={(e) => copyToClipBoard(zone.jakimCode)}>{zone.jakimCode}</code> - {zone.daerah}
                          </div>
                      )
                  )
                }

              </div>
          ))
        }
      </div>
  );

}

import {loadZones} from "../lib/load-json-db";

export async function getStaticProps() {
  const zones = await loadZones();

  return {
    props: {zones}
  }
}