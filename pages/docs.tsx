import { ApiReference as VueComponent } from '@scalar/api-reference'
import { useEffect } from 'react';
import { applyVueInReact } from 'veaury'

const ApiReference = applyVueInReact(VueComponent)

function App() {

    useEffect(()=> {
        // Hiding scalar attributionn muehehheheh
        const attributionElementMobile = document.querySelector("#__next > div > div.scalar-api-reference.references-layout.references-sidebar.scalar-api-references-standalone-mobile._reset_1ffu1_3 > aside > div > div > div.darklight-reference > a");
        const attributionElement = document.querySelector("#__next > div > div.scalar-api-reference.references-layout.references-sidebar._reset_1ffu1_3 > aside > div > div > div.darklight-reference > a");
        if (attributionElementMobile != null) {
            attributionElementMobile.innerHTML = ""   
        }
        if (attributionElement != null) {
            attributionElement.innerHTML = ""   
        }
    
    });
    const configuration = {
        spec: {
            url: 'https://raw.githubusercontent.com/mptwaktusolat/open-api-spec/main/mpt-server-api.yaml'
        },
        metaData: {
            title: 'API References | Waktu Solat API',
            description: 'Easily integrate Waktu Solat API into your applications for accurate prayer times and zone detection',
            ogDescription: 'Easily integrate Waktu Solat API into your applications for accurate prayer times and zone detection',
            ogTitle: 'API References | Waktu Solat API',
            ogImage: 'https://mpt-server.vercel.app/metaimage.png',
            twitterCard: 'summary_large_image',
          }
    };
    return (
        <>
            {/* @ts-ignore */}
            <ApiReference configuration={configuration} />
        </>
    )
}

export default App