import React from "react";
import s from './Signup_style.module.css'
import Label from "../../components/Label/Label"

//import Ant Components
import { ConfigProvider, Flex, Radio, Input, Form, Button} from 'antd';
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
                        inputTitle="Email"
                        popTitle="Email Address"
                        popMsg="Please enter your email address."
                    />

                    <Form.Item name={'email'} rules={[{
                        required:true, type:'email' }]}>
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
                        popMsg="Please enter your secret password !"
                    />

                    <Form.Item name={'password'} rules={[{
                        required:true }]}>
                        <Input.Password
                            size="large"
                            placeholder="Password"
                        />
                    </Form.Item>
                </div>

                <div className={s.input_box}>
                    <Label
                        inputTitle="Account Type"
                        popTitle="Choose Account Type"
                        popMsg="Please select your account type.
                        The Child option is for minors under the age of 18,
                        while the Guardian option is for parents
                        or legal guardians managing their child's account."
                    />

                    <Flex vertical gap="middle">
                        <Form.Item name={'accType'} rules={[{required:true }]}>
                            <Radio.Group size="large">
                                <Radio.Button value="child">Child</Radio.Button>
                                <Radio.Button value="guardian">Guardian</Radio.Button>
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
                    Next
                    </Button>
                
                    <p>Already have an account? <Link className={s.text_highlight} to='/Signin'>Sign In</Link></p>
                </div>
            </ConfigProvider>

        </Form>
        </>
    )
}

export default SignupMain