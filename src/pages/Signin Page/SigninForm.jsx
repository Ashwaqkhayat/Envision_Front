import React, { useEffect, useState } from "react"
import s from './Signin_style.module.css'
import { Link, useNavigate } from "react-router-dom";
import Label from "../../components/Label/Label"
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { ConfigProvider, Input, Form, Button, message, Spin } from 'antd';
import { MailOutlined } from '@ant-design/icons';

function SigninForm() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

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
        // Use fetch to send the POST request to the API
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
                info('Successful Login', 'success')

                setTimeout(() => {
                    navigate(-1)
                }, 1300);

            } else {
                console.error('Sign in failed:', data.error);
                setIsLoading(false)
                info(data.error, 'error')
            }
        } catch (error) {
            console.error('Error during sign in:', error);
            setIsLoading(false)
            info('Error during login', 'error')
        }
    }
  

    return (
        <>
            <div className={s.body}>
                <Navbar />
                {contextHolder}
                <div className={s.content}>
                    <Form onFinish={onFinish}>
                        <ConfigProvider //change color theme
                            theme={{
                                token: {
                                    colorPrimary: '#8993ED',
                                }
                            }} >
                            <Spin className={s.spin} spinning={isLoading} tip="Logging in..." size="large">

                                <div className={s.wrapper}>
                                    <Link
                                        className={s.cancel_btn}
                                        to={'/'}
                                    >إلغاء
                                    </Link>

                                    <h1 style={{ direction: 'rtl', textAlign: 'left' }}>أهلاً بعودتك!</h1>

                                    <div className={s.form_part}>

                                        <div className={s.input_box}>
                                            <Label
                                                inputTitle="البريد الالكتروني"
                                                popTitle="Email Address"
                                                popMsg="Please enter your email address."
                                            />

                                            <Form.Item name={'email'} rules={[{
                                                required: true, type: 'email', message: "البريد الإلكتروني مطلوب"
                                            }]}>
                                                <Input
                                                    size="large"
                                                    placeholder="Name@Domain.com"
                                                    prefix={<MailOutlined className="site-form-item-icon" style={{ color: '#A2A9B0' }} />}
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className={s.input_box}>
                                            <Label
                                                inputTitle="كلمة المرور"
                                                popTitle="Password"
                                                popMsg="Please enter your password"
                                            />

                                            <Form.Item name={'password'} rules={[{
                                                required: true,
                                                message: "يجب إدخال كلمة المرور"
                                            }]}>
                                                <Input.Password
                                                    size="large"
                                                    placeholder="Password"
                                                />
                                            </Form.Item>

                                            <div className={s.forgot_pass}>
                                                <Link className={s.text_highlight} to='/'>هل نسيت كلمة المرور؟</Link>
                                            </div>

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
                                                تسجيل الدخول
                                            </Button>

                                            <p>لا تمتلك حسابًا؟ <Link className={s.text_highlight} to='/Signup'>سجل الآن</Link></p>
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