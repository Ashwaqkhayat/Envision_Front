import React, { useEffect, useState } from "react"
import s from './GuardianProfile_style.module.css'
import Child from './ChildInfo'
import { Button, Tooltip, message, Empty, Modal, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom'
import { SettingOutlined, PlusOutlined } from '@ant-design/icons'
import InfiniteScroll from "react-infinite-scroll-component"
// translation hook
import { useTranslation } from 'react-i18next'

function GuardianProfile(props) {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    // Check new user
    const [modal2Open, setModal2Open] = useState(false);
    const isNewUser = JSON.parse(localStorage.getItem("isNewUser"))
    console.log("Check ", isNewUser)       // <-- Delete Later
    useEffect(() => {
        if (isNewUser == true) {
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
                // console.warn("Getting Children...")
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
                popMsg(t("load childs error"), 'error')
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
                // console.log("Logged Out Successfully", data)
                localStorage.clear()
                window.location.reload(false)
            })
            .catch((err) => {
                console.error("Error signing out..")
                popMsg(t("server req error"), 'error')
            })
    }

    if (children !== null) { //Display profile only when everything is fetched..
        return (
            <>
                {contextHolder}
                <Modal
                    title={t("gprof modal title")}
                    centered
                    open={modal2Open}
                    onOk={() => navigate('/addchild')}
                    okText={t("gprof modal ok")}
                    cancelText={t("gprof modal cancel")}
                    onCancel={() => setModal2Open(false)}
                >
                    <p>{t("gprof modal msg")}</p>
                </Modal>

                <div className={`${s.profile_header} ${s.center_flex}`}>
                    <h2 style={{ direction: i18n.dir() }}>{t("gprof hello")} {Fname}!</h2>
                </div>
                <div className={s.profile_windows} style={{direction: i18n.dir()}}>
                <div className={s.profileInfo_box}>
                        <div className={s.info_header}>
                            <h2>{t("prof persInfo title")}</h2>
                            <Tooltip title={t("settings")}>
                                <Button
                                    style={{ borderColor: "#8993ED" }}
                                    icon={<SettingOutlined style={{ color: "#8993ED" }} />}
                                    onClick={() => { navigate('/EditProfile') }}
                                />
                            </Tooltip>
                        </div>
                        <div className={s.info_main}>
                            <div className={s.info_left}>
                                <div className={s.personal_info}>
                                    <p style={{fontWeight: '600'}}>{t("gprof name")}</p>
                                    <p>{fullName}</p>
                                </div>
                                <div className={s.personal_info}>
                                    <p style={{fontWeight: '600'}}>{t("gprof age")}</p>
                                    <p>{age}</p>
                                </div>
                                <div className={s.personal_info}>
                                    <p style={{fontWeight: '600'}}>{t("gprof email")}</p>
                                    <p>{email}</p>
                                </div>
                                <div className={s.personal_info}>
                                    <p style={{fontWeight: '600'}}>{t("gprof phone")}</p>
                                    <p>{pnum}</p>
                                </div>
                                <div className={s.personal_info}>
                                    <p style={{fontWeight: '600'}}>{t("gprof nchilds")}</p>
                                    <p>{children.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className={s.info_footer}>
                            <Button type="primary" href="/contact">{t("prof report")}</Button>
                            <Button type="primary" danger onClick={logOut}>{t("prof logout")}</Button>
                        </div>
                    </div>
                    <div className={s.childList_box}>
                        <div className={s.list_header}>
                            <h2>{t("gprof childs title")}</h2>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => { navigate('/addchild') }}
                            >{t("add child btn")}</Button>
                        </div>
                        <div className={s.list_container}>
                            {children.length === 0 ?
                                <div className={`${s.center_flex} ${s.fullHeight}`}>
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("empty child list")} />
                                </div>
                                :
                                <InfiniteScroll
                                    className={s.scrollable}
                                    dataLength={children.length} //Edit later
                                    // next={fetchMoreData} give the function that fetches next data
                                    hasMore={hasMore}
                                    loader={<h4>{t("loader title")}</h4>}
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
                </div>
            </>
        )
    }
}

export default GuardianProfile