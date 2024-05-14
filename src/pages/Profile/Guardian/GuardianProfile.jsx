import React, { useEffect, useState } from "react"
import s from './GuardianProfile_style.module.css'
import Child from './ChildInfo'
import { Button, Tooltip, message, Empty, Modal, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom'
import { SettingOutlined, PlusOutlined } from '@ant-design/icons'
import InfiniteScroll from "react-infinite-scroll-component"

function GuardianProfile(props) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    // Check new user
    const [modal2Open, setModal2Open] = useState(false);
    const isNewUser = JSON.parse(localStorage.getItem("isNewUser"))
    console.log("Check ", isNewUser)       // <-- Delete Later
    useEffect(() => {
        if (isNewUser == true) {
            console.log("Welcome!!")
            setModal2Open(true)
            localStorage.setItem("isNewUser", JSON.stringify(false))
        }
    }, [])

    // Get info
    let info = props.info
    let Fname = info.first_name.charAt(0).toUpperCase() + info.first_name.slice(1)
    let Lname = info.last_name.charAt(0).toUpperCase() + info.last_name.slice(1)
    let fullName = Fname + " " + Lname
    let age = info.age
    let pnum = info.phone
    let email = info.email

    // Infinite Scrolling
    const [hasMore, setHasMore] = useState(false)

    // Notification Messages
    const [messageApi, contextHolder] = message.useMessage()
    const popMsg = (text, type) => {
        messageApi.open({
            type: type,
            content: text,
            duration: 5,
            style: {
                fontSize: '18px',
                justifyContent: 'center',
            },
        })
    }

    // Children data
    const [children, setChildren] = useState(null)

    useEffect(() => {
        const getChilds = async () => {
            try {
                setIsLoading(true)
                console.warn("Getting Children...")
                const response = await fetch(`${process.env.REACT_APP_url}/guardians/children`, {
                    method: 'GET',
                    credentials: 'include',
                })
                if (!response.ok) {
                    throw new Error(`Error in getting children information: ${response.status}`);
                }
                console.log("Children loaded successfully")
                const data = await response.json()
                setChildren(data.children)
                setIsLoading(false)
            } catch (err) {
                console.error("Failed getting guardians information: ", err)
            }
        }
        getChilds()
    }, [])

    function logOut() {
        fetch(`${process.env.REACT_APP_url}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Logged Out Successfully", data)
                localStorage.clear()
                window.location.reload(false)
            })
            .catch((err) => {
                console.error("Error signing out..")
                popMsg('حدث خطأ ما, قم بالمحاولة لاحقا', 'error')
            })
    }

    if (children !== null) { //Display profile only when everything is fetched..
        return (
            <>
                {contextHolder}
                <Modal
                    title="مرحبـًا"
                    centered
                    open={modal2Open}
                    onOk={() => navigate('/addchild')}
                    okText='إضافة طفل'
                    cancelText='لاحقًا'
                    onCancel={() => setModal2Open(false)}
                >
                    <p>لنقم بإضافة أول طفل لقائمة أطفالك</p>
                </Modal>
                <div className={`${s.profile_header} ${s.center_flex}`}>
                    <h2>مرحبــًا {Fname} !</h2>
                </div>
                <div className={s.profile_windows}>
                    <div className={s.childList_box}>
                        <div className={s.list_header}>
                            <h2>أطفالـــي</h2>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => { navigate('/addchild') }}
                            >إضافة طفل</Button>
                        </div>
                        <div className={s.list_container}>
                            {children.length === 0 ?
                                <div className={`${s.center_flex} ${s.fullHeight}`}>
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                </div>
                                :
                                <InfiniteScroll
                                    className={s.scrollable}
                                    dataLength={children.length} //Edit later
                                    // next={fetchMoreData} give the function that fetches next data
                                    hasMore={hasMore}
                                    loader={<h4>Loading...</h4>}
                                    scrollableTarget="scrollableDiv"
                                >
                                    {children.map(child => {
                                        return <Child
                                            key={child.id}
                                            content={child}
                                        />
                                    })}
                                </InfiniteScroll>
                            }
                        </div>
                    </div>
                    <div className={s.profileInfo_box}>
                        <div className={s.info_header}>
                            <h2>معلومـاتي الشخصية</h2>
                            <Tooltip title="الإعدادات">
                                <Button
                                    style={{ borderColor: "#8993ED" }}
                                    icon={<SettingOutlined style={{ color: "#8993ED" }} />}
                                    onClick={() => { navigate('/EditProfile') }}
                                />
                            </Tooltip>
                        </div>
                        <div className={s.info_main}>
                            <div className={s.info_left}>
                                <p style={{direction: 'ltr'}}>الاسم: {fullName}</p>
                                <p style={{direction: 'ltr'}}>العمر: {age}</p>
                                <p style={{direction: 'ltr'}}>البريد الإلكتروني: {email}</p>
                                <p style={{direction: 'ltr'}}>رقم الجوال: {pnum}</p>
                                <p style={{direction: 'ltr'}}>عدد الأطفال: {children.length}</p>
                            </div>
                        </div>
                        <div className={s.info_footer}>
                            <Button type="primary" href="/contact">إرسال شكوى</Button>
                            <Button type="primary" danger onClick={logOut}>تسجيل الخروج</Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default GuardianProfile