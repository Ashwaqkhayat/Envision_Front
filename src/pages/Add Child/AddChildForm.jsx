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

        let fcolor = values.favorite_color
        if (fcolor == 'ازرق' || fcolor == 'أزرق' || fcolor == 'الازرق' || fcolor == 'الأزرق'){
            fcolor = 'blue'
        } else if (fcolor == 'وردي' || fcolor == 'الوردي' || fcolor == 'زهري' || fcolor == 'الزهري'){
            fcolor = 'pink'
        } else if (fcolor == 'بنفسجي' || fcolor == 'البنفسجي' || fcolor == 'موفي' || fcolor == 'الموفي'){
            fcolor = 'purple'
        } else if (fcolor == 'اخضر' || fcolor == 'الأخضر' || fcolor == 'أخضر' || fcolor == 'الاخضر'){
            fcolor = 'green'
        } else if (fcolor == 'اصفر' || fcolor == 'أصفر' || fcolor == 'الأصفر' || fcolor == 'الاصفر'){
            fcolor = 'yellow'
        } else {
            fcolor = 'black'
        }
        try {
            setIsLoading(true)
            const requestBody = {
                email: values.email,
                favorite_color: fcolor.toLowerCase(),
                birth_date: values.birthdate.$d,
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
                popMsg('تمت إضافة الطفل بنجاح', 'success')
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
                popMsg(data.error, 'error')
                console.error(`Error in sending HTTP request: ${data.error}`)
                setIsLoading(false)
            }
        } catch (err) {
            console.error("Failed adding child, ", err)
            popMsg('حدث خطأ ما, أعد المحاولة مرة أخرى')
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
                            <Spin className={s.spin} spinning={isLoading} tip="يتم إضافة الطفل..." size="large">
                                <div className={s.wrapper}>
                                    <Link
                                        className={s.cancel_btn}
                                        onClick={() => { navigate(-1) }}
                                    >Cancel
                                    </Link>

                                    <h1>إضافة طفــل</h1>

                                    <div className={s.form_part}>
                                        <div className={s.input_box}>
                                            <Label
                                                inputTitle="البريد الإلكتروني للطفل"
                                                popTitle="البريد الإلكتروني للطفل"
                                                popMsg="رجاءً قم بإدخال البريد الإلكتروني الخاص بالطفل المراد إضافته"
                                            />

                                            <Form.Item name={'email'} rules={[{
                                                required: true, type: 'email', message: 'رجاءً قم بإدخال البريد الإلكتروني'
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
                                                inputTitle="تاريخ ميلاد الطفل"
                                                popTitle="متى ولد الطفل؟"
                                                popMsg="رجاءً قم تاريخ ميلاد الطفل المراد إضافته"
                                            />

                                            {/* <Space className={s.input_bdate} direction="vertical"> */}
                                            <Form.Item className={s.input_bdate} name={'birthdate'} rules={[{
                                                required: true,
                                                message: 'رجاءً قم بإدخال تاريخ الميلاد'
                                            }]}>
                                                <DatePicker className={s.input_bdate} size="large" />
                                            </Form.Item>
                                            {/* </Space> */}
                                        </div>
                                        <div className={s.input_box}>
                                            <Label
                                                inputTitle="اللون المفضل للطفل"
                                                popTitle="ما هو اللون المفضل للطفل؟"
                                                popMsg="هل هو البنفسجي؟ الأزرق, الأخضر, الأصفر, أم الوردي"
                                            />

                                            <Form.Item name={'favorite_color'} rules={[{
                                                required: true,
                                                message: 'رجاءُ قم بإدخال اللون المفضل'
                                            }]}>
                                                <Input size="large" placeholder="Blue" />
                                            </Form.Item>
                                        </div>
                                        <div className={s.input_box}>
                                            <Label
                                                inputTitle="مهنة الوصي"
                                                popTitle="ما هي مهنتك؟"
                                                popMsg="رجاءً قم بتحديد دورك بناءً على علاقتك بالطفل"
                                            />

                                            <Form.Item name={'occupation'} rules={[{
                                                required: true,
                                                message: 'رجاء قم بتحديد مهنتك'
                                            }]}>
                                                <Radio.Group size="large">
                                                    <Radio.Button value="relative">قريب</Radio.Button>
                                                    <Radio.Button value="teacher">معلم</Radio.Button>
                                                    <Radio.Button value="doctor">طبيب</Radio.Button>
                                                    <Radio.Button value="specialist">أخصائي</Radio.Button>
                                                    <Radio.Button value="other">آخر</Radio.Button>
                                                </Radio.Group>
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className={s.bottom_part}>
                                        <Button className={s.submitBtn} htmlType="submit" type="primary" size="large" >
                                            إضافة الطفل
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