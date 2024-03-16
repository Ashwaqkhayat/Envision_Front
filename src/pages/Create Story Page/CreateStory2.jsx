import React from "react";
import { Link } from "react-router-dom";
import s from "./CreateStory_style.module.css"
import Label from "../../components/Label/Label"

import { ConfigProvider, Flex, Input, Form, Button } from 'antd';
import { RocketOutlined } from '@ant-design/icons'
const { TextArea } = Input;

function CreateStory2({ onFinish, initialValues }) {
    return (
        <Form onFinish={onFinish} initialValues={initialValues}>
            <ConfigProvider //change color theme
                theme={{
                    token: {
                        colorPrimary: '#8993ED',
                    }
                }} >
                <div className={s.input_box}>
                    <Label
                        inputTitle="Story Description"
                        popTitle="What is your story about?"
                        popMsg="Provide us with an overview of your story topic, describe what you want to read!"
                    />
                        <Form.Item name={'prompt'} rules={[{
                            required: true, message: "Description is required"
                        }]}>
                            <TextArea
                                className={s.text_area}
                                showCount
                                maxLength={200}
                                placeholder="Ahmad goes to school and play with his friends"
                                style={{
                                    height: 170,
                                    resize: 'true',
                                }}
                            />
                        </Form.Item>
                    <Link to="#" className={s.autoG_btn}>
                        <RocketOutlined /> Auto-generate
                    </Link>
                </div>
            </ConfigProvider>

            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#8993ED',
                        sizeStep: 14,
                    }
                }} >

                <div className={s.bottom_part}>
                    <Button htmlType="submit" type="primary" size="large" >
                        Generate Story
                    </Button>
                </div>
            </ConfigProvider>
        </Form>
    )
}
export default CreateStory2