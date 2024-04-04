import React, { useEffect, useState } from "react"
import s from './GuardianProfile_style.module.css'
import Child from './ChildInfo'
import { Button, Tooltip } from 'antd';
import { useNavigate } from "react-router-dom";
import { EditOutlined, PlusOutlined  } from '@ant-design/icons'
import InfiniteScroll from "react-infinite-scroll-component"

//Change Later =======================
import randomData from '../data.json'


function GuardianProfile(props) {
    const navigate = useNavigate()
    
    //Get info
    let info = props.info
    let Fname = info.first_name.charAt(0).toUpperCase() + info.first_name.slice(1);
    let Lname = info.last_name.charAt(0).toUpperCase() + info.last_name.slice(1);
    let fullName = Fname + " " + Lname
    let age = info.age
    let pnum = info.phone
    let email = info.email

    //Infinite Scrolling
    const [hasMore, setHasMore] = useState(false);

    // Change later ===========================
    const data = randomData["data"]

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
            })
    }

    return (
        <>
            <div className={`${s.profile_header} ${s.center_flex}`}>
                <h2>Welcome {Fname}!</h2>
            </div>
            <div className={s.profile_windows}>
                <div className={s.childList_box}>
                    <div className={s.list_header}>
                        <h2>My Children</h2>
                        <Button 
                        type="primary" 
                        icon={<PlusOutlined  />}
                        onClick={() => {navigate('/addchild')}}
                        >Add Child</Button>
                    </div>
                    <div className={s.list_container}>
                        <InfiniteScroll
                            className={s.scrollable}
                            dataLength={data.length} //Edit later
                            // next={fetchMoreData} give the function that fetches next data
                            hasMore={hasMore}
                            loader={<h4>Loading...</h4>}
                            scrollableTarget="scrollableDiv"
                        >
                            {data.map(child => {
                                return <Child name={child["name"]} age="22" gender="female" url="#"/>
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
                            <p>Email: {email}</p>
                            <p>Phone Number: {pnum}</p>
                            <p>Children Number: {data.length}</p>
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

export default GuardianProfile