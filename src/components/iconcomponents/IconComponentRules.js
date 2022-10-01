import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faAlarmClock, faBanSmoking, faBan  } from '@fortawesome/pro-solid-svg-icons';

function IconComponentRules({ type }) {
    console.log(type);
    if (type === "checkintime") {
        return <><FontAwesomeIcon className="icon-margin" icon={faClock} /><span className="mx-5">Check-in time: After</span></>
    } else if (type === "checkouttime") {
        return <><FontAwesomeIcon className="icon-margin" icon={faAlarmClock} /><span className="mx-5">Check-out time:</span></>
    } else if (type === "nosmoking") {
        return <><FontAwesomeIcon className="icon-margin" icon={faBanSmoking} /><span className="mx-5">No smoking</span></>
    } else if (type === "nopartiesorevents") {
        return <><FontAwesomeIcon className="icon-margin" icon={faBan} /><span className="mx-5">No parties or events</span></>
    }
}

export default IconComponentRules;