import React, { useState } from 'react'
import s from "./CreateStory_style.module.css"
import { useNavigate, Link } from "react-router-dom";
import { ConfigProvider, Spin, Form, Button, Select, Input, Radio } from 'antd'
import { RocketOutlined } from '@ant-design/icons'

function Description() {
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
            prompt: values.description,
            language: values.language === undefined ? 'en' : values.language,
        }

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
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                console.warn("Created data: " , data)
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
                navigate('/Story')
                setIsLoading(false)
                console.log("Story is created successfully ", story)
            } else {
                throw new Error(`Response is not ok: ${response.status}`)
            }
        } catch (e) {
            console.error("An error occured: ", e)
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
                            itemMarginBottom: 15,
                            labelFontSize: 16,
                            verticalLabelPadding: 0
                        },
                    }
                }}
                componentSize='large'
            >
                <Spin spinning={isLoading} size='large' style={{maxHeight: 'unset'}} tip="قصتك قيد الإنشاء">
                    <div className={`${s.wrapper} ${s.top_margin}`} >
                        <Form
                            name='description'
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
                                        options={options}
                                        defaultValue={'en'}
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
                                    label='وصــف القـصة'
                                    name='description'
                                    required
                                    tooltip={'Write a full description of your story'}
                                >
                                    <TextArea
                                        rows={6}
                                        placeholder="مثال: ريما فتاة صغيرة جميلة لديها عيون بنية وشعر أسود, وترتدي قميصًا أزرق وبنطلونًا أسود. في يوم ما، أرادت زيارة منزل مصنوع من الحلويات"
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
export default Description