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
                                inputTitle="الاسم الأول"
                                popTitle="First Name"
                                popMsg="Please enter your first name."
                            />
                            <Form.Item name={'first_name'} rules={[{required:true, message: "الاسم الأول مطلوب"}]}>
                                <Input size="large" placeholder="ريما" />
                            </Form.Item>
                        </div>
                        <div className={s.namePart}>
                            <Label
                                inputTitle="الاسم الأخير"
                                popTitle="Last Name"
                                popMsg="Please enter your last name."
                            />
                            <Form.Item name={'last_name'} rules={[{required:true, message: "الاسم الأخير مطلوب"}]}>
                                <Input size="large" placeholder="الغامدي" />
                            </Form.Item>
                        </div>
                    </div>
                </div>

                {/* <div className={s.input_box}>
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
                </div> */}

                
                <div className={s.input_box}>

                    <Label
                        inputTitle="الجنس"
                        popTitle="Choose Your Gender"
                        popMsg="Please select your gender whether you are Male
                        or Female."
                    />

                    <Flex vertical gap="middle">
                        <Form.Item name={'gender'} rules={[{required:true, message: "هل أنت فتاة أم صبي؟"}]}>
                            <Radio.Group size="large" style={{ width: '100%' }}>
                                <Radio.Button style={{ width: '50%' }} value="female">فـتاة</Radio.Button>
                                <Radio.Button style={{ width: '50%' }} value="male">صبــي</Radio.Button>
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
                    التالي
                    </Button>
                </div>
            </ConfigProvider>

        </Form>
        </>
    )
}

export default SignupChild1