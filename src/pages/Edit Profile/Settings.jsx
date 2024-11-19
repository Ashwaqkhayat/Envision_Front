import React, { useState } from 'react'
import s from './EditProfile_style.module.css'
import { useNavigate } from 'react-router-dom'
import { ConfigProvider, Button, Input, Modal, Select, message, Spin, Form } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
// translation hook
import { useTranslation } from 'react-i18next';
import i18next from 'i18next'

function Settings(props) {
    const { t } = useTranslation()
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

    //Selection (Soon...)
    const handleChange = (value) => {
        console.log(`selected ${value}`)
    }

    // Modal to inform errors
    const openErrorModal = (msg) => {
        Modal.error({
            title: t("settings errormodal title"),
            content: msg,
            centered: true,
            okButtonProps: { style: { backgroundColor: '#8993ED' } },
        })
    }

    // Delete Confirm Modal
    const showDeleteConfirm = (values) => {
        confirm({
            direction: i18n.dir(),
            title: t("settings del confirm title"),
            icon: <ExclamationCircleFilled />,
            centered: true,
            okText: t("settings del confirm ok"),
            okType: 'danger',
            cancelText: t("settings del confirm cancel"),
            cancelButtonProps: { style: { borderColor: '#7a7a7a', color: '#7a7a7a' } },
            onOk() {
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
                    popMsg(t("settings del success"), 'success')
                    localStorage.clear()
                    setIsLoading(false)
                    setTimeout(() => {
                        navigate('/')
                    }, 1600)
                } else {
                    console.error(`Network response was not ok: ${response.status}, ${data.error}`)
                    setIsLoading(false)
                    popMsg(t("settings del failure"), 'error')
                }
            } catch (err) {
                console.error("Failed: ", err)
                popMsg(t("server req error"), 'error')
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
                        <h2>{t("editprof settings")}</h2>
                    </div>

                    <div className={s.bodyInputs}>
                        {/* <div className={s.appearance}>
                            <h3>{t("settings appearance")}</h3>
                            <p>{t("settings lang")}</p>
                            <Select
                                disabled='true'
                                size='large'
                                defaultValue="arabic"
                                onChange={handleChange}
                                style={{
                                    width: 200,
                                }}
                                options={[
                                    {
                                        value: 'en',
                                        label: 'English',
                                    },
                                    {
                                        value: 'ar',
                                        label: 'العربية',
                                    },
                                ]}
                            />
                        </div> */}
                        <div className={s.accDelete}>
                            <h3>{t("settings delAcc")}</h3>
                            <p className={s.warning}><span>{t("settings delAcc caut1")}:</span> {t("settings delAcc caut2")}</p>

                            <Form onFinish={showDeleteConfirm} >
                                <div className={s.passInput}>
                                    <p>{t("delAcc pass label")}</p>
                                    <Form.Item name={'password'} rules={[{ required: true, message: t("delAcc pass msg") },]}>
                                        <Input.Password size='large' placeholder={t("delAcc pass placeholder")} />
                                    </Form.Item>
                                </div>
                                <Button danger htmlType="submit" type='primary' size='large'>{t("delAcc btn")}</Button>
                            </Form>
                        </div>
                    </div>
                </Spin>
            </ConfigProvider>
        </>
    )
}

export default Settings