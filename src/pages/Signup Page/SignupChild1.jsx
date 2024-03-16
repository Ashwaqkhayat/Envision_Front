import React from "react"
import s from './Signup_style.module.css'
import Label from "../../components/Label/Label"

//import Ant Components
import { ConfigProvider, Flex, Radio, Input, InputNumber, Form, Button } from 'antd';

function SignupChild1({onFinish, initialValues}) {

    return (
        <>
        <Form onFinish={onFinish} initialValues={initialValues}>

            <ConfigProvider //change color theme
                theme={{
                    token: {
                        colorPrimary: '#8993ED',
                        sizeStep: 5,
                    }
                }} >

                <div className={s.input_box}>
                    <div className={s.column}>
                        <div className={s.namePart}>
                            <Label
                                inputTitle="First Name"
                                popTitle="First Name"
                                popMsg="Please enter your first name."
                            />
                            <Form.Item name={'first_name'} rules={[{required:true}]}>
                                <Input size="large" placeholder="Ashwaq" />
                            </Form.Item>
                        </div>
                        <div className={s.namePart}>
                            <Label
                                inputTitle="Last Name"
                                popTitle="Last Name"
                                popMsg="Please enter your last name."
                            />
                            <Form.Item name={'last_name'} rules={[{required:true}]}>
                                <Input size="large" placeholder="Khayat" />
                            </Form.Item>
                        </div>
                    </div>
                </div>

                <div className={s.input_box}>
                    <Label
                        inputTitle="Age"
                        popTitle="How Old Are You?"
                        popMsg="Please enter your age."
                    />
                    <Form.Item name={'age'} rules={[{required:true}]}>
                        <InputNumber
                        className={s.input_age}
                        size="large"
                        min={1} 
                        max={20}
                        defaultValue={1}
                        />
                    </Form.Item>
                </div>

                
                <div className={s.input_box}>

                    <Label
                        inputTitle="Gender"
                        popTitle="Choose Your Gender"
                        popMsg="Please select your gender whether you are Male
                        or Female."
                    />

                    <Flex vertical gap="middle">
                        <Form.Item name={'gender'} rules={[{required:true}]}>
                            <Radio.Group size="large" >
                                <Radio.Button value="female">Female</Radio.Button>
                                <Radio.Button value="male">Male</Radio.Button>
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
                    <Button htmlType="submit" type="primary" size="large">
                    Next
                    </Button>
                </div>
            </ConfigProvider>

        </Form>
        </>
    )
}

export default SignupChild1