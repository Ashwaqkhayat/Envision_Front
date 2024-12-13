import React, { useEffect, useState } from 'react';
import s from "./CreateStory_style.module.css";
import { useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import { ConfigProvider, Spin, Form, Button, Select, Input, Radio, message } from 'antd'
// translation hook
import { useTranslation } from 'react-i18next';

import fakeStory from './storyResponseFull.json' // TEMPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP

function Selection() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    // Form
    const [form] = Form.useForm()
    // Translation
    const { t, i18n } = useTranslation()
    // Text Area
    const { TextArea } = Input
    // Story Language Selection Options
    const options = [
        { value: 'en', label: 'English' },
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
            name: values.name,
            gender: values.gender,
            location: values.location,
            emotion: values.emotion,
            language: values.language === undefined ? 'ar' : values.language,
            // if the following fields were (Optional) :
            // location: (values.location === undefined || values.location === "") ? 'places suitable for story events' : values.location,
            // emotion: values.emotion === undefined ? 'feelings suit the story events' : values.emotion,
            // language: values.language === undefined ? 'en' : values.language,
        };

        console.log("Story data: ", requestBody)

        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_url}/children/stories/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(requestBody),
                credentials: 'include',
            });

            if (response.status == 422) {
                popMsg(t("create story unethic"), "warning")
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

                if (data.story.story_images.length < 3) {
                    popMsg(t("create story shortStory error"), "error")
                    setIsLoading(false)
                } else {
                    localStorage.setItem('story', JSON.stringify(story))
                    navigate('/Story')
                    setIsLoading(false)
                }
            } else {
                throw new Error(`Response is not ok: ${response.status}`);
            }
        } catch (e) {
            console.error("An error occurred: ", e)
            popMsg(t("server req error"), "error")
            setIsLoading(false)
        }
    }

    return (
        <>
            {contextHolder}
            <ConfigProvider
                theme={{
                    token: { colorPrimary: '#8993ED' },
                    components: {
                        Form: {
                            marginLG: 10,
                            itemMarginBottom: 10,
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
                        style={{ maxHeight: 'unset' }}
                        fullscreen
                        tip={t("create story spintip")} />
                    , document.body
                )}
                <div className={s.wrapper}>
                    <Form
                        name='selection'
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
                                    variant="filled"
                                    defaultValue={{
                                        value: i18n.dir() == "rtl" ? "ar" : "en",
                                        label: i18n.dir() == "rtl" ? "العربية" : "English",
                                    }}
                                    options={options}
                                    style={{ width: 120 }}
                                />
                            </Form.Item>
                        </div>
                        <div className={s.form_body}>
                            <Form.Item
                                label={t("create story cname title")}
                                name='name'
                                required
                                rules={[{ required: true, message: t("create story cname msg") }]}
                                tooltip={t("create story cname tooltip")} >
                                <Input placeholder={t("create story cname placeholder")} />
                            </Form.Item>

                            <Form.Item
                                label={t("create story gender title")}
                                name='gender'
                                required
                                rules={[{ required: true, message: t("create story gender msg") }]}
                            >
                                <Radio.Group style={{ width: '100%' }}>
                                    <Radio.Button style={{ width: '50%' }} value="female">{t("create story gender1")}</Radio.Button>
                                    <Radio.Button style={{ width: '50%' }} value="male">{t("create story gender2")}</Radio.Button>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                label={t("create story feel title")}
                                name='emotion'
                                required
                                rules={[{ required: true, message: t("create story feel msg") }]}
                                tooltip={t("create story feel tooltip")}
                            >
                                <Radio.Group style={{ width: '100%' }}>
                                    <Radio.Button style={{ width: '20%' }} value="happy">{t("create story feel1")}</Radio.Button>
                                    <Radio.Button style={{ width: '15%' }} value="sad">{t("create story feel2")}</Radio.Button>
                                    <Radio.Button style={{ width: '20%' }} value="angry">{t("create story feel3")}</Radio.Button>
                                    <Radio.Button style={{ width: '20%' }} value="scared">{t("create story feel4")}</Radio.Button>
                                    <Radio.Button style={{ width: '25%' }} value="energetic">{t("create story feel5")}</Radio.Button>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                label={t("create story loc title")}
                                name='location'
                                required
                                rules={[{ required: true, message: t("create story loc msg") }]}
                                tooltip={t("create story loc tooltip")}
                            >
                                <Radio.Group style={{ width: '100%' }}>
                                    <Radio.Button style={{ width: '20%' }} value="home">{t("create story loc1")}</Radio.Button>
                                    <Radio.Button style={{ width: '20%' }} value="school">{t("create story loc2")}</Radio.Button>
                                    <Radio.Button style={{ width: '20%' }} value="park">{t("create story loc3")}</Radio.Button>
                                    <Radio.Button style={{ width: '20%' }} value="beach">{t("create story loc4")}</Radio.Button>
                                    <Radio.Button style={{ width: '20%' }} value="shop">{t("create story loc5")}</Radio.Button>
                                </Radio.Group>
                            </Form.Item>

                            {/* <Form.Item
                                    label='Story Location'
                                    name='location'
                                    tooltip={'Enter where the story take place?'}>
                                    <Input placeholder='E.g. Home'></Input>
                                </Form.Item> */}

                            {/* <Form.Item
                                    label='Story Topic'
                                    name='topic'
                                    required
                                    rules={[{ required: true, message: 'Please write a story topic' }]}
                                    tooltip={'What is the story about?'}>
                                    <TextArea
                                        rows={2}
                                        placeholder="E.g. Visiting a house made of candies"
                                        maxLength={150}
                                        showCount
                                        allowClear
                                        style={{ resize: 'none' }}
                                    />
                                </Form.Item> */}

                            <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }} >
                                <Button
                                    style={{ width: 150 }}
                                    type="primary"
                                    htmlType="submit"
                                    disabled={isLoading}
                                >
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
export default Selection