import React from "react"
import s from './Story_style.module.css'

function Story(props){
    const title = props.title
    const cover = props.cover

    return (
        <div className={s.container}>
            <img src={cover} alt="cover image" />
            <h3>{title}</h3>
        </div>
    )
}

export default Story