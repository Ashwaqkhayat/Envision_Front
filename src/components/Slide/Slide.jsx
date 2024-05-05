import React, { useState } from "react"
import s from './Slide.module.css'
import Selection from '../../pages/Create Story Page/Selection'
import Description from '../../pages/Create Story Page/Description'

const Slide = ({ startAnimate }) => {
    const transitionProperties_slideIn = startAnimate ? { marginRight: '500%', opacity: 0 } : {}
    const transitionProperties_slideOut = startAnimate ? { marginLeft: '0px', opacity: 1 } : {}
    // const transConst = startAnimate ? { opacity: 0 } : {}

    return (
        <>
            <div className={s.slide_out} style={transitionProperties_slideOut}>
                <Selection />
            </div>
            <div className={s.constant} style={transitionProperties_slideIn}>
                <Description />
            </div>
        </>
    )
}

export default Slide