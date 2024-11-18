import React, { useEffect, useState } from "react"
import s from './AddChild_style.module.css'
import Label from "../../components/Label/Label"
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Link, useNavigate } from "react-router-dom";
import { ConfigProvider, Input, Form, Button, message, Spin, DatePicker, Radio } from 'antd';
import { MailOutlined } from '@ant-design/icons';
// translation hook
import { useTranslation } from 'react-i18next';

function AddChild() {
    const { t, i18n } = useTranslation()
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false) //Loading indicator
    const navigate = useNavigate() //Navigate to prev window after adding
    const [messageApi, contextHolder] = message.useMessage() //Popup messages
    const popMsg = (text, type) => {
        messageApi.open({
            type: type,
            content: text,
            duration: 5,
            style: {
                direction: i18n.dir(),
                fontSize: '18px',
                justifyContent: 'center',
            },
        })
    }

    const addChild = async (values) => { // When form is submitted

        let fcolor = values.favorite_color
        if (fcolor == 'ازرق' || fcolor == 'أزرق' || fcolor == 'الازرق' || fcolor == 'الأزرق' || fcolor == 'blue' || fcolor == 'Blue') {
            fcolor = 'blue'
        } else if (fcolor == 'وردي' || fcolor == 'الوردي' || fcolor == 'زهري' || fcolor == 'الزهري' || fcolor == 'pink' || fcolor == 'Pink') {
            fcolor = 'pink'
        } else if (fcolor == 'بنفسجي' || fcolor == 'البنفسجي' || fcolor == 'موفي' || fcolor == 'الموفي' || fcolor == 'purple' || fcolor == 'Purple') {
            fcolor = 'purple'
        } else if (fcolor == 'اخضر' || fcolor == 'الأخضر' || fcolor == 'أخضر' || fcolor == 'الاخضر' || fcolor == 'green' || fcolor == 'Green') {
            fcolor = 'green'
        } else if (fcolor == 'اصفر' || fcolor == 'أصفر' || fcolor == 'الأصفر' || fcolor == 'الاصفر' || fcolor == 'yellow' || fcolor == 'Yellow') {
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
            console.warn("Adding Child...")
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
                setIsLoading(false)
                popMsg(t("addc success msg"), 'success')
                setTimeout(() => { navigate('/profile') }, 1300)
            } else if (response.status == 404) {
                console.error(response.status, data.error)
                setIsLoading(false)
                popMsg(t("addc child notfound"), 'error')
            } else if (response.status == 401) {
                // 401 means token isn't there
                localStorage.clear()
            } else {
                popMsg(t("addc res error"), 'error')
                console.error(`Error in sending HTTP request: ${data.error}`)
                setIsLoading(false)
            }
        } catch (err) {
            console.error("Failed adding child, ", err)
            popMsg(t("server req error"), 'error')
            setIsLoading(false)
        }
    }
    return (
        <>
            <div className={s.body}>
                <Navbar />
                {contextHolder}
                <div className={s.content}>
                    <ConfigProvider //change color theme
                        theme={{
                            token: { colorPrimary: '#8993ED' },
                            components: { Form: { labelFontSize: 16 }, }
                        }} >
                        <Form
                            name="add_child"
                            form={form}
                            layout="vertical"
                            requiredMark="optional"
                            onFinish={addChild}>
                            <Spin className={s.spin} spinning={isLoading} tip={t("addc spin")} size="large">
                                <div className={s.wrapper} style={{direction: i18n.dir()}}>
                                    <Link
                                        className={s.cancel_btn}
                                        onClick={() => { navigate(-1) }}
                                    >{t("addc cancel btn")} </Link>

                                    <h1>{t("addc title")}</h1>

                                    <div className={s.form_part}>
                                        <Form.Item
                                            name={'email'}
                                            label={t("addc email")}
                                            required
                                            rules={[{
                                                required: true,
                                                type: 'email',
                                                message: t("addc email msg")
                                            }]}>
                                            <Input
                                                size="large"
                                                placeholder="Name@Domain.com"
                                                prefix={<MailOutlined className="site-form-item-icon" style={{ color: '#A2A9B0' }} />}
                                            />
                                        </Form.Item>

                                        {/* <Space className={s.input_bdate} direction="vertical"> */}
                                        <Form.Item
                                            className={s.input_bdate}
                                            label={t("addc bdate")}
                                            name={'birthdate'}
                                            required
                                            rules={[{
                                                required: true,
                                                message: t("addc bdate msg")
                                            }]}>
                                            <DatePicker className={s.input_bdate} size="large" />
                                        </Form.Item>
                                        {/* </Space> */}

                                        <Form.Item
                                            name={'favorite_color'}
                                            label={t("addc fcolor")}
                                            tooltip={t("addc fcolor tooltip")}
                                            required
                                            rules={[{
                                                required: true,
                                                message: t("addc fcolor msg")
                                            }]}>
                                            <Input size="large" placeholder="Blue" />
                                        </Form.Item>

                                        <Form.Item
                                            name={'occupation'}
                                            label={t("addc occ")}
                                            tooltip={t("addc occ tooltip")}
                                            rules={[{
                                                required: true,
                                                message: t("addc occ msg")
                                            }]}>
                                            <Radio.Group size="large" style={{width: '100%'}} >
                                                <Radio.Button value="relative" style={{width: '20%'}}>{t("addc occ relative")}</Radio.Button>
                                                <Radio.Button value="teacher" style={{width: '20%'}}>{t("addc occ teacher")}</Radio.Button>
                                                <Radio.Button value="doctor" style={{width: '19%'}}>{t("addc occ doctor")}</Radio.Button>
                                                <Radio.Button value="specialist" style={{width: '23%'}}>{t("addc occ specialist")}</Radio.Button>
                                                <Radio.Button value="other" style={{width: '18%'}}>{t("addc occ other")}</Radio.Button>
                                            </Radio.Group>
                                        </Form.Item>
                                    </div>

                                    <div className={s.bottom_part}>
                                        <Button className={s.submitBtn} htmlType="submit" type="primary" size="large" >
                                            {t("addc submit btn")}
                                        </Button>
                                    </div>
                                </div>
                            </Spin>
                        </Form>
                    </ConfigProvider>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AddChild