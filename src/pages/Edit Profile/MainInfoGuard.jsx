import React, { useEffect, useState } from 'react'
import s from './EditProfile_style.module.css'
import { useNavigate } from 'react-router-dom'
import { ConfigProvider, Button, Form, Input, InputNumber, Select, Spin, message } from 'antd'
// translation hook
import { useTranslation } from 'react-i18next';

function MainInfoGuard() {
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)
    const [info, setInfo] = useState(null)
    const navigate = useNavigate()
    // Edit Profile Form things
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
                justifyContent: 'center',
            },
        })
    }

    const { Option } = Select
    const selectBefore = (
        <Select
            disabled
            placeholder="+966"
            style={{
                width: 80,
            }}
        >
            <Option value="+966">SA</Option>
            <Option value="+974">َQatar</Option>
            <Option value="+971">UAE</Option>
            <Option value="+965">Kuwait</Option>
            <Option value="+973">Bahrain</Option>
            <Option value="+20">Egypt</Option>
            <Option value="+249">Sudan</Option>
            <Option value="+968">Oman</Option>
            <Option value="+963">Syria</Option>
            <Option value="+213">Algeria</Option>
            <Option value="+964">Iraq</Option>
            <Option value="+212">Morocco</Option>
            <Option value="+967">Yemen</Option>
        </Select>
    )

    // Get current info
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_url}/guardians/profile`, {
                    method: 'GET',
                    credentials: 'include',
                })
                const data = await response.json()
                if (response.ok) {
                    console.log("Profile fetched successfully")
                    const profileData = JSON.parse(JSON.stringify(data)).profile
                    setInfo(profileData)
                    console.log(profileData)
                } else {
                    throw new Error(`Network response was not ok: ${response.status}`)
                }
            } catch (err) {
                console.error("Failed getting user's profile: ", err)
                navigate('/profile')
            }
        }
        fetchData()
    }, [])

    const onFinish = (values) => {
        //setIsLoading(true)
        const requestBody = {
            email: values.email.length === 0 ? info.email : values.email,
            first_name: values.first_name.length === 0 ? info.first_name : values.first_name,
            last_name: values.last_name.length === 0 ? info.last_name : values.last_name,
            age: values.age < 1 ? info.age : values.age,
            phone: values.phone_number.length < 1 ? info.phone : ("+966" + values.phone_number),
        }

        console.log(requestBody)
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_url}/guardians/profile`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody),
                    credentials: 'include'
                })
                const data = await response.json()
                if (response.ok) {
                    popMsg(t("editprof success msg"), 'success')
                    setIsLoading(false)
                } else {
                    throw new Error("Response is ok but ", data)
                }

            } catch (error) {
                console.error('Error during update profile:', error)
                popMsg(t("server req error"), 'error')
                setIsLoading(false)
            }
        }
        fetchData()
    }

    if (info) {
        return (
            <>
                <ConfigProvider theme={{ token: { colorPrimary: '#8993ED' } }}>
                    {contextHolder}
                    <Spin size='large' spinning={isLoading}>
                        <Form
                            form={form}
                            onFinish={onFinish}
                            name="editProfile"
                            layout="vertical"
                            initialValues={{
                                email: info.email,
                                first_name: info.first_name,
                                last_name: info.last_name,
                                age: info.age,
                                phone_number: info.phone.slice(4),
                            }}
                        >
                            <div className={s.header}>
                                <h2>{t("editprof edit info")}</h2>
                                <Button htmlType="submit" size='large' type='primary'>{t("save btn")}</Button>
                            </div>

                            <div className={s.bodyInputs}>
                                <div className={s.columnInputs}>
                                    <Form.Item label={t("editprof fname")} name={'first_name'}>
                                        <Input size='large' />
                                    </Form.Item>
                                    <Form.Item label={t("editprof lname")} name={'last_name'}>
                                        <Input size='large' />
                                    </Form.Item>
                                </div>

                                <Form.Item label={t("editprof email")} name={'email'} rules={[{ required: false, type: 'email' }]}>
                                    <Input size='large' placeholder={t("editprof email placeholder")} />
                                </Form.Item>

                                <div className={s.columnInputs}>
                                    <Form.Item
                                        label={t("editprof phone")}
                                        className={s.input_pnumber}
                                        name={'phone_number'}
                                        rules={[
                                            { pattern: new RegExp(/^\d{9}$/), message: t("editprof phone msg") }]}
                                    >
                                        <Input
                                            size="large"
                                            addonBefore={selectBefore}
                                            placeholder="500000000"
                                            maxLength='9'
                                            style={{ width: 230 }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={'age'}
                                        label= {t("editprof age")}
                                        style={{ flex: 1 }}
                                    >
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            size="large"
                                            min={1}
                                            max={100}
                                            placeholder='30'
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </Form>
                    </Spin>
                </ConfigProvider>
            </>
        )
    }
}

export default MainInfoGuard