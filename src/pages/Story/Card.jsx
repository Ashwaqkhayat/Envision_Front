import React from "react"
import s from './Story_style.module.css'

function Card(props) {
    return (
        <div className={s.card_container}>
            <div className={s.scene_img}>
                <img src={props.img} alt="Scene image" />
            </div>
            <div className={s.scene_text}>
                <p>{props.text}</p>
            </div>
        </div>
    )
}

export default Card