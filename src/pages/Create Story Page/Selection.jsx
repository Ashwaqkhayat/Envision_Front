import React, { useState } from 'react'
import s from "./CreateStory_style.module.css"
import { ConfigProvider, Form, Button, Select, Input, Radio } from 'antd'

function Selection() {
    // Form
    const [form] = Form.useForm()
    // Text Area
    const { TextArea } = Input
    // Language Selection Options
    const options = [
        { value: 'en', label: 'English' },
        { value: 'ar', label: 'Arabic' }
    ]

    // Story vars
    const [story, setStory] = useState({
        prompt: "",
        name: "",
        gender: "",
        location: "",
        emotion: "",
        language: 'en',

        id: null,
        is_favorite: false,
        is_saved: false,

        title: "Story Title",
        story_ar: [],
        story_images: [],
        story_en: [],
        start_time: "",
    })

    const submitStory = async (values) => {
        const requestBody = {
            prompt: values.topic,
            name: values.name,
            gender: values.gender,
            location: values.location == undefined ? 'places fit story events' : values.language,
            emotion: values.emotion == undefined ? 'emotions fit story events' : values.language,
            language: values.language == undefined ? 'en' : values.language,
        }
        // let story_ar = []
        // let story_images = []
        // let story_en = []
        // let title = ""
        const start_time_date = new Date()
        const start_time = start_time_date.toISOString()

        try {
            const response = await fetch(`${process.env.REACT_APP_url}/children/stories/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(requestBody),
                credentials: 'include',
            })
            const data = await response.json()
            if (response.ok) {

            } else {
                throw new Error("Response is not ok ", data.error)
            }
        } catch (e) {
            console.error("An error occured: ", e)
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
                <div className={s.wrapper}>
                    <Form
                        name='selection'
                        layout='vertical'
                        onFinish={submitStory}
                        form={form}
                        requiredMark='optional'
                    >
                        <div className={s.header}>
                            <h1>New Story</h1>
                            <Form.Item
                                name='language'
                                required
                                style={{ marginBottom: 0 }}>
                                <Select
                                    defaultActiveFirstOption
                                    variant="filled"
                                    defaultValue={{
                                        value: 'en',
                                        label: 'English',
                                    }}
                                    options={options}
                                    style={{ width: 120 }}
                                />
                            </Form.Item>
                        </div>
                        <div className={s.form_body}>
                            <Form.Item
                                label='Main Character Name'
                                name='name'
                                required
                                rules={[{ required: true, message: 'Please enter a name' }]}
                                tooltip={'Enter the main character name'}>
                                <Input placeholder='E.g. Layan'></Input>
                            </Form.Item>

                            <Form.Item
                                label='Gender'
                                name='gender'
                                required
                                rules={[{ required: true, message: 'Please select a gender' }]}
                                tooltip={'Select the main character gender'}
                            >
                                <Radio.Group style={{ width: '100%' }}>
                                    <Radio.Button style={{ width: '50%' }} value="female">Female</Radio.Button>
                                    <Radio.Button style={{ width: '50%' }} value="male">Male</Radio.Button>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                label='Emotion'
                                name='emotion'
                                tooltip={'Select the main character emotion'}
                            >
                                <Radio.Group style={{ width: '100%' }}>
                                    <Radio.Button value="happy">Happy</Radio.Button>
                                    <Radio.Button style={{ padding: '0px 21px' }} value="sad">Sad</Radio.Button>
                                    <Radio.Button value="angry">Angry</Radio.Button>
                                    <Radio.Button value="scared">Scared</Radio.Button>
                                    <Radio.Button value="disgusted">Disgusted</Radio.Button>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                label='Story Location'
                                name='location'
                                tooltip={'Enter where the story take place?'}>
                                <Input placeholder='E.g. Home'></Input>
                            </Form.Item>

                            <Form.Item
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
                            </Form.Item>

                            <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }} >
                                <Button style={{ width: 150 }} type="primary" htmlType="submit">
                                    Create Story
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