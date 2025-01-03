import React, { useState, useEffect } from 'react'
import { ConfigProvider, Spin, Modal, Button, Empty } from 'antd'
import { ExclamationCircleFilled, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import s from './ViewChild_style.module.css'
import userIcon from '../../../assets/images/pfp.png'
import Navbar from '../../../components/Navbar/Navbar'
import Footer from '../../../components/Footer/Footer'
import InfiniteScroll from "react-infinite-scroll-component"
import LibraryStory from './LibraryStory'
// translation hook
import { useTranslation } from 'react-i18next'

function ViewChild() {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const [isProfileLoading, setProfileLoading] = useState(false)
    const [isLibraryLoading, setLibraryLoading] = useState(false)
    const [profile, setProfile] = useState(null)
    const [childLibrary, setChildLibrary] = useState([])
    const { confirm } = Modal
    //Infinite Scrolling
    const [hasMore, setHasMore] = useState(false)

    // Modal to inform errors
    const openErrorModal = (msg) => {
        Modal.error({
            direction: i18n.dir(),
            title: t("visChild error title"),
            content: msg,
            centered: true,
            okButtonProps: { style: { backgroundColor: '#8993ED' } },
            onOk() {
                setTimeout(() => {
                    navigate('/profile')
                }, 1200);
            },
        })
    }

    // Delete Confirm Modal
    const showDeleteConfirm = () => {
        confirm({
            direction: i18n.dir(),
            title: `${t("confirm del title")} ${profile.first_name}?`,
            icon: <ExclamationCircleFilled />,
            centered: true,
            okText: t("confirm del ok"),
            okType: 'danger',
            cancelText: t("confirm del cancel"),
            cancelButtonProps: { style: { borderColor: '#7a7a7a', color: '#7a7a7a' } },
            onOk() {
                console.log('Confirm delete request');
                deleteChild()
            },
            onCancel() {
                console.log('Cancel delete request');
            },
        });
    };

    // Get child info using id stored in local storage
    // Get child id
    const id = localStorage.getItem('visited-Child')
    // fetch child profile
    useEffect(() => {
        const getProfile = async () => {
            try {
                setProfileLoading(true)
                const response = await fetch(`${process.env.REACT_APP_url}/guardians/children?id=${id}`, {
                    method: 'GET',
                    credentials: 'include',
                })
                if (!response.ok) {
                    throw new Error(`Error in getting child information: ${response.status}`)
                }
                console.log("Child Profile loaded successfully")
                const data = await response.json()
                setProfile(data.profile)
                setProfileLoading(false)
            } catch (err) {
                console.error("Failed getting child information: ", err)
                openErrorModal(t("error fetch child"))
                setProfileLoading(false)
            }
        }
        getProfile()
    }, [])
    // Delete child request
    async function deleteChild() {
        try {
            const response = await fetch(`${process.env.REACT_APP_url}/guardians/children?id=${id}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            if (!response.ok) {
                throw new Error("Response is not recieved. ", response.status)
            }
            console.log("Child removed successfully")
            setTimeout(() => { navigate('/profile') }, 1200);
        } catch (err) {
            console.error("Failed removing the child: ", err)
            openErrorModal(t("error del child"))
        }
    }
    // fetch child's library
    useEffect(() => {
        const getLibrary = async () => {
            try {
                setLibraryLoading(true)
                const response = await fetch(`${process.env.REACT_APP_url}/guardians/children/stories?id=${id}`, {
                    method: 'GET',
                    credentials: 'include',
                })
                if (!response.ok) {
                    throw new Error(`${response.status} Error in getting child's library`)
                }
                console.log("Child\'s library loaded successfully")
                const data = await response.json()
                setChildLibrary(data.stories)
                setLibraryLoading(false)
            } catch (err) {
                console.error("Failed: ", err)
                openErrorModal(t("error fetch lib"))
                setLibraryLoading(false)
            }
        }
        getLibrary()
    }, [])

    if (profile !== null) {
        let date = new Date(profile.birth_date)
        let bdate = `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`
        return (
            <>
                <ConfigProvider theme={{ token: { colorPrimary: '#8EC3B7' } }} >
                    <div className={s.body}>
                        <Navbar />
                        <div className={s.content}>
                            <div className={s.profile_header}>
                                <div className={s.profile_img}>
                                    <img src={userIcon} alt="Profile Picture" />
                                </div>
                                <h2>{profile.first_name} {profile.last_name}</h2>
                                <p>{profile.email}</p>
                            </div>
                            <div className={s.control_btns}>
                                <div onClick={() => { navigate('/profile') }} className={s.back_btn}>
                                    <box-icon
                                        name='left-arrow-alt'
                                        size='md'
                                        color='#494C4C'
                                    />
                                    <h2 >{t("visChild backbtn")}</h2>
                                </div>
                                <Button
                                    type='primary'
                                    danger
                                    iconPosition='start'
                                    onClick={showDeleteConfirm}
                                    icon={<DeleteOutlined />}
                                >{t("del child btn")}</Button >
                            </div>
                            <div className={s.main_container} style={{ direction: i18n.dir() }}>
                                <div className={s.info_container}>
                                    <div className={s.info_box}>
                                        <div style={{ fontWeight: 600, color: '#494C4C' }}>{t("cprof age")} </div>
                                        <div style={{ fontWeight: 500, color: '#A2A9B0' }}>{profile.age}</div>
                                    </div>
                                    <div className={s.info_box}>
                                        <div style={{ fontWeight: 600, color: '#494C4C' }}>{t("cprof gender")}</div>
                                        <div style={{ fontWeight: 500, color: '#A2A9B0' }}>{profile.gender}</div>
                                    </div>
                                    <div className={s.info_box}>
                                        <div style={{ fontWeight: 600, color: '#494C4C' }}>{t("cprof fcolor")}</div>
                                        <div style={{ fontWeight: 500, color: '#A2A9B0' }}>{profile.favorite_color}</div>
                                    </div>
                                    <div className={s.info_box}>
                                        <div style={{ fontWeight: 600, color: '#494C4C' }}>{t("cprof bdate")}</div>
                                        <div style={{ fontWeight: 500, color: '#A2A9B0' }}>{bdate}</div>
                                    </div>
                                </div>
                                <div className={s.library_container}>
                                    <h2 style={{ color: '#8993ED' }}>{t("visChild lib title")}</h2>
                                    <Spin spinning={isLibraryLoading} size='large'>
                                        <div className={s.stories_grid}>
                                            {childLibrary.length === 0 ?
                                                <div className={s.center}>
                                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("lib empty msg")} />
                                                </div>
                                                :
                                                <InfiniteScroll
                                                    className={s.scrollable}
                                                    dataLength={childLibrary.length}
                                                    // next={fetchMoreData} give the function that fetches next data
                                                    hasMore={hasMore}
                                                    loader={<h4>{t("loader title")}</h4>}
                                                    scrollableTarget="scrollableDiv"
                                                >
                                                    {childLibrary.map((story) => { return <LibraryStory content={story} /> })}
                                                </InfiniteScroll>
                                            }
                                        </div>
                                    </Spin>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </ConfigProvider>
            </>
        )
    }


}

export default ViewChild