import React from "react";
import s from './Signup_style.module.css'
//import Ant Components
import { ConfigProvider, Input, InputNumber, Form, Button } from 'antd';
import { Select } from 'antd';
// translation hook
import { useTranslation } from 'react-i18next';

function SignupChild1({onFinish, initialValues}) {
    const [form] = Form.useForm()
    const { t } = useTranslation();

    const { Option } = Select;
    const selectBefore = (
    <Select
        disabled
        defaultValue="+966"
        style={{
        width: 120,
        }}
    >
        <Option value="+966">+966</Option>
        <Option value="+971">+971</Option>
    </Select>
    );

    return (
        <>
        <Form
        name="register_cg"
        form={form}
        layout="vertical"
        requiredMark="optional"
        onFinish={onFinish} 
        initialValues={initialValues}>

            <ConfigProvider
                componentSize="large"
                theme={{ 
                    token: { colorPrimary: '#8993ED', sizeStep: 5, },
                    components: { Form: { labelFontSize: 16, itemMarginBottom: 18 } }
                }}
            >
                <div className={s.form_part}>
                    <div className={s.column}>
                        <div className={s.namePart}>
                            <Form.Item
                                name={'first_name'}
                                label= {t("reg fname label")}
                                required
                                rules={[{
                                    required:true,
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
                                    required:true,
                                    message: t("reg lname msg")
                                }]}>
                                    <Input placeholder= {t("reg lname placeholder")} />
                            </Form.Item>
                        </div>
                    </div>

                    <div style={{height: '1.5rem'}}/>
                    <Form.Item
                    name={'phone_number'}
                    label= {t("reg cg phone label")}
                    tooltip= {t("reg cg phone tooltip")}
                    required
                    rules={[
                        { required: true, message: t("reg cg phone msg1") },
                        { pattern: new RegExp(/^\d{9}$/),  message: t("reg cg phone msg2"), }
                    ]}
                    >
                        <InputNumber
                            style={{width: '100%'}}
                            addonBefore={selectBefore}
                            placeholder="500000000"
                            maxLength='9'
                        />
                    </Form.Item>
                    
                    <Form.Item 
                        name={'age'}
                        label= {t("reg cg age label")}
                        tooltip= {t("reg cg age tooltip")}
                        rules={[{
                            required:true, 
                            message: t("reg cg age msg")
                            }]}>
                                <InputNumber
                                className={s.input_age}
                                size="large"
                                min={1} 
                                max={70}
                                defaultValue={1}
                                />
                    </Form.Item>
                </div>
            </ConfigProvider>

            <ConfigProvider
                componentSize="large"
                theme={{ token: {colorPrimary: '#8993ED',sizeStep: 14,}}} 
            >
                <div className={s.bottom_part}>
                    <Button htmlType="submit" type="primary">{t("register btn")}</Button>
                </div>
            </ConfigProvider>

        </Form>
        </>
    )
}

export default SignupChild1