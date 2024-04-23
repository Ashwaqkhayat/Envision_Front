import React from "react";
import s from './Signup_style.module.css'
import Label from "../../components/Label/Label"

//import Ant Components
import { ConfigProvider, Flex, Radio, Form, Button } from 'antd';
import { DatePicker, Space } from 'antd';

function SignupChild2({ onFinish, initialValues}) {

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
                    <Label
                        inputTitle="تاريخ الميـلاد"
                        popTitle="What is Your Birth Date?"
                        popMsg="Please enter the date you were born and
                        came to this beautiful life !"
                    />
                    <Space className={s.input_bdate} direction="vertical">
                        <Form.Item name={'birth_date'} rules={[{required:true, message: "يجب تحديد تاريخ الميلاد"}]}>
                            <DatePicker className={s.input_bdate} size="large" />
                        </Form.Item>
                    </Space>
                </div>

                {/* Start Radio Button ====================================*/}
                <div className={`${s.input_box} ${s.input_color}`}>

                    <Label
                        inputTitle="اللون المفضـل"
                        popTitle="Choose Your Favoriye Color!"
                        popMsg="Please select your favorite wonderful color."
                    />

                    <Flex vertical gap="middle">
                        <Form.Item name={'faveColor'} rules={[{required:true}]}>
                            <Radio.Group size="large">
                                <Radio.Button value="blue">الأزرق</Radio.Button>
                                <Radio.Button value="pink">الوردي</Radio.Button>
                                <Radio.Button value="purple">البنفسجي</Radio.Button>
                                <Radio.Button value="green">الأخضر</Radio.Button>
                                <Radio.Button value="yellow">الأصفر</Radio.Button>
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
                    تسجــيل
                    </Button>
                </div>
            </ConfigProvider>

        </Form>
        </>
    )
}

export default SignupChild2