import React from "react";
import s from './Signup_style.module.css'
//import Ant Components
import { ConfigProvider, Flex, Radio, Input, Form, Button, Spin } from 'antd';
import { MailOutlined } from '@ant-design/icons';
//Navigations using buttons
import { Link } from "react-router-dom";
// translation hook
import { useTranslation } from 'react-i18next';

function SignupMain({ onFinish, initialValues }) {
    const [form] = Form.useForm()
    const { t } = useTranslation();

    return (
        <>
            <Form
                name="register_main"
                form={form}
                layout="vertical"
                requiredMark="optional"
                onFinish={onFinish}
                initialValues={initialValues}
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
                    }
                }}
                >
                    <div className={s.form_part}>
                        <Form.Item 
                            name={'email'}
                            label= {t("reg main email label")}
                            tooltip= {t("reg main email tooltip")}
                            required
                            rules={[{
                                required: true, 
                                type: 'email', 
                                message: t("reg main email msg")
                            }]}>
                                <Input
                                    placeholder="Name@Domain.com"
                                    prefix={<MailOutlined className="site-form-item-icon" style={{ color: '#A2A9B0' }} />}
                                />
                        </Form.Item>

                        <Form.Item 
                            name={'password'}
                            label= {t("reg main pass label")}
                            tooltip= {t("reg main pass tooltip")}
                            required
                            rules={[{
                                required: true, 
                                message: t("reg main pass msg")
                            }]}>
                                <Input.Password
                                    maxLength={10}
                                    placeholder= {t("reg main pass placeholder")}
                                />
                        </Form.Item>

                        <Flex vertical gap="middle">
                            <Form.Item 
                                name={'accType'}
                                label= {t("reg main accT label")}
                                tooltip= {t("reg main accT tooltip")}
                                required
                                rules={[{ 
                                    required: true, 
                                    message: t("reg main accT msg")
                                }]}>
                                    <Radio.Group style={{ width: '100%' }}>
                                        <Radio.Button style={{ width: '50%' }} value="child">{t("reg main radio child")}</Radio.Button>
                                        <Radio.Button style={{ width: '50%' }} value="guardian">{t("reg main radio cg")}</Radio.Button>
                                    </Radio.Group>
                            </Form.Item>
                        </Flex>
                    </div>
                </ConfigProvider>

                <ConfigProvider
                    componentSize='large'
                    theme={{
                        token: {
                            colorPrimary: '#8993ED',
                            sizeStep: 14,
                        }
                }} >
                    <div className={s.bottom_part}>
                        <Button htmlType="submit" type="primary">{t("next btn")}</Button>
                        <p>{t("reg main haveAcc")}<Link className={s.text_highlight} to='/Signin'>{t("reg main signin")}</Link></p>
                    </div>
                </ConfigProvider>
            </Form>
        </>
    )
}

export default SignupMain