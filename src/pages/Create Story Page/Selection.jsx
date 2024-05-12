import React, { useState } from 'react'
import s from "./CreateStory_style.module.css"
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Spin, Form, Button, Select, Input, Radio, message } from 'antd'

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

            if (response.status==422){
                popMsg("لقد استخدمت كلمة سيئة, حاول مرة أخرى","warning")
                console.log("Unethical Prompt Detected.")
                setIsLoading(false)
            } else if (response.ok) {
                const data = await response.json()
                console.log("Created story: ", data)
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
                if(data.story.story_images.length<3){
                    popMsg("حدث خطأ ما, حاول مرة أخرى","error")
                    setIsLoading(false)
                } else {
                    localStorage.setItem('story', JSON.stringify(story))
                    navigate('/Story')
                    setIsLoading(false)
                    console.log("Story is created successfully", data)
                }
            } else {
                throw new Error(`Response is not ok: ${response.status}`);
            }
        } catch (e) {
            console.error("An error occurred: ", e)
            popMsg("حدث خطأ ما, قم بالمحاولة لاحقًا", "error")
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
                                            value: 'ar',
                                            label: 'العربية',
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
                                    tooltip={'ما الاسم الخاص ببطل القصة؟'}>
                                    <Input placeholder='مثال: ليان'></Input>
                                </Form.Item>

                                <Form.Item
                                    label='جنس الشخصية الرئيسية'
                                    name='gender'
                                    required
                                    rules={[{ required: true, message: 'رجاءً قم بتحديد الجنس' }]}
                                    tooltip={'هل البطل صبي أم فتاة'}
                                >
                                    <Radio.Group style={{ width: '100%' }}>
                                        <Radio.Button style={{ width: '50%'}} value="female">
                                        فتــاة
                                        </Radio.Button>
                                        <Radio.Button style={{ width: '50%'}} value="male">صبـي</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    label='المشاعر'
                                    name='emotion'
                                    required
                                    rules={[{ required: true, message: 'رجاءً قم باختيار المشاعر التي يشعر بها البطل' }]}
                                    tooltip={'اختر المشاعر التي يشعر بها البطل'}
                                >
                                    <Radio.Group style={{ width: '100%' }}>
                                        <Radio.Button style={{ width: '20%' }} value="happy">سعادة</Radio.Button>
                                        <Radio.Button style={{ width: '20%' }} value="sad">حزن</Radio.Button>
                                        <Radio.Button style={{ width: '20%' }} value="angry">غضب</Radio.Button>
                                        <Radio.Button style={{ width: '20%' }} value="scared">خوف</Radio.Button>
                                        <Radio.Button style={{ width: '20%' }} value="energetic">نشاط</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    label='الموقع'
                                    name='location'
                                    required
                                    rules={[{ required: true, message: 'رجاءً قم باختيار موقع حدوث القصة' }]}
                                    tooltip={'أين ستحدث أحداث القصة؟'}
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
                                    <Button style={{ width: 150 }} type="primary" htmlType="submit" disabled={isLoading}>
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