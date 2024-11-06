import React, { useEffect, useState } from "react"
import s from './Signin_style.module.css'
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { ConfigProvider, Input, Form, Button, message, Spin } from 'antd';
import { MailOutlined } from '@ant-design/icons';
// translation hook
import { useTranslation } from 'react-i18next';

function SigninForm() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    // Form
    const [form] = Form.useForm()
    const { t, i18n } = useTranslation()

    // if user is logged in/ signed up and tried to enter the signup page, he'll be redirected to the home page
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/')
        }
    }, [])

    //Antd items
    const [messageApi, contextHolder] = message.useMessage()
    const info = (msg, type) => {
        messageApi.open({
            type: type,
            content: msg,
            duration: 3.5,
            style: {
                fontSize: '18px',
                justifyContent: 'center',
            },
        })
    }

    const onFinish = (values) => {
        signIn(values.email, values.password)
    }

    async function signIn(email, password) {
        setIsLoading(true)

        const requestBody = {
            // email: email.toLowerCase(),         <-- SAVE LATER
            email: email,
            password: password,
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(requestBody),
                credentials: 'include',
            });
            const data = await response.json()
            if (response.ok) {
                setIsLoading(false)
                localStorage.setItem("user-info", JSON.stringify(data))
                info(t("popmsg success login"), 'success')

                setTimeout(() => {
                    navigate(-1)
                }, 1300);

            } else {
                console.error('Sign in failed:', data.error);
                setIsLoading(false)
                //info(data.error, 'error') // is this right?
                info(t("login popmsg invalid login"), 'error')
            }
        } catch (error) {
            console.error('Error during sign in:', error);
            setIsLoading(false)
            info(t("server req error"), 'error')
        }
    }


    return (
        <>
            <div className={s.body}>
                <Navbar />
                {contextHolder}
                <div className={s.content}>
                    <Form 
                        name='login'
                        form={form}
                        onFinish={onFinish}
                        layout='vertical'
                        requiredMark='optional'
                    >
                        <ConfigProvider
                            componentSize='large'
                            theme={{
                                token: { colorPrimary: '#8993ED' },
                                components: {
                                    Form: {
                                        // marginLG: 10,
                                        itemMarginBottom: 15,
                                        labelFontSize: 16,
                                        verticalLabelPadding: 0
                                    },
                                }}}
                            >
                            <Spin className={s.spin} spinning={isLoading} tip={t("login loading tip")} size="large">

                                <div className={s.wrapper} style={{direction: i18n.dir()}}>
                                    <Link className={s.cancel_btn} to={'/'}>{t("login cancel btn")} </Link>

                                    <h1>{t("login title")}</h1>

                                    <div className={s.form_part}>
                                            <Form.Item
                                            name= {'email'}
                                            label= {t("login email label")}
                                            tooltip= {t("login email tooltip")}
                                            required
                                            rules = {[{
                                                required: true,
                                                type: 'email', 
                                                message: t("login email msg"),
                                            }]}>
                                                <Input
                                                    placeholder="Name@Domain.com"
                                                    prefix={<MailOutlined 
                                                            className="site-form-item-icon" 
                                                            style={{ color: '#A2A9B0' }} 
                                                            />}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                            name={'password'}
                                            label= {t("login pass label")}
                                            tooltip= {t("login pass tooltip")}
                                            required
                                            rules={[{
                                                required: true,
                                                message: t("login pass msg")
                                            }]}>
                                                <Input.Password
                                                    placeholder= {t("login pass placeholder")}
                                                />
                                            </Form.Item>

                                            <div className={s.forgot_pass}>
                                                <Link className={s.text_highlight} to='/'>{t("login forgot pass")}</Link>
                                            </div>

                                    </div>

                                    <ConfigProvider
                                        theme={{
                                            token: {
                                                colorPrimary: '#8993ED',
                                                sizeStep: 14,
                                            }
                                        }} >

                                        <div className={s.bottom_part}>
                                            <Button htmlType="submit" type="primary" size="large" >
                                                {t("login login btn")}
                                            </Button>

                                            <p>{t("login no acc")}<Link className={s.text_highlight} to='/Signup'>{t("login signup btn")}</Link></p>
                                        </div>
                                    </ConfigProvider>
                                </div>
                            </Spin>
                        </ConfigProvider>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SigninForm