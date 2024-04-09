import React, { useState } from 'react'
import s from './EditProfile_style.module.css'
import { ConfigProvider, Button, Form, Input} from 'antd'

function ChangePass(props) {
    let menuSelection = props.menuSelection

    // ChangePass Form things
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
    }

    return (
        <>
            <ConfigProvider theme={{ token: { colorPrimary: '#8993ED' }, }}>
                <Form
                    form={form}
                    onFinish={onFinish}
                    name="changePassword"
                    layout="vertical"
                    initialValues={{ remember: true, }}
                >
                    <div className={s.header}>
                        <h2>{menuSelection}</h2>
                        <Button htmlType="submit" size='large' type='primary'>Save</Button>
                    </div>

                    <div className={s.bodyInputs}>
                        <Form.Item
                            label="Current Password"
                            name="current_password"
                            rules={[{ required: true, },]}
                        >
                            <Input.Password size='large' placeholder='Enter current password' />
                        </Form.Item>

                        <Form.Item
                            label="New Password"
                            name="password"
                            rules={[{ required: true, },]}
                        >
                            <Input.Password size='large' placeholder='Enter new password' />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="password2"
                            dependencies={['password']}
                            rules={[{ required: true, },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                            ]}
                        >
                            <Input.Password size='large' placeholder='Confirm password' />
                        </Form.Item>
                    </div>
                </Form>
            </ConfigProvider>
        </>
    )
}

export default ChangePass