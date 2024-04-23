import React from "react";
import s from './Signup_style.module.css'
import Label from "../../components/Label/Label"

//import Ant Components
import { ConfigProvider, Flex, Radio, Input, Form, Button, Spin} from 'antd';
import { MailOutlined } from '@ant-design/icons';

//Navigations using buttons
import { Link } from "react-router-dom";

function SignupMain({onFinish, initialValues}) {

    return (
        <>
        <Form onFinish={onFinish} initialValues={initialValues}>

            <ConfigProvider //change color theme
                theme={{
                    token: {
                        colorPrimary: '#8993ED',
                    }
                }} > 

                <div className={s.input_box}>

                    <Label
                        inputTitle="البريد الألكتروني"
                        popTitle="Email Address"
                        popMsg="Please enter your email address."
                    />

                    <Form.Item name={'email'} rules={[{
                        required:true, type:'email', message: "البريد الإلكتروني مطلوب"}]}>
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
                        popMsg="Please enter your secret password !"
                    />

                    <Form.Item name={'password'} rules={[{
                        required:true, message: "يجب إدخال كلمة المرور" }]}>
                        <Input.Password
                            size="large"
                            maxLength={10}
                            placeholder="Password"
                        />
                    </Form.Item>
                </div>

                <div className={s.input_box}>
                    <Label
                        inputTitle="نوع الحساب"
                        popTitle="Choose Account Type"
                        popMsg="Please select your account type."
                    />

                    <Flex vertical gap="middle">
                        <Form.Item name={'accType'} rules={[{required:true, message :"يجب اختيار نوع الحساب" }]}>
                            <Radio.Group size="large" style={{ width: '100%' }}>
                                <Radio.Button style={{ width: '50%' }} value="child">طفــل</Radio.Button>
                                <Radio.Button style={{ width: '50%' }} value="guardian">وصــيّ</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Flex>
                </div>
            </ConfigProvider>

            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#8993ED',
                        sizeStep: 14,
                    }
                }} >

                <div className={s.bottom_part}>
                    <Button htmlType="submit" type="primary" size="large" >
                    التالي
                    </Button>
                
                    <p>تمتلك حسابًا؟ <Link className={s.text_highlight} to='/Signin'>سجل دخولك</Link></p>
                </div>
            </ConfigProvider>

        </Form>
        </>
    )
}

export default SignupMain