import React from "react";
import s from './Signup_style.module.css'
import Label from "../../components/Label/Label"

//import Ant Components
import { ConfigProvider, Input, InputNumber, Form, Button } from 'antd';
import { Select, Space } from 'antd';

function SignupChild1({onFinish, initialValues}) {

    const options = [
        { value: '+966', label: 'Saudi Arabia', },
        { value: '+974', label: 'Qatar', },
        { value: '+971', label: 'UAE', },
        { value: '+965', label: 'Kuwait', },
        { value: '+973', label: 'Bahrain', },
        { value: '+20', label: 'Egypt', },
        { value: '+249', label: 'Sudan', },
        { value: '+968', label: 'Oman', },
        { value: '+963', label: 'Syria', },
        { value: '+213', label: 'Algeria', },
        { value: '+964', label: 'Iraq', },
        { value: '+212', label: 'Morocco', },
        { value: '+967', label: 'Yemen', },
      ];

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
                        inputTitle="Phone Number"
                        popTitle="Enter Phone Number"
                        popMsg="Please enter a valid phone number."
                    />
                    
                        <Space.Compact className={s.input_pnumber}>
                            <Form.Item name={'phone_code'}>
                                <Select size="large" placeholder="+966" options={options} />
                            </Form.Item>
                            <Form.Item className={s.input_pnumber} name={'phone_number'} rules={[
                                { required: true, message: "Phone number is required" },
                                { pattern: new RegExp(/^\d{9}$/),  message: "Enter only 9 digits, without dialing code", }
                            ]} >
                                <Input size="large" placeholder="500000000" maxLength='9' />
                            </Form.Item>
                        </Space.Compact>
                    

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
                        max={60}
                        defaultValue={1}
                        />
                    </Form.Item>
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
                    Submit
                    </Button>
                </div>
            </ConfigProvider>

        </Form>
        </>
    )
}

export default SignupChild1