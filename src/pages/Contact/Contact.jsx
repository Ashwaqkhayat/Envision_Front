import React, { useEffect, useState } from 'react'
import s from './Contact_style.module.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { XOutlined, MailFilled } from '@ant-design/icons'
import { ConfigProvider, Button, Form, Input, Spin, message, notification } from 'antd';
// translation hook
import { useTranslation } from 'react-i18next';


function Contact() {
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation();

    // Antd items -messages-
    const [messageApi, contextHolder] = message.useMessage()
    const pop = (msg, type) => {
        messageApi.open({
            type: type,
            content: msg,
            duration: 3.5,
            style: {direction: i18n.dir()}
        })
    }
    // Antd Notification
    const [api, contextHolder2] = notification.useNotification();
    const openNotification = (type, msg, desc) => {
        api[type]({
            message: msg,
            description: desc,
            placement: 'top',
        });
    };

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
                setIsLoading(false)
                form.resetFields()
                openNotification('success', t("cont notif recieved title"), t("cont notif recieved msg"))
            } else {
                console.error('Something is wrong, try again.');
                pop(t("cont res error"), 'error')
            }
        } catch (e) {
            console.error("Error sending message: ", e)
            pop(t("server req error"), 'error')
        }

    }

    return (
        <>
            {contextHolder2}
            <div className={s.body}>
                <Navbar />
                <div className={s.content}>
                    <div className={s.outerWrapper}>
                        <div className={s.text_area}>
                            <div className={s.title}>
                                <h1>{t("cont title")}</h1>
                                <h3>{t("cont desc")}</h3>
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
                                layout='vertical'
                                requiredMark='optional'
                                onFinish={submitMsg}
                                name="contact_form"
                                initialValues={{
                                    remember: true,
                                }}
                            >
                                <ConfigProvider
                                    theme={{
                                        token: { colorPrimary: '#8993ED' },
                                        components: {
                                            Form: {
                                                itemMarginBottom: 10,
                                                labelFontSize: 16,
                                            },
                                        }
                                    }}
                                >
                                    <Spin spinning={isLoading} tip={t("cont spintip")} size="large">
                                        <div className={s.column} style={{ direction: i18n.dir() }}>
                                            <div className={s.column_part}>
                                                <div className={s.input_box}>
                                                    <Form.Item
                                                        label={t("cont name label")}
                                                        className={s.input}
                                                        name="name"
                                                        rules={[{
                                                            required: true,
                                                            message: t("cont name msg")
                                                        }]}>
                                                        <Input
                                                            allowClear
                                                            size="large"
                                                            placeholder={t("cont name placeholder")}
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className={s.column_part}>
                                                <div className={s.input_box}>
                                                    <Form.Item
                                                        name="email"
                                                        label={t("cont email label")}
                                                        rules={[{
                                                            required: true,
                                                            message: t("cont email msg"),
                                                            type: 'email'
                                                        }]}
                                                    >
                                                        <Input
                                                            allowClear
                                                            size="large"
                                                            placeholder='name@domain.com'
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={s.input_box} style={{direction: i18n.dir()}}>
                                            <Form.Item
                                                name="message"
                                                label= {t("cont message label")}
                                                rules={[{
                                                    required: true,
                                                    message: t("cont message msg"),
                                                }]}
                                            >
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
                                                    >{t("cont send btn")}</Button>
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