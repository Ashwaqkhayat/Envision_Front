import React from "react"
import s from './GuardianProfile_style.module.css'
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Button } from 'antd'
import { SmileTwoTone } from '@ant-design/icons'
// translation hook
import { useTranslation } from 'react-i18next'

function Child(props) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const info = props.content //Full child info
    const name = info.first_name + " " + info.last_name
    const age = info.age
    const gender = info.gender
    // const email = info.email
    // const faveColor = info.favorite_color
    // const bdate = info.birth_date

    const [faceColor, setFaceColor] = React.useState("#494C4C")
    React.useEffect(() => {
        if (gender === "female") {
            setFaceColor("#F19BBA")
        } else {
            setFaceColor("#6B9EFF")
        }
    }, [])

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#8993ED' } }} >
            <div className={s.child_cont}>
                <div className={s.info}>
                    <h4>{name}</h4>
                    <div className={s.icon}>
                        <SmileTwoTone twoToneColor={faceColor} />
                    </div>
                </div>
                <p className={s.age}>{age} {t("gprof child age")}</p>
                <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                        localStorage.setItem("visited-Child", JSON.stringify(info.id))
                        navigate('/viewChild')
                    }}
                >{t("gprof child prof btn")}</Button>
            </div>
        </ConfigProvider>
    )
}

export default Child