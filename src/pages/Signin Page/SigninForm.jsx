import React, { useEffect } from "react"
import s from './Signin_style.module.css'
import { Link, useNavigate } from "react-router-dom";
import Label from "../../components/Label/Label"

//import Ant Components
import { ConfigProvider, Flex, Radio, Input, Form, Button, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';

//Importing Navbar & Footer
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

function SigninForm() {
    
    const navigate = useNavigate()
    // if user is logged in/ signed up and tried to enter the signup page, he'll be redirected to the home page!
    useEffect(() => {
        if(localStorage.getItem('user-info'))
        {
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
        })
    }
    const load = () => {
        messageApi.open({
            type: 'loading',
            content: 'Loading',
            duration: 2.0,
        })
    }

    const onFinish = (values) => {
        signIn(values.email, values.password)
    }

    async function signIn(email, password) {

        const requestBody = {
            email,
            password
        };
        //Display loading message
        load()
        // Use fetch to send the POST request to the API
        try {
            const response = await fetch(`${process.env.REACT_APP_url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("user-info", JSON.stringify(data))
                console.log('Sign in successful:', data)
                info('Successful Login', 'success')

                setTimeout(() => {
                    navigate(-1)
                }, 1200);

            } else {
                console.error('Sign in failed:', response);
                info('Login failed', 'error')
            }
        } catch (error) {
            console.error('Error during sign in:', error);
            info('Error during login', 'error')
        }
    }

    return (
        <>
            <div className={s.body}>
                {contextHolder}
                <Navbar />
                <div className={s.form_container}>
                    <Form onFinish={onFinish}>
                        <div className={s.wrapper}>
                            <Link
                                className={s.cancel_btn}
                                to={'/'}
                            >Cancel
                            </Link>

                            <h1>Welcome Back!</h1>

                            <div className={s.form_part}>
                                <ConfigProvider //change color theme
                                    theme={{
                                        token: {
                                            colorPrimary: '#8993ED',
                                        }
                                    }} >
                                    <div className={s.input_box}>
                                        <Label
                                            inputTitle="Email"
                                            popTitle="Email Address"
                                            popMsg="Please enter your email address."
                                        />

                                        <Form.Item name={'email'} rules={[{
                                            required: true, type: 'email'
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
                                            inputTitle="Password"
                                            popTitle="Password"
                                            popMsg="Please enter your password"
                                        />

                                        <Form.Item name={'password'} rules={[{
                                            required: true
                                        }]}>
                                            <Input.Password
                                                size="large"
                                                placeholder="Password"
                                            />
                                        </Form.Item>

                                        <div className={s.forgot_pass}>
                                            <Link className={s.text_highlight} to='/'>Forgot your password?</Link>
                                        </div>

                                    </div>
                                </ConfigProvider>
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
                                        Login
                                    </Button>

                                    <p>Do not have an account? <Link className={s.text_highlight} to='/Signup'>Sign Up</Link></p>
                                </div>
                            </ConfigProvider>
                        </div>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SigninForm