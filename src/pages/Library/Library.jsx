import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import s from './Library_style.module.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Story from './Story'
import { Button, ConfigProvider, Segmented, Flex, Input, Select, Card, List, Empty } from 'antd';
import { BarsOutlined, HeartOutlined } from '@ant-design/icons'
import InfiniteScroll from "react-infinite-scroll-component"

// Delete later =======================
import candy from '../../assets/images/candy.jpg'
import randomData from './data.json'


function Library() {
    const navigate = useNavigate()
    //Get user info from localStorage (Laterrrr)===================================
    // const user = JSON.parse(localStorage.getItem('user-info'))

    //Segmented options value
    const [segmentedValue, setSegmented] = useState('library')

    //Search Box
    const { Search } = Input;
    // Fix later ==============================
    const onSearch = (value, _e, info) => console.log(info?.source, value);

    // Delete later ===========================XXXXXXXXXXXXXX
    const data = randomData["data"]
    //==========================================

    //Infinite Scrolling
    const [hasMore, setHasMore] = useState(false);

    return (
        <>
            <div className={s.body}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#76A795',
                        }
                    }} >

                    <Navbar />
                    <div className={`${s.content} ${s.center_flex}`}>
                        <div className={s.left_part}>
                            <div className={`${s.container} ${s.box1}`}>
                                <h1>Welcome {/*user && user.name*/}</h1>
                            </div>
                            <div className={`${s.container} ${s.box2}`}>
                                <h3>Build a new world inspired by your
                                    imagination!</h3>
                                <Button 
                                className={s.service_btn}
                                onClick={() => {navigate('/CreateStory')}}
                                >Create New Story</Button>
                            </div>
                            <div className={`${s.container} ${s.box3}`}>
                                <h3>Need help using Envision?</h3>
                                <Button className={s.service_btn}>Display Tutorial</Button>
                            </div>

                        </div>
                        <div className={s.right_part}>
                            <div className={s.services}>
                                <Segmented
                                    className={s.lib_box}
                                    block
                                    onChange={() => { setSegmented('favorites') }}
                                    options={[
                                        {
                                            label: 'My Library',
                                            value: 'Library',
                                            icon: <BarsOutlined />,
                                        },
                                        {
                                            label: 'Favorites',
                                            value: 'Favorites',
                                            icon: <HeartOutlined />,
                                        },
                                    ]}
                                />
                                <Flex className={s.lib_box} gap="middle" horizontal>
                                    <Search
                                        placeholder="Search for a story"
                                        onSearch={onSearch}
                                    />
                                    <Select
                                        className={s.sort}
                                        placeholder="Sort"
                                        options={[
                                            { value: 'creation_date', label: <span>Creation Date</span> },
                                            { value: 'alphabetically', label: <span>A → Z</span> }
                                        ]}
                                    />
                                </Flex>
                            </div>
                            <div className={s.stories_container}>
                                {/* <Empty className={s.empty} image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}

                                <InfiniteScroll
                                    className={s.scrollable}
                                    dataLength={data.length}
                                    // next={fetchMoreData} give the function that fetches next data
                                    hasMore={hasMore}
                                    loader={<h4>Loading...</h4>}
                                    scrollableTarget="scrollableDiv"
                                >
                                    {data.map(image => {
                                    return <Story title={image["owner"]} cover={image["imageUrl"]} />
                                })}
                                </InfiniteScroll>

                            </div>
                        </div>
                    </div>
                </ConfigProvider>
            </div>
            <Footer />
        </>
    )
}

export default Library