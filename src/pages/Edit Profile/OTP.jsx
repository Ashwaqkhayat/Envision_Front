import React, { useState } from 'react'
import s from './EditProfile_style.module.css'
import { Link } from 'react-router-dom'
import { ConfigProvider, Button, Input, message, Spin, Form } from 'antd'

function OTP({onFinish, isLoading, menuSelection}) {

    // Messages 
    const [messageApi, contextHolder] = message.useMessage()
    const popMsg = (text, type) => {
        messageApi.open({
            type: type,
            content: text,
            duration: 5,
            style: {
                fontSize: '18px',
                justifyContent: 'center',
            },
        })
    }

    // OTP
    const sharedProps = { onFinish }

    // function verifyOTP(code) {
    //     const fetchData = async () => {
    //         console.log("Verifying OTP...")
    //         setIsLoading(true)
    //         try {
    //             const response = await fetch(`${process.env.REACT_APP_url}/verify_otp`, {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json', },
    //                 credentials: 'include',
    //                 body: JSON.stringify({otp:code}),
    //             })
    //             const data = await response.json()
    //             if (response.ok) {
    //                 console.log(data.message)
    //                 popMsg('Password changed successfully!', 'success')
    //                 setTimeout(() => {
    //                     navigate('/editprofile')
    //                 }, 1300)
    //             } else {
    //                 console.error(`Network response was not ok: ${response.status} ${data.error}`)
    //                 popMsg(data.error, 'error')
    //             }
    //         } catch (err) {
    //             console.error("Failed: ", err)
    //             popMsg('Something went wrong, try again later', 'error')
    //         } finally {
    //             setIsLoading(false)
    //         }
    //     }
    //     fetchData()
    // }

    return (
        <>
            <ConfigProvider theme={{ token: { colorPrimary: '#8993ED' } }}>
                {contextHolder}
                <div className={s.header}>
                    <h2>{menuSelection}</h2>
                </div>
                <div className={s.bodyInputs}>
                    <Form onFinish={onFinish} >
                        <div className={s.otp}>
                            <h3>رمز التأكيــــد</h3>
                            <p>رجاءً قم بإدخال الرمز المرسل إلى بريدك الإلكتروني</p>
                            <Form.Item name={'otp'} rules={[{ required: true, message: 'Please enter OTP code' },]}>
                                <Input.OTP size='large' length={6} formatter={(str) => str.toUpperCase()} />
                            </Form.Item>

                            <Form.Item style={{ marginTop: '2rem' }} >
                                <Button
                                    style={{ width: 100 }}
                                    type="primary"
                                    htmlType="submit"
                                    loading={isLoading}
                                    size='large'>
                                    تأكيد
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>

                    <div className={s.resend}>
                        {/* <p>Didn't recieve? <Link onClick={verifyOTP} className={s.resend_btn}>Resend code</Link></p> */}
                    </div>
                </div>
            </ConfigProvider>
        </>
    )
}

export default OTP