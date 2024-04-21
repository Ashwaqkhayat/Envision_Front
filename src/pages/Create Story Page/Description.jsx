import React from 'react'
import s from "./CreateStory_style.module.css"
import { Link } from 'react-router-dom'
import { ConfigProvider, Form, Button, Select, Input, Radio } from 'antd'
import { RocketOutlined } from '@ant-design/icons'

function Description() {
    // Form
    const [form] = Form.useForm()
    // Text Area
    const { TextArea } = Input
    // Language Selection Options
    const options = [
        { value: 'en', label: 'English' },
        { value: 'ar', label: 'Arabic' }
    ]

    async function submitStory (values){
        const request = {
            title: "Story Title",
            prompt: "Ashwaq is a girl playing badminton",
            name: "Ashwaq",
            gender: "female",
            location: "School",
            emotion: "happy",
            language: "en",
        }
        console.log("rb ",request)
        // const start_time_date = new Date()        <-- If we wanna use chunks
        // const start_time = start_time_date.toISOString()
        try {
            const response = await fetch(`${process.env.REACT_APP_url}/children/stories/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(request),
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                console.log("Response Data: " , data)
            } else {
                throw new Error("Response is not ok ")
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
                            itemMarginBottom: 15,
                            labelFontSize: 16,
                            verticalLabelPadding: 0
                        },
                    }
                }}
                componentSize='large'
            >
                <div className={`${s.wrapper} ${s.top_margin}`} >
                    <Form
                        name='description'
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
                                    options={options}
                                    defaultValue={'en'}
                                    variant="filled"
                                    style={{ width: 120 }}
                                />
                            </Form.Item>
                        </div>
                        <div className={s.form_body}>

                            <Form.Item
                                label='Main Character Gender'
                                name='gender'
                                required
                                tooltip={'Select the main character gender'}
                            >
                                <Radio.Group style={{ width: '100%' }}>
                                    <Radio.Button style={{ width: '50%' }} value="female">Female</Radio.Button>
                                    <Radio.Button style={{ width: '50%' }} value="male">Male</Radio.Button>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                label='Story Description'
                                name='description'
                                required
                                tooltip={'Write a full description of your story'}
                            >
                                <TextArea
                                    rows={6}
                                    placeholder="E.g. Rima is a young girl with brown eyes and black curly hair, and she wears a blue shirt with black pants. One day, she wanted to visit a house made of candies"
                                    maxLength={750}
                                    showCount
                                    allowClear
                                    style={{ resize: 'none', position: 'relative' }}
                                />
                            </Form.Item>
                            <Link className={s.autoG_btn}>
                                <RocketOutlined /> Auto-generate
                            </Link>

                            <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }} >
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
export default Description