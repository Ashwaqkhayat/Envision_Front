import React from "react"
import s from './GuardianProfile_style.module.css'
import { ConfigProvider, Button } from 'antd'
import { SmileTwoTone } from '@ant-design/icons'

function Child(props) {
    // I should get child profile url as prop
    // also name, age, and gender
    const name = props.name
    const age = props.age
    const gender = props.gender
    // const url = props.url
    
    const [faceColor, setFaceColor] = React.useState("#494C4C")
    React.useEffect(() => {
        if (props.gender === "female") {
            setFaceColor("#F19BBA")
        } else {
            setFaceColor("#6B9EFF")
        }
    }, [])

    return (
        <ConfigProvider
        theme={{
            token: {
              colorPrimary: '#8993ED',
            }}}
        >
            <div className={s.child_cont}>
                <div className={s.info}>
                    <h4>{props.name}</h4>
                    <div className={s.icon}>
                        <SmileTwoTone twoToneColor={faceColor} />
                    </div>
                </div>
                <p className={s.age}>{props.age}yo</p>
                <Button type="primary" size="small">View Profile</Button>
            </div>
        </ConfigProvider>
    )
}

export default Child