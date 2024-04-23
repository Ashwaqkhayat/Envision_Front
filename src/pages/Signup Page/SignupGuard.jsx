import React from "react";
import s from './Signup_style.module.css'
import Label from "../../components/Label/Label"

//import Ant Components
import { ConfigProvider, Input, InputNumber, Form, Button } from 'antd';
import { Select, Space } from 'antd';

function SignupChild1({onFinish, initialValues}) {

    const options = [
        { value: '+966', label: 'السعودية', },
        { value: '+974', label: 'قطر', },
        { value: '+971', label: 'الإمارات المتحدة', },
        { value: '+965', label: 'الكويت', },
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
                                inputTitle="الاسم الأول"
                                popTitle="First Name"
                                popMsg="Please enter your first name."
                            />
                            <Form.Item name={'first_name'} rules={[{required:true, message: "الاسم الأول مطلوب"}]}>
                                <Input size="large" placeholder="أشواق" />
                            </Form.Item>
                        </div>
                        <div className={s.namePart}>
                            <Label
                                inputTitle="الاسم الأخير"
                                popTitle="Last Name"
                                popMsg="Please enter your last name."
                            />
                            <Form.Item name={'last_name'} rules={[{required:true, message:"الاسم الأخير مطلوب"}]}>
                                <Input size="large" placeholder="خياط" />
                            </Form.Item>
                        </div>
                    </div>
                </div>

                <div className={s.input_box}>

                    <Label
                        inputTitle="رقم الهاتف"
                        popTitle="Enter Phone Number"
                        popMsg="Please enter a valid phone number."
                    />
                    
                        <Space.Compact className={s.input_pnumber}>
                            <Form.Item name={'phone_code'}>
                                <Select disabled size="large" placeholder="+966" options={options} />
                            </Form.Item>
                            <Form.Item className={s.input_pnumber} name={'phone_number'} rules={[
                                { required: true, message: "رقم الهاتف مطلوب" },
                                { pattern: new RegExp(/^\d{9}$/),  message: "قم بإدخال 9 أرقام, دون تضمين رمز الدولة", }
                            ]} >
                                <Input size="large" placeholder="500000000" maxLength='9' />
                            </Form.Item>
                        </Space.Compact>
                    

                </div>

                <div className={s.input_box}>
                    <Label
                        inputTitle="العمر"
                        popTitle="How Old Are You?"
                        popMsg="Please enter your age."
                    />
                    <Form.Item name={'age'} rules={[{required:true, message: "العمر مطلوب"}]}>
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
                    تسجيل
                    </Button>
                </div>
            </ConfigProvider>

        </Form>
        </>
    )
}

export default SignupChild1