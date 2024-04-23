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

function EditProfile() {
    // Menu
    const [menuSelection, setMenuSelection] = useState('تعديل البيانات')
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
                    <div className={s.wrapper}>
                        <ConfigProvider theme={{
                            token: {
                                colorPrimary: '#8993ED'
                            },
                            components: {
                                Menu: {
                                    colorPrimary: '#494C4C',
                                    itemSelectedBg: '#d5e8e3',
                                    itemActiveBg: '#E3E3E3',
                                },
                                Button: {
                                    colorPrimary: '#8993ED',
                                },
                            },
                        }}>
                            <div className={s.leftMenu}>
                                <div className={`${s.avatar} ${s.center_flex}`}>
                                    {accType == "child" && <img src={userIcon} alt="Profile Picture" /> }
                                    <h2>{Fname}</h2>
                                    <p>{`@${Fname}${Lname}`}</p>
                                </div>
                                <div className={s.menues}>
                                    <Menu
                                        onClick={(e) => { setMenuSelection(e.key) }}
                                        defaultSelectedKeys={['تعديل البيانات']}
                                        items={[
                                            { label: "تعديل البيانات", key: "تعديل البيانات" },
                                            { label: "تغيير كلمة المرور", key: "تغيير كلمة المرور" },
                                            { label: "إعدادات", key: "الإعدادات" },
                                        ]}
                                    >
                                    </Menu>
                                </div>
                            </div>
                            <div className={s.rightContent}>
                                {menuSelection == "تعديل البيانات" ?
                                    accType == "child" ? <MainInfoChild menuSelection={menuSelection} /> : <MainInfoGuard menuSelection={menuSelection} />
                                : menuSelection == "تغيير كلمة المرور" ? <ChangePass menuSelection={menuSelection} accType={accType} />
                                : <Settings menuSelection={menuSelection} accType={accType} />
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