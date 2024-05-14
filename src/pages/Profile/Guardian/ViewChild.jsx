import React, { useState, useEffect } from 'react'
import { ConfigProvider, Spin, Modal, Button, Empty } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import s from './ViewChild_style.module.css'
import userIcon from '../../../assets/images/pfp.png'
import Navbar from '../../../components/Navbar/Navbar'
import Footer from '../../../components/Footer/Footer'
import InfiniteScroll from "react-infinite-scroll-component"
import LibraryStory from './LibraryStory'

function ViewChild() {
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
            title: 'حدث خطأ ما!',
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
            title: `هل أنت متأكد من حذف ${profile.first_name}?`,
            icon: <ExclamationCircleFilled />,
            centered: true,
            okText: 'نعم',
            okType: 'danger',
            cancelText: 'لا',
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
                openErrorModal('Sorry we couldn\'t get the child profile, try again later.')
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
            setTimeout(() => {
                navigate('/profile')
            }, 1200);
        } catch (err) {
            console.error("Failed removing the child: ", err)
            openErrorModal('Sorry we couldn\'t remove the child, try again later.')
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
                openErrorModal('Sorry we couldn\'t get the child\'s library, try again later.')
                setLibraryLoading(false)
            }
        }
        getLibrary()
    }, [])

    if (profile !== null) {
        let date = new Date(profile.birth_date)
        let bdate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        return (
            <>
                <ConfigProvider theme={{ token: { colorPrimary: '#8EC3B7', } }} >
                    <div className={s.body}>
                        <Navbar />
                        <div className={`${s.content} ${s.center_flex}`}>
                            <div className={`${s.profile_header} ${s.center_flex}`}>
                                <div className={s.profile_img}>
                                    <img src={userIcon} alt="Profile Picture" />
                                </div>
                                <h2>{profile.first_name}</h2>
                                <p>@{profile.first_name + " " + profile.last_name}</p>
                            </div>
                            <div className={s.profile_windows}>
                                <div className={s.libraryList_box}>
                                    <div className={s.backArrow_btn} onClick={() => { navigate('/profile') }}>
                                        <box-icon name='left-arrow-alt' size='md' color='#494C4C'></box-icon>
                                        <h2>تراجع</h2>
                                    </div>
                                    <h2>المكتبـة</h2>
                                    <div className={s.list_container}>
                                        {isLibraryLoading ?
                                            <div className={`${s.center_flex} ${s.fullDiv}`}>
                                                <Spin size='large' />
                                            </div>
                                            :
                                            childLibrary.length === 0 ?
                                                <div className={`${s.center_flex} ${s.fullDiv}`}>
                                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                                </div>
                                                :
                                                <InfiniteScroll
                                                    className={s.scrollable}
                                                    dataLength={childLibrary.length}
                                                    // next={fetchMoreData} give the function that fetches next data
                                                    hasMore={hasMore}
                                                    loader={<h4>Loading...</h4>}
                                                    scrollableTarget="scrollableDiv"
                                                >
                                                    {childLibrary.map((story) => { return <LibraryStory content={story} /> })}
                                                </InfiniteScroll>
                                        }
                                    </div>
                                </div>
                                <div className={s.profileInfo_box}>
                                    <div className={s.info_header}>
                                        <h2>المعلومـات الشخصية</h2>
                                    </div>
                                    <div className={s.info_main}>
                                        <div className={s.info_left}>
                                            <p>الاسم: {profile.first_name + " " + profile.last_name}</p>
                                            <p>العمر: {profile.age}</p>
                                            <p>الجنس: {profile.gender}</p>
                                        </div>
                                        <div className={s.info_right}>
                                            <p>البريد الإلكتروني: {profile.email}</p>
                                            <p>اللون المفضل: {profile.favorite_color}</p>
                                            <p>تاريخ الميلاد: {bdate}</p>
                                        </div>
                                    </div>
                                    <div className={s.info_footer}>
                                        <Button type="primary" danger onClick={showDeleteConfirm}>حذف الطفل</Button>
                                    </div>
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