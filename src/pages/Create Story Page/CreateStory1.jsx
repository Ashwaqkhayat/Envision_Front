import React from "react";
import { Link } from "react-router-dom";
import s from "./CreateStory_style.module.css"
import Label from "../../components/Label/Label"

import { ConfigProvider, Radio, Input, Form, Button } from 'antd';


function CreateStory1({ onFinish, initialValues }) {
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
                        inputTitle="Main Character Name"
                        popTitle="What is your character's name?"
                        popMsg="Please enter a beautiful name for your main character."
                    />
                    <Form.Item name={'name'} rules={[{
                        required: true, message: "Character name is required"
                    }]}>
                        <Input size="large" placeholder="E.g. Rima" />
                    </Form.Item>
                </div>
                <div className={s.input_box}>
                    <Label
                        inputTitle="Main Character Gender"
                        popTitle="Is your character male or female?"
                        popMsg="Please select the gender for your main character."
                    />
                    <Form.Item name={'gender'} rules= {[{required:true, message:"Gender is required" }]}>
                        <Radio.Group className={s.radio_group} size="large">
                            <Radio.Button className={s.gender_btns} value="female">Female</Radio.Button>
                            <Radio.Button className={s.gender_btns} value="male">Male</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div className={s.input_box}>
                    <Label
                        inputTitle="Main Character Emotion (optional)"
                        popTitle="How's your character feeling?"
                        popMsg="Please select the main emotion of your story character."
                    />
                    <Form.Item name={'emotion'} rules={[{required:false }]}>
                        <Radio.Group className={s.radio_group} size="large">
                            <Radio.Button className={s.emotion_btns} value="happy">Happy</Radio.Button>
                            <Radio.Button className={s.emotion_btns} value="sad">Sad</Radio.Button>
                            <Radio.Button className={s.emotion_btns} value="angry">Angry</Radio.Button>
                            <Radio.Button className={s.emotion_btns} value="scared">Scared</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div className={s.input_box}>
                    <Label
                        inputTitle="Story Location (optional)"
                        popTitle=" Where do the events of the story take place?"
                        popMsg="What is the main location where events in your story take place? for example: Home, School, Park... etc. 
                        If there is no specific location, leave the field blank."
                    />
                    <Form.Item name={'location'} rules={[{ required: false }]}>
                        <Input size="large" placeholder="E.g. Home" />
                    </Form.Item>
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
                    Next
                    </Button>
                </div>
            </ConfigProvider>
        </Form>
    )
}
export default CreateStory1