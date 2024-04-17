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
                popMsg('Something went wrong. Please try again. ', 'error')
            })
    }

    if (children !== null) { //Display profile only when everything is fetched..
        return (
            <>
                {contextHolder}
                <Modal
                    title="Welcome"
                    centered
                    open={modal2Open}
                    onOk={() => navigate('/addchild')}
                    okText='Add Child'
                    cancelText='Later'
                    onCancel={() => setModal2Open(false)}
                >
                    <p>Lets add your first existing child account!</p>
                </Modal>
                <div className={`${s.profile_header} ${s.center_flex}`}>
                    <h2>Welcome {Fname} !</h2>
                </div>
                <div className={s.profile_windows}>
                    <div className={s.childList_box}>
                        <div className={s.list_header}>
                            <h2>My Children</h2>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => { navigate('/addchild') }}
                            >Add Child</Button>
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
                            <h2>My Information</h2>
                            <Tooltip title="Settings">
                                <Button
                                    style={{ borderColor: "#8993ED" }}
                                    icon={<SettingOutlined style={{ color: "#8993ED" }} />}
                                    onClick={() => { navigate('/EditProfile') }}
                                />
                            </Tooltip>
                        </div>
                        <div className={s.info_main}>
                            <div className={s.info_left}>
                                <p>Name: {fullName}</p>
                                <p>Age: {age}</p>
                                <p>Email: {email}</p>
                                <p>Phone Number: {pnum}</p>
                                <p>Children Number: {children.length}</p>
                            </div>
                        </div>
                        <div className={s.info_footer}>
                            <Button type="primary" href="/contact">Report Problem</Button>
                            <Button type="primary" danger onClick={logOut}>Sign Out</Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default GuardianProfile