import React, { useState } from 'react'
import s from "./CreateStory_style.module.css"
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Spin, Form, Button, Select, Input, Radio } from 'antd'

function Selection() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    // Form
    const [form] = Form.useForm()
    // Text Area
    const { TextArea } = Input
    // Language Selection Options
    const options = [
        { value: 'en', label: 'الإنجليزية' },
        { value: 'ar', label: 'العربية' }
    ]

    async function submitStory(values) {
        const requestBody = {
            title: "Story Title",
            name: values.name,
            gender: values.gender,
            location: values.location,
            emotion: values.emotion,
            language: values.language === undefined ? 'en' : values.language,
            // location: (values.location === undefined || values.location === "") ? 'places suitable for story events' : values.location,
            // emotion: values.emotion === undefined ? 'feelings suit the story events' : values.emotion,
            // language: values.language === undefined ? 'en' : values.language,
        };

        try {
            console.log("Creating story...")
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

            if (response.ok) {
                const data = await response.json()
                let story = {
                    prompt: data.story.prompt,
                    language: data.story.requested_lamguage,
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
                localStorage.setItem('story', JSON.stringify(story))
                setIsLoading(false)
                navigate('/Story')
                console.log("Story is created successfully")
            } else {
                throw new Error(`Response is not ok: ${response.status}`);
            }
        } catch (e) {
            console.error("An error occurred: ", e);
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <ConfigProvider
                theme={{
                    token: { colorPrimary: '#8993ED', },
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
                <Spin spinning={isLoading} size='large' style={{maxHeight: 'unset'}} tip="قصتك قيد الإنشاء">
                    <div className={s.wrapper}>
                        <Form
                            name='selection'
                            layout='vertical'
                            onFinish={submitStory}
                            form={form}
                            requiredMark='optional'
                        >
                            <div className={s.header}>
                                <h1>قصة جديـدة</h1>
                                <Form.Item
                                    name='language'
                                    required
                                    style={{ marginBottom: 0 }}>
                                    <Select
                                        defaultActiveFirstOption
                                        variant="filled"
                                        defaultValue={{
                                            value: 'en',
                                            label: 'الإنجليزية',
                                        }}
                                        options={options}
                                        style={{ width: 120 }}
                                    />
                                </Form.Item>
                            </div>
                            <div className={s.form_body}>
                                <Form.Item
                                    label='اسم الشخصية الرئيسية'
                                    name='name'
                                    required
                                    rules={[{ required: true, message: 'رجاءً قم باختيار اسم' }]}
                                    tooltip={'Enter the main character name'}>
                                    <Input placeholder='مثال: ليان'></Input>
                                </Form.Item>

                                <Form.Item
                                    label='جنس الشخصية الرئيسية'
                                    name='gender'
                                    required
                                    rules={[{ required: true, message: 'رجاءً قم بتحديد الجنس' }]}
                                    tooltip={'Select the main character gender'}
                                >
                                    <Radio.Group style={{ width: '100%' }}>
                                        <Radio.Button style={{ width: '50%' }} value="female">أنثى</Radio.Button>
                                        <Radio.Button style={{ width: '50%' }} value="male">ذكـر</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    label='المشاعر'
                                    name='emotion'
                                    required
                                    rules={[{ required: true, message: 'رجاءً قم باختيار المشاعر التي يشعر بها البطل' }]}
                                    tooltip={'Select the main character emotion'}
                                >
                                    <Radio.Group style={{ width: '100%' }}>
                                        <Radio.Button style={{ width: '20%' }} value="happy">سعادة</Radio.Button>
                                        <Radio.Button style={{ width: '20%' }} value="sad">حزن</Radio.Button>
                                        <Radio.Button style={{ width: '20%' }} value="angry">غضب</Radio.Button>
                                        <Radio.Button style={{ width: '20%' }} value="scared">خوف</Radio.Button>
                                        <Radio.Button style={{ width: '20%' }} value="disgusted">اشمئزاز</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    label='الموقع'
                                    name='location'
                                    required
                                    rules={[{ required: true, message: 'رجاءً قم باختيار موقع حدوث القصة' }]}
                                    tooltip={'Choose where the story events take place'}
                                >
                                    <Radio.Group style={{ width: '100%' }}>
                                        <Radio.Button style={{ width: '20%' }} value="home">المنزل</Radio.Button>
                                        <Radio.Button style={{ width: '20%' }} value="school">المدرسة</Radio.Button>
                                        <Radio.Button style={{ width: '20%' }} value="park">الحديقة</Radio.Button>
                                        <Radio.Button style={{ width: '20%' }} value="beach">الشاطئ</Radio.Button>
                                        <Radio.Button style={{ width: '20%' }} value="shop">السوق</Radio.Button>
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
                                    <Button style={{ width: 150 }} type="primary" htmlType="submit">
                                        إنشاء القصة
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </Spin>
            </ConfigProvider>
        </>
    )
}
export default Selection