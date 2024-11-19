import React, { useState } from 'react'
import s from './EditProfile_style.module.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import MainInfoChild from './MainInfoChild'
import MainInfoGuard from './MainInfoGuard'
import ChangePass from './ChangePass'
import Settings from './Settings'
import { ConfigProvider, Menu } from 'antd'
import userIcon from '../../assets/images/pfp.png'
// translation hook
import { useTranslation } from 'react-i18next';

function EditProfile() {
    const { t, i18n } = useTranslation()
    // Menu
    const [menuSelection, setMenuSelection] = useState("mainInfo")
    // Check user type
    const auth = JSON.parse(window.localStorage.getItem("user-info"))
    const accType = auth.userType
    let Fname = auth.first_name
    let Lname = auth.last_name

    return (
        <>
            <div className={s.body}>
                <Navbar />
                <div className={`${s.content} ${s.center_flex}`}>
                    <div className={s.wrapper} style={{ direction: i18n.dir() }}>
                        <ConfigProvider theme={{
                            token: { colorPrimary: '#8993ED' },
                            components: {
                                Menu: {
                                    colorPrimary: '#494C4C',
                                    itemSelectedBg: '#d5e8e3',
                                    itemActiveBg: '#E3E3E3',
                                },
                                Button: {
                                    colorPrimary: '#8993ED'
                                },
                            },
                        }}>
                            <div className={s.leftMenu}>
                                <div className={`${s.avatar} ${s.center_flex}`}>
                                    {accType == "child" && <img src={userIcon} alt="Profile Picture" />}
                                    <h2>{Fname}</h2>
                                    <p>{`@${Fname}_${Lname}`}</p>
                                </div>
                                <div className={s.menues}>
                                    <Menu
                                        onClick={(e) => { setMenuSelection(e.key) }}
                                        defaultSelectedKeys={["mainInfo"]}
                                        items={[
                                            { label: t("editprof edit info"), key: "mainInfo" },
                                            { label: t("editprof changePass"), key: "passChange" },
                                            { label: t("editprof settings"), key: "settings" },
                                        ]}
                                    >
                                    </Menu>
                                </div>
                            </div>
                            <div className={s.rightContent}>
                                {menuSelection == "mainInfo" ?
                                    accType == "child" ? <MainInfoChild /> : <MainInfoGuard />
                                    : menuSelection == "passChange" ? <ChangePass accType={accType} />
                                        : <Settings accType={accType} />
                                }
                            </div>
                        </ConfigProvider>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default EditProfile