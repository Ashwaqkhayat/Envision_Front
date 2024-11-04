import React, { useEffect } from "react";
import s from './Navbar_style.module.css'
import { useNavigate, Link } from "react-router-dom";
//Antd buttons
import { ConfigProvider, Button, Select, Flex } from 'antd';
import Icon, { UserOutlined, SnippetsOutlined } from '@ant-design/icons';
// translation hook
import { useTranslation } from 'react-i18next';

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate()
    const auth = JSON.parse(localStorage.getItem('user-info'))

    const handleChange = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className={s.nav} style={{ direction: i18n.dir() }}>
            <div className={s.nav_right}>
                <Link to='/' className={s.nav_title}>{t('nav title')}</Link>
            </div>

            <div className={s.nav_left}>
                <Flex gap="small" wrap="wrap">
                    <ConfigProvider
                        theme={{
                            token: {
                                sizeStep: 7,
                                colorPrimary: '#8993ED',
                                colorBgContainer: 'rgba(73, 76, 76, 0)',
                            }
                        }} >

                        <Select
                            variant="borderless"
                            size="large"
                            defaultValue={i18n.dir() == "ltr" 
                                ? "English"
                                : "عربـــي"}
                            // style={{ width: 116, }}
                            onChange={handleChange}
                            options={[
                                { value: 'en', label: 'English', },
                                { value: 'ar', label: 'عربـــي', },
                            ]}
                        />
                        {/* If user is authinticated/logged in then show the profile, otherwise show the login/register btns */}
                        {auth ?
                            <>
                                <Button
                                    type="primary"
                                    onClick={() => { navigate('/profile') }}
                                    shape="round"
                                    size="large"
                                    icon={<UserOutlined style={{ fontSize: '20px' }} />}
                                >{t("nav profile button")}</Button>

                                {auth.userType === "child" &&
                                    <Button
                                        type="text"
                                        shape="round"
                                        size="large"
                                        onClick={() => { navigate('/library') }}
                                    >{t("nav library button")}</Button>
                                }

                                <Button
                                    type="text"
                                    shape="round"
                                    size="large"
                                    onClick={() => { navigate('/') }}
                                >{t("nav home button")}</Button>

                            </>
                            :
                            <>

                                <Button
                                    className={s.nav_register}
                                    size="large"
                                    onClick={() => navigate('/Signup')}
                                >{t("nav register button")}</Button>

                                <Button
                                    className={s.nav_login}
                                    type="primary"
                                    size="large"
                                    onClick={() => navigate('/Signin')}
                                >{t("nav login button")}</Button>
                            </>
                        }

                    </ConfigProvider>
                </Flex>
            </div>
        </div>
    )
}