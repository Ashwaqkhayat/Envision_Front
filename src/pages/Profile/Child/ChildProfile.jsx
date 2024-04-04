import React, { useState, useEffect } from "react"
import s from './ChildProfile_style.module.css'
import Guardian from './GuardianInfo'
import { useNavigate } from "react-router-dom";
import { Button, Tooltip, Spin, Empty } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import InfiniteScroll from "react-infinite-scroll-component"
import userIcon from '../../../assets/images/pfp.png'

//Delete Later =======================
import randomData from '../data.json'

function ChildProfile(props) {
    const navigate = useNavigate()

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
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Delete later ===========================
    // const data = randomData["data"]
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
                localStorage.clear();
                window.location.reload(false);
            })
            .catch((err) => {
                console.error("Error signing out: ", err)
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
            }
        }
        getGuards()
    }, [])

    if (guards !== null) { //Display profile only when everything is fetched..
        return (
            <>
                <div className={`${s.profile_header} ${s.center_flex}`}>
                    <div className={s.profile_img}>
                        <img src={userIcon} alt="Profile Picture" />
                    </div>
                    <h2>{Fname}</h2>
                    <p>@{fullName}</p>
                </div>
                {isLoading ?
                    <Spin size="Large" />
                    :
                    <div className={s.profile_windows}>
                        <div className={s.guardList_box}>
                            <h2>My Guardians</h2>
                            <div className={s.list_container}>
                                {guards.length === 0 ?
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                    :
                                    <InfiniteScroll
                                        className={s.scrollable}
                                        dataLength={guards.length} //Edit later
                                        // next={fetchMoreData} give the function that fetches next data
                                        hasMore={hasMore}
                                        loader={<h4>Loading...</h4>}
                                        scrollableTarget="scrollableDiv"
                                    >
                                        {guards.map((guard, index) => {
                                            return <Guardian 
                                            key={guard.id} 
                                            name={guard.first_name + " " + guard.last_name} 
                                            job={guard.relation} />
                                        })}
                                    </InfiniteScroll>
                                }
                            </div>
                        </div>
                        <div className={s.profileInfo_box}>
                            <div className={s.info_header}>
                                <h2>My Information</h2>
                                <Tooltip title="Edit">
                                    <Button icon={<EditOutlined />} href="#" />
                                </Tooltip>
                            </div>
                            <div className={s.info_main}>
                                <div className={s.info_left}>
                                    <p>Name: {fullName}</p>
                                    <p>Age: {age}</p>
                                    <p>Gender: {gender}</p>
                                </div>
                                <div className={s.info_right}>
                                    <p>Email: {email}</p>
                                    <p>Favorite Color: {fcolor}</p>
                                    <p>Birthday: {bdate}</p>
                                </div>
                            </div>
                            <div className={s.info_footer}>
                                <Button type="primary" href="/contact">Report Problem</Button>
                                <Button type="primary" danger onClick={logOut}>Sign Out</Button>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default ChildProfile