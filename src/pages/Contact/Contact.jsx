import React, { useEffect, useState } from 'react'
import s from './Contact_style.module.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { XOutlined, MailFilled } from '@ant-design/icons'
import { ConfigProvider, Button, Form, Input, Spin, message, notification } from 'antd';


function Contact() {
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    //Antd items
    const [messageApi, contextHolder] = message.useMessage()
    const pop = (msg, type) => {
        messageApi.open({
            type: type,
            content: msg,
            duration: 3.5,
        })
    }

    // To disable submit button at the beginning.
    useEffect(() => {
        setClientReady(true);
    }, []);

    const submitMsg = async (values) => {
        setIsLoading(true) // Show loading message
        const requestBody = {
            email: values.email,
            name: values.name,
            msg: values.message
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_url}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(requestBody),
                credentials: 'include'
            });
            if (response.ok) {
                setIsLoading(false) // Hide loading message
                form.resetFields()
                console.log('Message is sent')
                pop('We recieved your message!', 'success')
            } else {
                console.error('Something is wrong, try again.');
                pop('Something is wrong, try again.', 'error')
            }
        } catch (e) {
            console.error("Error sending message: ", e)
            pop('Error sending message: ', 'error')
        }

    }

    return (
        <>
            <div className={s.body}>
                <Navbar />
                <div className={s.content}>
                    <div className={s.outerWrapper}>
                        <div className={s.text_area}>
                            <div className={s.title}>
                                <h1>Contact Us</h1>
                                <h3>What would you like to tell us?</h3>
                            </div>
                            <div className={s.accounts}>
                                <p><XOutlined className={s.icon} />@EnvisionASD </p>
                                <p><MailFilled className={s.icon} />EnvisionASD@gmail.com </p>
                            </div>
                        </div>
                        <div className={s.form_area}>
                            {contextHolder}
                            <Form
                                className={s.form_wrapper}
                                form={form}
                                onFinish={submitMsg}
                                name="contact_form"
                                initialValues={{
                                    remember: true,
                                }}
                            >
                                <ConfigProvider //change color theme
                                    theme={{
                                        token: {
                                            colorPrimary: '#8993ED',
                                        }
                                    }} >
                                    <Spin spinning={isLoading} tip="Sending..." size="large">

                                        <div className={s.column}>
                                            <div className={s.column_part}>
                                                <div className={s.input_box}>
                                                    <p className={s.label}> Name </p>
                                                    <Form.Item className={s.input} name="name" rules={[{ required: true, message: 'Please enter your name.' }]} >
                                                        <Input allowClear size="large" placeholder='E.g. Sara Sami' />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className={s.column_part}>
                                                <div className={s.input_box}>
                                                    <p className={s.label}> Email </p>
                                                    <Form.Item name="email" rules={[{ required: true, message: 'Please enter your email.', type: 'email' }]} >
                                                        <Input allowClear size="large" placeholder='Name@Domain.com' />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={s.input_box}>
                                            <p className={s.label}> Message </p>
                                            <Form.Item name="message" rules={[{ required: true, message: "What is your message?", }]} >
                                                <Input.TextArea
                                                    size='large'
                                                    allowClear
                                                    showCount
                                                    maxLength={750}
                                                    style={{ height: 150, resize: 'none' }} />
                                            </Form.Item>
                                        </div>

                                        <div className={s.btn}>
                                            <Form.Item shouldUpdate>
                                                {() => (
                                                    <Button
                                                        className={s.submit_btn}
                                                        type="primary"
                                                        htmlType="submit"
                                                        onClick={setIsLoading}
                                                        disabled={
                                                            !clientReady ||
                                                            !form.isFieldsTouched(true) ||
                                                            !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                                        }
                                                    >
                                                        Send
                                                    </Button>
                                                )}
                                            </Form.Item>
                                        </div>
                                    </Spin>
                                </ConfigProvider>
                            </Form>


                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact