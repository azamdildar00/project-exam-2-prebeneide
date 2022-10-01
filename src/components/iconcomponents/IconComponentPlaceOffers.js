import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faKey, faTv, faWater, faCar, faKitchenSet, faWashingMachine, faRefrigerator, faEye, faPaw} from '@fortawesome/pro-solid-svg-icons';

function IconComponentPlaceOffers({ type }) {
    console.log(type);
    if (type === "wifi") {
        return <><FontAwesomeIcon className="icon-margin" icon={faWifi} /><span className="mx-5">Wifi</span></>
    } else if (type === "keybox") {
        return <><FontAwesomeIcon className="icon-margin" icon={faKey} /><span className="mx-5">Key-box</span></>
    } else if (type === "tv") {
        return <><FontAwesomeIcon className="icon-margin" icon={faTv} /><span className="mx-5">Tv</span></>
    } else if (type === "seanearby") {
        return <><FontAwesomeIcon className="icon-margin" icon={faWater} /><span className="mx-5">Sea nearby</span></>
    } else if (type === "freeparking") {
        return <><FontAwesomeIcon className="icon-margin" icon={faCar} /><span className="mx-5">Free parking</span></>
    } else if (type === "kitchen") {
        return <><FontAwesomeIcon className="icon-margin" icon={faKitchenSet} /><span className="mx-5">Kitchen</span></>
    } else if (type === "washingmachine") {
        return <><FontAwesomeIcon className="icon-margin" icon={faWashingMachine} /><span className="mx-5">Washing machine</span></>
    } else if (type === "refrigerator") {
        return <><FontAwesomeIcon className="icon-margin" icon={faRefrigerator} /><span className="mx-5">Refrigerator</span></>
    } else if (type === "niceview") {
        return <><FontAwesomeIcon className="icon-margin" icon={faEye} /><span className="mx-5">Nice view</span></>
    } else if (type === "animalsallowed") {
        return <><FontAwesomeIcon className="icon-margin" icon={faPaw} /><span className="mx-5">Animals allowed</span></>
    } 
}

export default IconComponentPlaceOffers