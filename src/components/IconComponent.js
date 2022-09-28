import React from 'react'

function IconComponent({ type }) {
    console.log(type);
    if (type === "wifi") {
        return <><span>Wifi</span></>
    } else if (type === "keybox") {
        return <><span>Key-box</span></>
    } else if (type === "tv") {
        return <><span>Tv</span></>
    } else if (type === "seanearby") {
        return <><span>Sea nearby</span></>
    } else if (type === "freeparking") {
        return <><span>Free parking</span></>
    } else if (type === "kitchen") {
        return <><span>Kitchen</span></>
    } else if (type === "washingmachine") {
        return <><span>Washing machine</span></>
    } else if (type === "refrigerator") {
        return <><span>Refrigerator</span></>
    } else if (type === "niceview") {
        return <><span>Nice view</span></>
    } else if (type === "animalsallowed") {
        return <><span>Animals allowed</span></>
    }
}

export default IconComponent