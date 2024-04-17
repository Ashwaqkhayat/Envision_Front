import React, { useEffect, useState } from 'react'
import s from './EditProfile_style.module.css'
import { ConfigProvider, Button, Form, Input, Radio, DatePicker, Spin, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

function MainInfoChild(props) {
    let menuSelection = props.menuSelection
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [info, setInfo] = useState(null)
    const [form] = Form.useForm()

    // Messages 
    const [messageApi, contextHolder] = message.useMessage()
    const popMsg = (text, type) => {
        messageApi.open({
            type: type,
            content: text,
            duration: 5,
            style: {
                fontSize: '18px',
                alignItems: 'center',
            },
        })
    }

    // Get current info
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(`${process.env.REACT_APP_url}/children/profile`, {
                    method: 'GET',
                    credentials: 'include',
                })
                const data = await response.json()
                if (response.ok) {
                    console.log("Profile fetched successfully")
                    const profileData = JSON.parse(JSON.stringify(data)).profile
                    setInfo(profileData)
                } else {
                    throw new Error(`Network response was not ok: ${response.status}`)
                }
            } catch (err) {
                console.error("Failed getting user's profile: ", err)
                navigate('/profile')
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    // Edit Profile Form things
    const onFinish = (values) => {
        setIsLoading(true)
        const requestBody = {
            email: values.email.length < 1 ? info.email : values.email,
            first_name: values.first_name.length < 1 ? info.first_name : values.first_name,
            last_name: values.last_name.length < 1 ? info.last_name : values.last_name,
            gender: values.gender.length < 1 ? info.gender : values.gender,
            favorite_color: values.favorite_color.length < 1 ? info.favorite_color : values.favorite_color,
            birth_date: values.birth_date == undefined ? info.birth_date : values.birth_date.$d
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_url}/children/profile`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody),
                    credentials: 'include'
                })
                if (response.ok) {
                    const data = await response.json()
                    console.log('Profile Edited Successfully:', data.message)
                    popMsg('Profile updated successfully!', 'success')
                    setIsLoading(false)
                } else {
                    throw new Error("Response is ok but ", data)
                }

            } catch (error) {
                console.error('Error during update profile: ', error)
                popMsg('Something went wrong, try again later', 'error')
                setIsLoading(false)
            }
        }
        fetchData()
    }

    return (
        <>
            <ConfigProvider theme={{
                token: {
                    colorPrimary: '#8993ED'
                },
            }}>
                {contextHolder}
                {info == null ?
                    <div className={`${s.center_flex} ${s.fullheight}`}>
                        <Spin size='large' spinning={isLoading} />
                    </div>
                    :
                    <Form
                        className={s.fullheight}
                        form={form}
                        onFinish={onFinish}
                        name="editProfile"
                        layout="vertical"
                        initialValues={{
                            email: info.email,
                            first_name: info.first_name,
                            last_name: info.last_name,
                            gender: info.gender,
                            favorite_color: info.favorite_color,
                            birth_date: moment(info.birth_date)
                        }}
                    >
                        <div className={s.header}>
                            <h2>{menuSelection}</h2>
                            <Button htmlType="submit" size='large' type='primary'>Save</Button>
                        </div>

                        <div className={s.bodyInputs}>
                            <div className={s.columnInputs}>
                                <Form.Item label="First Name" name={'first_name'}>
                                    <Input size='large' placeholder="First name" />
                                </Form.Item>
                                <Form.Item label="Last Name" name={'last_name'}>
                                    <Input size='large' placeholder="Last name" />
                                </Form.Item>
                            </div>

                            <Form.Item label="Email" name={'email'} rules={[{ required: false, type: 'email' }]}>
                                <Input size='large' placeholder="Enter new email" />
                            </Form.Item>



                            <div className={s.columnInputs}>
                                <Form.Item label="Gender" name={'gender'}>
                                    <Radio.Group size="large">
                                        <Radio.Button value="female">Female</Radio.Button>
                                        <Radio.Button value="male">Male</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name={'birth_date'} label="Birthdate" style={{ flex: 1 }}>
                                    <DatePicker className={s.input_bdate} size="large" style={{ width: '100%' }} />
                                </Form.Item>
                            </div>

                            <Form.Item label="Favorite Color" name={'favorite_color'} style={{ width: '100%' }}>
                                <Radio.Group size="large">
                                    <Radio.Button className={s.radioBtn} value="blue">Blue</Radio.Button>
                                    <Radio.Button className={s.radioBtn} value="pink">Pink</Radio.Button>
                                    <Radio.Button className={s.radioBtn} value="purple">Purple</Radio.Button>
                                    <Radio.Button className={s.radioBtn} value="green">Green</Radio.Button>
                                    <Radio.Button className={s.radioBtn} value="yellow">Yellow</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                    </Form>
                }
            </ConfigProvider>
        </>
    )

}

export default MainInfoChild