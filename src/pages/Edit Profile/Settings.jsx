import React, { useState } from 'react'
import s from './EditProfile_style.module.css'
import { ConfigProvider, Button, Input, Modal, Select } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

function Settings(props) {
    let menuSelection = props.menuSelection
    const { confirm } = Modal

    //Selection (Soon...)
    const handleChange = (value) => {
        console.log(`selected ${value}`)
    }

    // Modal to inform errors
    const openErrorModal = (msg) => {
        Modal.error({
            title: 'Something went wrong!',
            content: msg,
            centered: true,
            okButtonProps: { style: { backgroundColor: '#8993ED' } },
        })
    }

    // Delete Confirm Modal
    const showDeleteConfirm = () => {
        confirm({
            title: `Are you sure you want to delete this account?`,
            icon: <ExclamationCircleFilled />,
            centered: true,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            cancelButtonProps: { style: { borderColor: '#7a7a7a', color: '#7a7a7a' } },
            onOk() {
                console.log('Confirm delete request');
                // Call the selete function ====================
            },
            onCancel() {
                console.log('Cancel delete request');
            },
        });
    };

    return (
        <>
            <ConfigProvider theme={{ token: { colorPrimary: '#8993ED' }, }}>
                <div className={s.header}>
                    <h2>{menuSelection}</h2>
                </div>

                <div className={s.bodyInputs}>
                    <div className={s.appearance}>
                        <h3>Appearance</h3>
                        <p>Language</p>
                        <Select
                            disabled='true'
                            size='large'
                            defaultValue="English"
                            onChange={handleChange}
                            style={{
                                width: 200,
                            }}
                            options={[
                                {
                                    value: 'english',
                                    label: 'English',
                                },
                                {
                                    value: 'arabic',
                                    label: 'Arabic',
                                },
                            ]}
                        />
                    </div>
                    <div className={s.accDelete}>
                        <h3>Delete Account</h3>
                        <p className={s.warning}><span>Warning:</span> closing your account is irreversible. It deletes all of your stories and guardians.</p>

                        <div className={s.passInput}>
                            <p>Current Password</p>
                            <Input.Password size='large' placeholder="Enter password" />
                        </div>
                        <Button danger type='primary' size='large' onClick={showDeleteConfirm}>Delete Account</Button>
                    </div>
                </div>
            </ConfigProvider>
        </>
    )
}

export default Settings