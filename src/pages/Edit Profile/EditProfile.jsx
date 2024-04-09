import React, { useState } from 'react'
import s from './EditProfile_style.module.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import MainInfo from './MainInfo'
import ChangePass from './ChangePass'
import Settings from './Settings'
import { ConfigProvider, Menu} from 'antd'
import userIcon from '../../assets/images/pfp.png'

function EditProfile() {
    // Menu
    const [menuSelection, setMenuSelection] = useState('Edit Profile')

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
                                    <img src={userIcon} alt="Profile Picture" />
                                    <h2>Ashwaq</h2>
                                    <p>@Ashwaqkhayat</p>
                                </div>
                                <div className={s.menues}>
                                    <Menu
                                        onClick={(e) => { setMenuSelection(e.key) }}
                                        defaultSelectedKeys={['Edit Profile']}
                                        items={[
                                            { label: "Edit Profile", key: "Edit Profile" },
                                            { label: "Change Password", key: "Change Password" },
                                            { label: "Settings", key: "Settings" },
                                        ]}
                                    >
                                    </Menu>
                                </div>
                            </div>
                            <div className={s.rightContent}>
                                {menuSelection=="Edit Profile" ?
                                <MainInfo menuSelection={menuSelection}/>
                                : menuSelection=="Change Password" ?
                                <ChangePass menuSelection={menuSelection}/>
                                :
                                <Settings menuSelection={menuSelection}/>
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