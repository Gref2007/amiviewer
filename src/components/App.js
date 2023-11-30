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
                    <div className="fs-6  mb-3 mt-3">
                        <p>
                            For navigation through timeline use the&nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left ml-3 mr-3" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                            &nbsp; and  &nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>  
                            &nbsp; keys on the keyboard.
                        </p>
                    </div>
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