import * as FileDowonload from './FileDownload.js'
import * as Network from './Network.js'
import * as TimeLine from './TimeLine.js'


async function initNetwork() {
    let drawActions = await FileDowonload.getActions();
    Network.init(drawActions);
    TimeLine.init(drawActions)
}

export default function App() {
    return (
        <div className="container-fluid">
            <div className="row vh-100">
                <div className="col-2">
                    <FileDowonload.default />
                    <button type="button" className="btn btn-primary" onClick={initNetwork}>Отобразить схему</button>
                </div>
                <div className="col-10">
                    <div className="row  flex-grow-1">                       
                        <div className="col-12">
                            <Network.default />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <TimeLine.default />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}