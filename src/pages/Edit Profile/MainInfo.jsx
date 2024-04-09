import React, { useState } from 'react'
import s from './EditProfile_style.module.css'
import { ConfigProvider, Button, Form, Input, Radio, InputNumber, DatePicker } from 'antd'

function MainInfo(props) {
    let menuSelection = props.menuSelection
    // Edit Profile Form things
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
    }
    return (
        <>
            <ConfigProvider theme={{
                token: {
                    colorPrimary: '#8993ED'
                },
            }}>
                <Form
                    form={form}
                    onFinish={onFinish}
                    name="editProfile"
                    layout="vertical"
                    initialValues={{ remember: true, }}
                >
                    <div className={s.header}>
                        <h2>{menuSelection}</h2>
                        <Button htmlType="submit" size='large' type='primary'>Save</Button>
                    </div>
                    
                    <div className={s.columnInputs}>
                        <Form.Item label="First Name" name={'first_name'}>
                            <Input size='large' placeholder="First name" />
                        </Form.Item>
                        <Form.Item label="Last Name" name={'last_name'}>
                            <Input size='large' placeholder="Last name" />
                        </Form.Item>
                    </div>

                    <Form.Item label="Email" name={'email'} rules={[{ required: false, type: 'email' }]}>
                        <Input size='large' placeholder="Enter new email" />
                    </Form.Item>



                    <div className={s.columnInputs}>
                        <Form.Item label="Gender" name={'gender'}>
                            <Radio.Group size="large">
                                <Radio.Button value="female">Female</Radio.Button>
                                <Radio.Button value="male">Male</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        {/* <Form.Item name={'age'} label="Age" style={{ flex: 1 }}>
                            <InputNumber
                                style={{ width: '100%' }}
                                size="large"
                                min={1}
                                max={20}
                                placeholder='8'
                            />
                        </Form.Item> */}
                        <Form.Item name={'birth_date'} label="Birthdate" style={{ flex: 1 }}>
                            <DatePicker className={s.input_bdate} size="large" style={{ width: '100%' }} />
                        </Form.Item>
                    </div>

                    <Form.Item label="Favorite Color" name={'faveColor'} style={{ width: '100%' }}>
                        <Radio.Group size="large">
                            <Radio.Button className={s.radioBtn} value="blue">Blue</Radio.Button>
                            <Radio.Button className={s.radioBtn} value="pink">Pink</Radio.Button>
                            <Radio.Button className={s.radioBtn} value="purple">Purple</Radio.Button>
                            <Radio.Button className={s.radioBtn} value="green">Green</Radio.Button>
                            <Radio.Button className={s.radioBtn} value="yellow">Yellow</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                </Form>
            </ConfigProvider>
        </>
    )
}

export default MainInfo