import React, { useState, useEffect } from "react"
import s from './ChildProfile_style.module.css'
import { useNavigate } from 'react-router-dom'
import Guardian from './GuardianInfo'
import { Button, Tooltip, Spin, Empty, message, Modal } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import InfiniteScroll from "react-infinite-scroll-component"
import userIcon from '../../../assets/images/pfp.png'
// translation hook
import { useTranslation } from 'react-i18next';

function ChildProfile(props) {
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // Check new user to open welcome modal
    const [modal2Open, setModal2Open] = useState(false);
    const isNewUser = JSON.parse(localStorage.getItem("isNewUser"))
    console.log("Check ", isNewUser)       // <-- Delete Later
    useEffect(() => {
        if (isNewUser == true) {
            setModal2Open(true)
            localStorage.setItem("isNewUser", JSON.stringify(false))
        }
    }, [])

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

    //Get info
    let info = props.info
    let Fname = info.first_name.charAt(0).toUpperCase() + info.first_name.slice(1);
    let Lname = info.last_name.charAt(0).toUpperCase() + info.last_name.slice(1);
    let fullName = Fname + " " + Lname
    let age = info.age
    let gender = info.gender
    let email = info.email
    let fcolor = info.favorite_color
    let date = new Date(info.birth_date)
    let bdate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

    //Infinite Scrolling
    const [hasMore, setHasMore] = useState(false)

    // Guardians Data
    const [guards, setGuards] = useState(null)

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
                console.error("Error signing out: ", err)
                popMsg(t("server req error"), 'error')
            })
    }

    useEffect(() => {
        const getGuards = async () => {
            try {
                setIsLoading(true)
                console.warn("Getting Guardians...")
                const response = await fetch(`${process.env.REACT_APP_url}/children/guardians`, {
                    method: 'GET',
                    credentials: 'include',
                })
                if (!response.ok) {
                    throw new Error(`Error in getting guardians information: ${response.status}`);
                }
                console.log("Guardians loaded successfully")
                const data = await response.json(); //Data is an array
                setGuards(data.guardians)
                setIsLoading(false)
            } catch (err) {
                console.error("Failed getting guardians information: ", err)
                popMsg(t("load guards error"), 'error')
            }
        }
        getGuards()
    }, [])

    if (guards !== null) { //Display profile only when everything is fetched..
        return (
            <>
                {contextHolder}
                <Modal
                    title= {t("cprof modal title")}
                    centered
                    open={modal2Open}
                    onOk={() => navigate('/createstory')}
                    okText= {t("cprof modal ok")}
                    cancelText= {t("cprof modal cancel")}
                    onCancel={() => setModal2Open(false)}
                >
                    <p>{t("cprof modal msg")}</p>
                </Modal>

                <div className={`${s.profile_header} ${s.center_flex}`}>
                    <div className={s.profile_img}>
                        <img src={userIcon} alt="Profile Picture" />
                    </div>
                    <h2>{Fname}</h2>
                    <p>{email}</p>
                </div>
                {isLoading ?
                    <Spin size="Large" />
                    :
                    <div className={s.profile_windows}>
                        <div className={s.guardList_box} style={{direction: i18n.dir()}}>
                            <h2>{t("cprof guards title")}</h2>
                            <div className={s.list_container}>
                                {guards.length === 0 ?
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                    :
                                    <InfiniteScroll
                                        className={s.scrollable}
                                        dataLength={guards.length}
                                        // next={fetchMoreData} give the function that fetches next data
                                        hasMore={hasMore}
                                        loader={<h4>{t("cprof loader title")}</h4>}
                                        scrollableTarget="scrollableDiv"
                                    >
                                        {guards.map(guard => {
                                            return <Guardian
                                                key={guard.id}
                                                name={guard.first_name + " " + guard.last_name}
                                                job={guard.relation} />
                                        })}
                                    </InfiniteScroll>
                                }
                            </div>
                        </div>
                        <div className={s.profileInfo_box} style={{direction: i18n.dir()}}>
                            <div className={s.info_header}>
                                <h2>{t("prof persInfo title")}</h2>
                                <Tooltip title={t("settings")}>
                                    <Button
                                        style={{ borderColor: "#8993ED" }}
                                        icon={<SettingOutlined style={{ color: "#8993ED" }} />}
                                        onClick={() => { navigate('/EditProfile') }} />
                                </Tooltip>
                            </div>
                            <div className={s.info_main}>
                                <div className={s.info_left}>
                                    <div className={s.info}>
                                        <p style={{fontWeight: 'bold'}}>{t("cprof name")}</p>
                                        <p>{fullName}</p>
                                    </div>
                                    <div className={s.info}>
                                        <p style={{fontWeight: 'bold'}}>{t("cprof age")}</p>
                                        <p>{age}</p>
                                    </div>
                                    <div className={s.info}>
                                        <p style={{fontWeight: 'bold'}}>{t("cprof gender")}</p>
                                        <p>{gender}</p>
                                    </div>
                                </div>
                                <div className={s.info_right}>
                                    <div className={s.info}>
                                        <p style={{fontWeight: 'bold'}}>{t("cprof email")}</p>
                                        <p>{email}</p>
                                    </div>
                                    <div className={s.info}>
                                        <p style={{fontWeight: 'bold'}}>{t("cprof fcolor")}</p>
                                        <p>{fcolor}</p>
                                    </div>
                                    <div className={s.info}>
                                        <p style={{fontWeight: 'bold'}}>{t("cprof bdate")}</p>
                                        <p>{bdate}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={s.info_footer}>
                                <Button type="primary" href="/contact">{t("prof report")}</Button>
                                <Button type="primary" danger onClick={logOut}>{t("prof logout")}</Button>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default ChildProfile