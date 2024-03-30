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
    
    // useEffect(() => {
    //     if(props===null){
    //         window.location.reload();
    //     }
    // },[])

    const name = props.user.f_name.charAt(0).toUpperCase() + props.user.f_name.slice(1);

    //Infinite Scrolling
    const [hasMore, setHasMore] = useState(false)
    const navigate = useNavigate()

    // Change later ===========================
    const data = randomData["data"]

    function logOut() {
        localStorage.clear();
        navigate('/')
    }

    return (
        <>
            <div className={`${s.profile_header} ${s.center_flex}`}>
                <h2>Welcome {name}!</h2>
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
                            <p>Name:</p>
                            <p>Age:</p>
                            <p>Email:</p>
                            <p>Phone Number: </p>
                            <p>Birthday: </p>
                            <p>Children Number: </p>
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