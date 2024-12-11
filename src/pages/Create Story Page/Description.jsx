import React, { useState } from 'react'
import s from "./CreateStory_style.module.css"
import { useNavigate, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import { ConfigProvider, Spin, Form, Button, Select, Input, Radio, message } from 'antd'
import { RocketOutlined } from '@ant-design/icons'
// translation hook
import { useTranslation } from 'react-i18next';

function Description() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    // Form
    const [form] = Form.useForm()
    // Translation
    const { t, i18n } = useTranslation()
    // Text Area
    const { TextArea } = Input
    // Language Selection Options
    const options = [
        { value: 'en', label: 'الإنجليزية' },
        { value: 'ar', label: 'العربية' }
    ]

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

    async function submitStory(values) {
        const requestBody = {
            title: "Story Title",
            prompt: values.description,
            language: values.language === undefined ? 'ar' : values.language,
        }

        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_url}/children/stories/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(requestBody),
                credentials: 'include'
            })
            if (response.status==422){
                popMsg(t("create story unethic"),"warning")
                setIsLoading(false)
            } else if (response.ok) {
                const data = await response.json()
                let story = {
                    prompt: data.story.prompt,
                    language: data.story.requested_language, // THERE WAS A TYPO HERE "lamguage"
                    id: null,
                    is_favorite: false,
                    is_saved: false,
                    title: data.story.title,
                    story_ar: data.story.story_ar,
                    story_en: data.story.story_en,
                    story_images: data.story.story_images,
                    story_questions: [],
                    start_time: data.story.start_time,
                    end_time: data.story.end_time,
                }
                if(data.story.story_images.length<3){
                    popMsg(t("create story shortStory error"),"error")
                    setIsLoading(false)
                } else {
                    localStorage.setItem('story', JSON.stringify(story))
                    navigate('/Story')
                    setIsLoading(false)
                }
            } else {
                throw new Error(`Response is not ok: ${response.status}`)
            }
        } catch (e) {
            console.error("An error occured: ", e)
            popMsg(t("server req error"), "error")
            setIsLoading(false)
        }
    }

    return (
        <>
            {contextHolder}
            <ConfigProvider
                theme={{
                    token: { colorPrimary: '#8993ED', },
                    components: {
                        Form: {
                            marginLG: 10,
                            itemMarginBottom: 15,
                            labelFontSize: 16,
                            verticalLabelPadding: 0
                        },
                    }
                }}
                componentSize='large'
            >
                {ReactDOM.createPortal(
                    <Spin 
                    className={s.spinner} 
                    spinning={isLoading} 
                    style={{maxHeight: 'unset'}}
                    fullscreen
                    tip={t("create story spintip")} />
                    , document.body
                )}
                    <div className={`${s.wrapper} ${s.top_margin}`} >
                        <Form
                            name='description'
                            layout='vertical'
                            onFinish={submitStory}
                            form={form}
                            requiredMark='optional'
                        >
                            <div className={s.header}>
                                <h1>{t("create story title")}</h1>
                                <Form.Item
                                    name='language'
                                    required
                                    style={{ marginBottom: 0 }}>
                                    <Select
                                        defaultActiveFirstOption
                                        options={options}
                                        defaultValue={{
                                            value: i18n.dir()=="rtl" ? "ar" : "en",
                                            label: i18n.dir()=="rtl" ? "العربية" : "English",
                                        }}
                                        variant="filled"
                                        style={{ width: 120 }}
                                    />
                                </Form.Item>
                            </div>
                            <div className={s.form_body}>
                                {/* <Form.Item
                                label='Main Character Gender'
                                name='gender'
                                required
                                tooltip={'Select the main character gender'}
                            >
                                <Radio.Group style={{ width: '100%' }}>
                                    <Radio.Button style={{ width: '50%' }} value="female">Female</Radio.Button>
                                    <Radio.Button style={{ width: '50%' }} value="male">Male</Radio.Button>
                                </Radio.Group>
                            </Form.Item> */}

                                <Form.Item
                                    label= {t("create story desc title")}
                                    name='description'
                                    required
                                    tooltip= {t("create story desc tooltip")}
                                >
                                    <TextArea
                                        rows={6}
                                        placeholder= {t("create story desc placeholder")}
                                        maxLength={750}
                                        showCount
                                        allowClear
                                        style={{ resize: 'none', position: 'relative' }}
                                    />
                                </Form.Item>
                                {/* <Link className={s.autoG_btn}>
                                    <RocketOutlined /> Auto-generate
                                </Link> */}

                                <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }} >
                                    <Button style={{ width: 150 }} type="primary" htmlType="submit" disabled={isLoading}>
                                        {t("create story submit btn")}
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
            </ConfigProvider>
        </>
    )
}
export default Description