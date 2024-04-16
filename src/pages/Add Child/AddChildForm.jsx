import React, { useEffect, useState } from "react"
import s from './AddChild_style.module.css'
import Label from "../../components/Label/Label"
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Link, useNavigate } from "react-router-dom";
import { ConfigProvider, Input, Form, Button, message, Spin, DatePicker, Radio } from 'antd';
import { MailOutlined } from '@ant-design/icons';

function AddChild() {
    const [isLoading, setIsLoading] = useState(false) //Loading indicator
    const navigate = useNavigate() //Navigate to prev window after adding
    const [messageApi, contextHolder] = message.useMessage() //Popup messages
    const popMsg = (text, type) => {
        messageApi.open({
            type: type,
            content: text,
            duration: 5,
            style: {
                fontSize: '18px',
                justifyContent: 'center',
            },
        })
    }

    const addChild = async (values) => { // When form is submitted
        try {
            setIsLoading(true)
            const requestBody = {
                email: values.email,
                favorite_color: values.favorite_color.toLowerCase(),
                birth_date: values.birthdate,
                relation: values.occupation,
            }
            console.log(requestBody)
            console.warn("> Adding Child...")
            const response = await fetch(`${process.env.REACT_APP_url}/guardians/children`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(requestBody),
            })
            const data = await response.json()

            if (response.ok) {
                console.log("> Child added successfully")
                setIsLoading(false)
                popMsg('Child added successfully!', 'success')
                setTimeout(() => {
                    navigate('/profile')
                }, 1300)
            } else if (response.status == 404) {
                console.error(response.status, data.error)
                setIsLoading(false)
                popMsg(data.error, 'error')
            } else if (response.status == 401) {
                // 401 means token isn't there
                localStorage.clear()
            } else {
                console.error(`Error in sending HTTP request: ${response.status}`)
                setIsLoading(false)
            }
        } catch (err) {
            console.error("Failed adding child, ", err)
            popMsg('Something went wrong, try again later.')
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className={s.body}>
                <Navbar />
                {contextHolder}
                <div className={s.content}>
                    <Form onFinish={addChild}>
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
                                                required: true, type: 'email', message: 'Please enter the email address'
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
                                            <Form.Item className={s.input_bdate} name={'birthdate'} rules={[{
                                                required: true,
                                                message: 'Please enter the birthdate'
                                            }]}>
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

                                            <Form.Item name={'favorite_color'} rules={[{
                                                required: true,
                                                message: 'Please enter the favorite color'
                                            }]}>
                                                <Input size="large" placeholder="Blue" />
                                            </Form.Item>
                                        </div>
                                        <div className={s.input_box}>
                                            <Label
                                                inputTitle="Guardian Occupation"
                                                popTitle="What is your occupation?"
                                                popMsg="Please choose your role based on your relationship with the child"
                                            />

                                            <Form.Item name={'occupation'} rules={[{
                                                required: true,
                                                message: 'Please choose your occupation'
                                            }]}>
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