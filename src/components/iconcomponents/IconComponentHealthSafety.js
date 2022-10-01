import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamondExclamation, faTriangleExclamation, faSensorOn, faSensorCloud } from '@fortawesome/pro-solid-svg-icons';

function IconComponentHealthSafety({ type }) {
    console.log(type);
    if (type === "nearbylakeriverwater") {
        return <><FontAwesomeIcon className="icon-margin" icon={faDiamondExclamation} /><span className="mx-5">Nearby lake, river, water</span></>
    } else if (type === "heightwithoutrailingsorsafety") {
        return <><FontAwesomeIcon className="icon-margin" icon={faTriangleExclamation} /><span className="mx-5">Height without railings or safety</span></>
    } else if (type === "carbonmonoxidealarm") {
        return <><FontAwesomeIcon className="icon-margin" icon={faSensorOn} /><span className="mx-5">Carbon monoxide alarm</span></>
    } else if (type === "smokedetectoralarm") {
        return <><FontAwesomeIcon className="icon-margin" icon={faSensorCloud} /><span className="mx-5">Smoke detector</span></>
    }
}

export default IconComponentHealthSafety