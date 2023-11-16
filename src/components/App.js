import FileDowonload from './FileDownload.js'
import * as network from './Network.js'

function initNetwork() {
    network.init("mynetwork");
}

export default function App() {

    return (
        <div className="container-fluid">
            <div className="row vh-100">
                <div className="col-2">
                    <FileDowonload />
                    <button type="button" className="btn btn-primary" onClick={initNetwork}>Отобразить схему</button>
                </div>
                <div className="col-10">
                    <div className="row  flex-grow-1">  
                    {/* style={{flex: '1 1 auto'}} */}
                        <div className="col-12">
                            <network.default />
                        </div>

                    </div>
                    <div className="row" style={{height:'100px'}}></div>
                </div>
            </div>
        </div>
    )
}