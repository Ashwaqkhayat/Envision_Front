import React, { useState, useEffect } from "react"
import s from './ChildProfile_style.module.css'
import Guardian from './GuardianInfo'
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import InfiniteScroll from "react-infinite-scroll-component"

//Delete Later =======================
import userIcon from '../../../assets/images/user-icon.jpg'
import randomData from '../data.json'

function ChildProfile(props) {
    const navigate = useNavigate()
    let name = props.user.f_name.charAt(0).toUpperCase() + props.user.f_name.slice(1);

    //Infinite Scrolling
    const [hasMore, setHasMore] = useState(false);

    // Delete later ===========================XXXXXXXXXXXXXX
    const data = randomData["data"]

    function logOut(){
        localStorage.clear();
        navigate('/')
    }
    
    return (
        <>
            <div className={`${s.profile_header} ${s.center_flex}`}>
                <div className={s.profile_img}>
                    <img src={userIcon} alt="Profile Picture" />
                </div>
                <h2>{name}</h2>
                <p>@{name}</p>
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
                            <p>Name:</p>
                            <p>Age:</p>
                            <p>Gender:</p>
                        </div>
                        <div className={s.info_right}>
                            <p>Email: </p>
                            <p>Favorite Color: </p>
                            <p>Birthday: </p>
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