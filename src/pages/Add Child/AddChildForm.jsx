import React, { useEffect, useState } from "react"
import s from './AddChild_style.module.css'
import Label from "../../components/Label/Label"
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Link, useNavigate } from "react-router-dom";
import { ConfigProvider, Input, Form, Button, message, Spin, Space, DatePicker, Flex, Radio } from 'antd';
import { MailOutlined } from '@ant-design/icons';

function AddChild() {
    const [isLoading, setIsLoading] = useState(false) //Loading indicator
    const navigate = useNavigate() //Navigate to prev window after adding
    const [messageApi, contextHolder] = message.useMessage() //Popup messages

    const onFinish = async (values) => { // When form is submitted

    }

    return (
        <>
            <div className={s.body}>
                <Navbar />
                {contextHolder}
                <div className={s.content}>
                    <Form onFinish={onFinish}>
                        <ConfigProvider //change color theme
                            theme={{
                                token: {
                                    colorPrimary: '#8993ED',
                                }
                            }} >
                            <Spin className={s.spin} spinning={isLoading} tip="Adding child..." size="large">
                                <div className={s.wrapper}>
                                    <Link
                                        className={s.cancel_btn}
                                        onClick={() => { navigate(-1) }}
                                    >Cancel
                                    </Link>

                                    <h1>Add Child</h1>

                                    <div className={s.form_part}>
                                        <div className={s.input_box}>
                                            <Label
                                                inputTitle="Child Email"
                                                popTitle="Child Email Address"
                                                popMsg="Please enter the email address of the child you want to add to your children list."
                                            />

                                            <Form.Item name={'email'} rules={[{
                                                required: true, type: 'email', message:'Please enter the email address'
                                            }]}>
                                                <Input
                                                    size="large"
                                                    placeholder="Name@Domain.com"
                                                    prefix={<MailOutlined className="site-form-item-icon" style={{ color: '#A2A9B0' }} />}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className={s.input_box}>
                                            <Label
                                                inputTitle="Child Birthdate"
                                                popTitle="When the child born?"
                                                popMsg="Please enter the birthdate of the child"
                                            />

                                            {/* <Space className={s.input_bdate} direction="vertical"> */}
                                            <Form.Item className={s.input_bdate} name={'birthdate'} rules={[{ required: true,
                                            message:'Please enter the birthdate' }]}>
                                                <DatePicker className={s.input_bdate} size="large" />
                                            </Form.Item>
                                            {/* </Space> */}
                                        </div>
                                        <div className={s.input_box}>
                                            <Label
                                                inputTitle="Child Favorite Color"
                                                popTitle="What is the child's favorite color?"
                                                popMsg="Is it Red? Blue? Green, Yellow, Pink, or Purple?"
                                            />

                                            <Form.Item name={'favorite_color'} rules={[{ required: true,
                                            message:'Please enter the favorite color' }]}>
                                                <Input size="large" placeholder="Blue" />
                                            </Form.Item>
                                        </div>
                                        <div className={s.input_box}>
                                            <Label
                                                inputTitle="Guardian Occupation"
                                                popTitle="What is your occupation?"
                                                popMsg="Please choose your role based on your relationship with the child"
                                            />

                                            <Form.Item name={'occupation'} rules={[{ required: true,
                                            message: 'Please choose your occupation' }]}>
                                                <Radio.Group size="large">
                                                    <Radio.Button value="relative">Relative</Radio.Button>
                                                    <Radio.Button value="teacher">Teacher</Radio.Button>
                                                    <Radio.Button value="doctor">Doctor</Radio.Button>
                                                    <Radio.Button value="specialist">Specialist</Radio.Button>
                                                    <Radio.Button value="other">Other</Radio.Button>
                                                </Radio.Group>
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className={s.bottom_part}>
                                        <Button className={s.submitBtn} htmlType="submit" type="primary" size="large" >
                                            Add Child
                                        </Button>
                                    </div>
                                </div>
                            </Spin>
                        </ConfigProvider>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AddChild