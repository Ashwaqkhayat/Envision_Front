import React from "react"
import s from './Slide.module.css'

const Slide2 = ({children, startAnimate}) => {
    const transitionProperties = startAnimate ? {marginLeft: '0px', opacity: 1} : {}
    return(
        <div className={s.slide_in2} style={transitionProperties}>{children}</div>
    )
} 

export default Slide2