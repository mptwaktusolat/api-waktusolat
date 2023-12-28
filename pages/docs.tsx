import { ApiReference as VueComponent } from '@scalar/api-reference'
import { applyVueInReact } from 'veaury'

const ApiReference = applyVueInReact(VueComponent)

function App() {
    const configuration = {
        spec: {
            url: 'https://raw.githubusercontent.com/mptwaktusolat/open-api-spec/main/mpt-server-api.yaml'
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