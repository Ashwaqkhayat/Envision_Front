import React from "react"
import s from './EditProfile_style.module.css'
import { ConfigProvider, Button, Form, Input, message, Spin } from 'antd'
// translation hook
import { useTranslation } from 'react-i18next';

export default function ChangePassForm({ onFinish }) {
    const { t } = useTranslation()
    // ChangePass Form things
    const [form] = Form.useForm()

    return (
        <>
            <ConfigProvider theme={{ token: { colorPrimary: '#8993ED' } }}>
                <Form
                    className={s.fullheight}
                    form={form}
                    onFinish={onFinish}
                    name="changePassword"
                    layout="vertical"
                    initialValues={{ remember: true }}
                >
                    <div className={s.header}>
                        <h2>{t("editprof changePass")}</h2>
                        <Button htmlType="submit" size='large' type='primary'>{t("save btn")}</Button>
                    </div>

                    <div className={s.bodyInputs}>
                        <Form.Item
                            label= {t("changePass newpass label")}
                            name="password"
                            rules={[{ required: true, },]}
                        >
                            <Input.Password size='large' placeholder={t("changePass newpass placeholder")} />
                        </Form.Item>

                        <Form.Item
                            label= {t("changePass confirm label")}
                            name="password2"
                            dependencies={['password']}
                            rules={[{ required: true, },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(t("changePass confirm fail")));
                                },
                            }),
                            ]}
                        >
                            <Input.Password size='large' placeholder={t("changePass confirm placeholder")} />
                        </Form.Item>
                    </div>
                </Form>
            </ConfigProvider>
        </>
    )
}