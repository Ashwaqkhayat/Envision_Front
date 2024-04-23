import React, { useState } from 'react'
import s from './EditProfile_style.module.css'
import { useNavigate } from 'react-router-dom'
import { ConfigProvider, Button, Input, Modal, Select, message, Spin, Form } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

function Settings(props) {
    let menuSelection = props.menuSelection
    let accountType = props.accType
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const { confirm } = Modal

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

    // Delete Account Form
    // const onFinish = (values) => {
    //     showDeleteConfirm(values)
    // }

    //Selection (Soon...)
    const handleChange = (value) => {
        console.log(`selected ${value}`)
    }

    // Modal to inform errors
    const openErrorModal = (msg) => {
        Modal.error({
            title: 'Something went wrong!',
            content: msg,
            centered: true,
            okButtonProps: { style: { backgroundColor: '#8993ED' } },
        })
    }

    // Delete Confirm Modal
    const showDeleteConfirm = (values) => {
        confirm({
            title: `هل أنت متأكد من أنك تريد حذف هذا الحساب؟`,
            icon: <ExclamationCircleFilled />,
            centered: true,
            okText: 'نعم',
            okType: 'danger',
            cancelText: 'لا',
            cancelButtonProps: { style: { borderColor: '#7a7a7a', color: '#7a7a7a' } },
            onOk() {
                console.log('Confirm delete request')
                deleteAccount(values)
            },
            onCancel() {
                console.log('Cancel delete request')
            },
        })
    }

    const deleteAccount = (values) => {
        let url = accountType == "child" ? "/children " : "/guardians/"
        console.warn("pass is: ", values.password)
        const fetchData = async () => {
            console.log("Deleting Account")
            setIsLoading(true)
            const requestBody = { password: values.password }
            try {
                const response = await fetch(`${process.env.REACT_APP_url}${url}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(requestBody),
                })
                const data = await response.json()
                if (response.ok) {
                    console.log(data.message)
                    popMsg('تم حذف الحساب بنجاح, سنفتقدك', 'success')
                    localStorage.clear()
                    setIsLoading(false)
                    setTimeout(() => {
                        navigate('/')
                    }, 1600)
                } else {
                    console.error(`Network response was not ok: ${response.status}, ${data.error}`)
                    setIsLoading(false)
                    popMsg(data.error, 'error')
                }
            } catch (err) {
                console.error("Failed: ", err)
                popMsg('Something went wrong, try again later', 'error')
                setIsLoading(false)
                window.location.reload(false)
            }
        }
        fetchData()
    }



    return (
        <>
            <ConfigProvider theme={{ token: { colorPrimary: '#8993ED' }, }}>
                {contextHolder}
                <Spin size='large' spinning={isLoading}>
                    <div className={s.header}>
                        <h2>{menuSelection}</h2>
                    </div>

                    <div className={s.bodyInputs}>
                        <div className={s.appearance}>
                            <h3>المظهـــر</h3>
                            <p>اللغــة</p>
                            <Select
                                disabled='true'
                                size='large'
                                defaultValue="english"
                                onChange={handleChange}
                                style={{
                                    width: 200,
                                }}
                                options={[
                                    {
                                        value: 'english',
                                        label: 'الإنجليزية',
                                    },
                                    {
                                        value: 'arabic',
                                        label: 'العربية',
                                    },
                                ]}
                            />
                        </div>
                        <div className={s.accDelete}>
                            <h3>حذف الحســاب</h3>
                            <p className={s.warning}><span>تنبيه:</span> حذف الحساب عملية لا يمكن التراجع عنها, سيتم حذف جميع القصص الخاصة بك والأوصياء</p>

                            <Form onFinish={showDeleteConfirm} >
                                <div className={s.passInput}>
                                    <p>كلمة المرور الحالية</p>
                                    <Form.Item name={'password'} rules={[{ required: true, message: 'Please input your password' },]}>
                                        <Input.Password size='large' placeholder="Enter password" />
                                    </Form.Item>
                                </div>
                                <Button danger htmlType="submit" type='primary' size='large' >حذف الحساب</Button>
                            </Form>
                        </div>
                    </div>
                </Spin>
            </ConfigProvider>
        </>
    )
}

export default Settings