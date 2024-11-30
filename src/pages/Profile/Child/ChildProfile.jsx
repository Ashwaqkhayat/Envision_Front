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
    // console.log("Check ", isNewUser)       // <-- Delete Later
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
    let bdate = `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`

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
                    title={t("cprof modal title")}
                    centered
                    open={modal2Open}
                    onOk={() => navigate('/createstory')}
                    okText={t("cprof modal ok")}
                    cancelText={t("cprof modal cancel")}
                    onCancel={() => setModal2Open(false)}
                >
                    <p>{t("cprof modal msg")}</p>
                </Modal>

                {isLoading ?
                    <Spin size="Large" />
                    :
                    <div className={s.main_container} style={{ direction: i18n.dir() }}>
                        <div className={s.info_container}>
                            <div className={s.namepic}>
                                <img src={userIcon} alt="Profile Picture" />
                                <div className={s.user_namemail}>
                                    <h2>{fullName}</h2>
                                    <p>{email}</p>
                                </div>
                            </div>
                            <div className={s.info_box}>
                                <div style={{ fontWeight: 600, color: '#494C4C' }} >{t("cprof age")}</div>
                                <div style={{ fontWeight: 500, color: '#A2A9B0' }}>{age}</div>
                            </div>
                            <div className={s.info_box}>
                                <div style={{ fontWeight: 600, color: '#494C4C' }} >{t("cprof gender")}</div>
                                <div style={{ fontWeight: 500, color: '#A2A9B0' }}>{gender}</div>
                            </div>
                            <div className={s.info_box}>
                                <div style={{ fontWeight: 600, color: '#494C4C' }} >{t("cprof fcolor")}</div>
                                <div style={{ fontWeight: 500, color: '#A2A9B0' }}>{fcolor}</div>
                            </div>
                            <div className={s.info_box}>
                                <div style={{ fontWeight: 600, color: '#494C4C' }} >{t("cprof bdate")}</div>
                                <div style={{ fontWeight: 500, color: '#A2A9B0' }}>{bdate}</div>
                            </div>
                            <div className={s.buttons_box}>
                                <Tooltip title={t("settings")}>
                                    <Button
                                        style={{ borderColor: "#A2A9B0" }}
                                        icon={<SettingOutlined style={{ color: "#A2A9B0" }} />}
                                        onClick={() => { navigate('/EditProfile') }}
                                    />
                                </Tooltip>
                                <div style={{ display: 'flex', columnGap: '10px' }}>
                                    <Button type="primary" href="/contact">{t("prof report")}</Button>
                                    <Button type="primary" danger onClick={logOut}>{t("prof logout")}</Button>
                                </div>
                            </div>
                        </div>
                        <div className={s.guards_container}>
                            <h2 style={{ color: '#8993ED' }}>{t("cprof guards title")}</h2>
                            <div className={s.list_container}>
                                {guards.length === 0 ?
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("empty guards list")} />
                                    :
                                    <InfiniteScroll
                                        className={s.scrollable}
                                        dataLength={guards.length}
                                        // next={fetchMoreData} give the function that fetches next data
                                        hasMore={hasMore}
                                        loader={<h4>{t("loader title")}</h4>}
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
                    </div>
                }
            </>
        )
    }
}

export default ChildProfile