import React from "react"
import s from './Slide.module.css'

const Slide1 = ({children, startAnimate}) => {
    const transitionProperties = startAnimate ? {marginRight: '0px', opacity: 1} : {}
    return(
        <div className={s.slide_in} style={transitionProperties}>{children}</div>
    )
} 

export default Slide1