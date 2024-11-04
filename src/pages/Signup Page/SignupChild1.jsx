import React from "react"
import s from './Signup_style.module.css'
// translation hook
import { useTranslation } from 'react-i18next';

//import Ant Components
import { ConfigProvider, Flex, Radio, Input, InputNumber, Form, Button } from 'antd';

function SignupChild1({ onFinish, initialValues }) {
    const [form] = Form.useForm()
    const { t } = useTranslation();

    return (
        <>
            <Form
                name="register_child1"
                form={form}
                layout="vertical"
                requiredMark="optional"
                onFinish={onFinish}
                initialValues={initialValues}>

                <ConfigProvider
                    componentSize="large"
                    theme={{
                        token: { colorPrimary: '#8993ED', sizeStep: 5 },
                        components: { Form: { labelFontSize: 16 } }
                    }} >
                    <div className={s.form_part}>
                        <div className={s.column}>
                            <div className={s.namePart}>
                                <Form.Item
                                    name={'first_name'}
                                    label= {t("reg fname label")}
                                    required
                                    rules={[{
                                        required: true,
                                        message: t("reg fname msg")
                                    }]}>
                                    <Input placeholder= {t("reg fname placeholder")} />
                                </Form.Item>
                            </div>
                            <div className={s.namePart}>
                                <Form.Item 
                                name={'last_name'}
                                label= {t("reg lname label")}
                                required
                                rules={[{ 
                                    required: true, 
                                    message: t("reg lname msg")
                                }]}>
                                    <Input placeholder= {t("reg lname placeholder")} />
                                </Form.Item>
                            </div>
                        </div>

                        {/* <div className={s.input_box}>
                        <Label
                            inputTitle="Age"
                            popTitle="How Old Are You?"
                            popMsg="Please enter your age."
                        />
                        <Form.Item name={'age'} rules={[{required:true}]}>
                            <InputNumber
                            className={s.input_age}
                            size="large"
                            min={1} 
                            max={20}
                            defaultValue={1}
                            />
                        </Form.Item>
                    </div> */}

                        <div style={{height: '1.5rem'}}/>
                        <Flex vertical gap="middle">
                            <Form.Item
                            name={'gender'}
                            label= {t("reg child gender label")}
                            required
                            rules={[{ required: true, message: t("reg child gender msg") }]}
                            >
                                <Radio.Group style={{ width: '100%' }}>
                                    <Radio.Button style={{ width: '50%' }} value="female">{t("reg child gender op1")}</Radio.Button>
                                    <Radio.Button style={{ width: '50%' }} value="male">{t("reg child gender op2")}</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Flex>
                    </div>
                </ConfigProvider>

                <ConfigProvider
                    componentSize="large"
                    theme={{ token: { colorPrimary: '#8993ED', sizeStep: 14, } }} 
                >
                    <div className={s.bottom_part}>
                        <Button htmlType="submit" type="primary"> {t("next btn")} </Button>
                    </div>
                </ConfigProvider>
            </Form>
        </>
    )
}

export default SignupChild1