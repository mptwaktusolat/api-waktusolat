import { ApiReference as VueComponent } from '@scalar/api-reference'
import { applyVueInReact } from 'veaury'

const ApiReference = applyVueInReact(VueComponent)

function App() {
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