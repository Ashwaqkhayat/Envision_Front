import React from "react";
import s from './Signup_style.module.css'
//import Ant Components
import { ConfigProvider, Flex, Radio, Form, Button } from 'antd';
import { DatePicker, Space } from 'antd';
// translation hook
import { useTranslation } from 'react-i18next';

function SignupChild2({ onFinish, initialValues }) {
    const [form] = Form.useForm()
    const { t } = useTranslation();

    return (
        <>
            <Form
            name="register_child2"
            form={form}
            layout="vertical"
            requiredMark="optional"
            onFinish={onFinish} 
            initialValues={initialValues}
            >
                <ConfigProvider
                    componentSize="large"
                    theme={{
                        token: { colorPrimary: '#8993ED', sizeStep: 5 },
                        components: { Form: { labelFontSize: 16 } }
                    }}
                >
                    <div className={s.form_part}>
                            <Space className={s.input_bdate} direction="vertical">
                                <Form.Item 
                                name={'birth_date'}
                                label= {t("reg child bdate label")}
                                required
                                rules={[{ 
                                    required: true, 
                                    message: t("reg child bdate msg")
                                }]}>
                                    <DatePicker className={s.input_bdate} placeholder={t("")}/>
                                </Form.Item>
                            </Space>

                            <Flex vertical gap="middle">
                                <Form.Item
                                name={'faveColor'}
                                label= {t("reg child fcolor label")}
                                rules={[{ required: true, message: t("reg child fcolor msg") }]}>
                                    <Radio.Group style={{ width: '100%' }}>
                                        <Radio.Button style={{ width: '20%' }} value="blue">{t("reg child color1")}</Radio.Button>
                                        <Radio.Button style={{ width: '20%' }} value="pink">{t("reg child color2")}</Radio.Button>
                                        <Radio.Button style={{ width: '20%' }} value="purple">{t("reg child color3")}</Radio.Button>
                                        <Radio.Button style={{ width: '20%' }} value="green">{t("reg child color4")}</Radio.Button>
                                        <Radio.Button style={{ width: '20%' }} value="yellow">{t("reg child color5")}</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </Flex>
                        </div>
                </ConfigProvider>

                <ConfigProvider
                    theme={{
                        token: {colorPrimary: '#8993ED',sizeStep: 14}
                    }}
                >
                    <div className={s.bottom_part}>
                        <Button htmlType="submit" type="primary" size="large">{t("register btn")}</Button>
                    </div>
                </ConfigProvider>

            </Form>
        </>
    )
}

export default SignupChild2