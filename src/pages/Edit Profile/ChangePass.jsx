import React, { useState } from 'react'
import s from './EditProfile_style.module.css'
import ChangePassForm from './ChangePassForm'
import OTP from './OTP'
import { ConfigProvider, message, Spin } from 'antd'
// translation hook
import { useTranslation } from 'react-i18next';

function ChangePass(props) {
    const { t } = useTranslation()
    let accountType = props.accType
    const [isLoading, setIsLoading] = useState(false)
    const [isOTPLoading, setIsOTPLoading] = useState(false)
    const [showVerify, setShowVerify] = useState(false)

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

    const [newPassword, setNewPassword] = useState(null)

    function onFinishForm(values) {
        // 0. set new password state
        // 1. Request OTP API
        // 2. on OK, show OTP form using setShowVerify(true)

        setNewPassword(values.password)

        const requestOTP = async () => {
            console.log("Requesting OTP...")
            setIsLoading(true)
            try {
                const response = await fetch(`${process.env.REACT_APP_url}/request-otp`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', },
                    credentials: 'include',
                })
                const data = await response.json()

                if (response.ok) {
                    console.log("OTP Sent Successfully")
                    popMsg(t("changePass sendOTP req succ"), 'success')
                    setShowVerify(true)
                } else {
                    console.error(`Network response was not ok: ${response.status}`)
                    popMsg(t("changePass sendOTP req error"), 'error')
                }
            } catch (err) {
                console.error("Failed requesting OTP, ", err)
                popMsg(t("server req error"), 'error')
            } finally {
                setIsLoading(false)
            }
        }
        requestOTP()
    }

    function onFinishOTP(code) {
        // 1. Verify OTP
        // 2. on OK, call changePassword API
        // console.log("Entered OTP: ", parseInt(code.otp))
        const requestBody = { otp: parseInt(code.otp) }

        const verifyOTP = async () => {
            setIsOTPLoading(true)
            try {
                const response = await fetch(`${process.env.REACT_APP_url}/verify-otp`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
                    credentials: 'include',
                    body: JSON.stringify({ otp: parseInt(code.otp) }),
                })
                const data = await response.json()
                if (response.ok) {
                    changePass(newPassword)
                } else {
                    console.error(`Network response was not ok: ${response.status} ${data.error}`)
                    popMsg(t("changePass verOTP req error"), 'error')
                }
            } catch (err) {
                console.error("Failed: ", err)
                popMsg(t("server req error"), 'error')
            } finally {
                setIsOTPLoading(false)
            }
        }
        verifyOTP()

    }

    async function changePass(pass) {
        let url = accountType == "child" ? "/children/password " : "/guardians/password"
        setIsLoading(true)
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_url}${url}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ password: pass }),
                })
                if (response.ok) {
                    setIsLoading(false)
                    popMsg(t("changePass success"), 'success')
                    setTimeout(() => { setShowVerify(false) }, 1300)
                } else {
                    console.error(`Network response was not ok: ${response.status}`)
                    setIsLoading(false)
                    popMsg(t("changePass failure"), 'error')
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
            <ConfigProvider theme={{ token: { colorPrimary: '#8993ED' } }}>
                {contextHolder}
                {isLoading ?
                    <div className={`${s.center_flex} ${s.fullheight}`}>
                        <Spin size='large' spinning={isLoading} />
                    </div>
                    :
                    !showVerify ?
                        <ChangePassForm onFinish={onFinishForm} />
                        :
                        <OTP onFinish={onFinishOTP} isLoading={isOTPLoading}/>

                }
            </ConfigProvider>
        </>
    )
}

export default ChangePass