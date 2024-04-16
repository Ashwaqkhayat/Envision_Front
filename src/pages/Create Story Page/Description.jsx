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

    function submitStory() {

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
                            required
                            style={{ marginBottom: 0 }}>
                            <Select
                                options={options}
                                defaultValue={'en'}
                                style={{ width: 120 }}
                            />
                        </Form.Item>
                    </div>
                    <div className={s.form_body}>

                        <Form.Item
                            label='Gender'
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
            </ConfigProvider>
        </>
    )
}
export default Description