import React from "react"
import s from './ChildProfile_style.module.css'
import { Button } from 'antd'

function Guardian(props) {
    return (
        <div className={s.guardian_cont}>
            <h4>{props.name}</h4>
            <div className={s.occupation}>
                <p>{props.job}</p>
            </div>
        </div>
    )
}

export default Guardian