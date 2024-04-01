import React, { useState, useEffect } from "react"
import s from './ChildProfile_style.module.css'
import Guardian from './GuardianInfo'
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import InfiniteScroll from "react-infinite-scroll-component"

//Delete Later =======================
import userIcon from '../../../assets/images/pfp.png'
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

    // Delete later ===========================
    const data = randomData["data"]

    function logOut() {
        localStorage.clear();
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
                // navigate('/')
                window.location.reload(false);
            })
            .catch((err) => {
                console.error("Error signing out..")
            })
    }

    return (
        <>
            <div className={`${s.profile_header} ${s.center_flex}`}>
                <div className={s.profile_img}>
                    <img src={userIcon} alt="Profile Picture" />
                </div>
                <h2>{Fname}</h2>
                <p>@{fullName}</p>
            </div>
            <div className={s.profile_windows}>
                <div className={s.guardList_box}>
                    <h2>My Guardians</h2>
                    <div className={s.list_container}>
                        <InfiniteScroll
                            className={s.scrollable}
                            dataLength={data.length} //Edit later
                            // next={fetchMoreData} give the function that fetches next data
                            hasMore={hasMore}
                            loader={<h4>Loading...</h4>}
                            scrollableTarget="scrollableDiv"
                        >
                            {data.map(guard => {
                                return <Guardian name={guard["name"]} job={guard["job"]} />
                            })}
                        </InfiniteScroll>
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
        </>
    )
}

export default ChildProfile