import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import s from './Library_style.module.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Story from './Story'
import { Button, ConfigProvider, Segmented, Flex, Input, Select, Empty, Spin } from 'antd';
import { BarsOutlined, HeartOutlined } from '@ant-design/icons'
import InfiniteScroll from "react-infinite-scroll-component"

function Library() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user-info")))
    const [library, setLibrary] = useState(null) //Get user stories from DB
    const [hasMore, setHasMore] = useState(false) //Infinite Scrolling

    const [segmentedValue, setSegmented] = useState('library') //Segmented options value
    const [sort, setSort] = useState('creation_date') //Segmented options value
    const { Search } = Input //Search Box
    const [search, setSearch] = useState('')

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_url}/children/stories?is_favorite=true&key=&sortBy=created_at:asc`, {
                    method: 'GET',
                    credentials: 'include',
                })
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`)
                }
                console.log("Library fetched successfully")
                const data = await response.json();
                setLibrary(JSON.parse(JSON.stringify(data)).stories)
                console.log("data are: ", JSON.parse(JSON.stringify(data)).stories)
                setIsLoading(false)
            } catch (err) {
                console.error("Error Getting library", err)
                setIsLoading(false)
                localStorage.clear()
                navigate('/')
            }
        }

        fetchData()
    }, [])

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    if (user) {
        return (
            <>
                <div className={s.body}>
                    <ConfigProvider
                        theme={{
                            components: {
                                Spin: {
                                    colorPrimary: '#8993ED',
                                },
                            },
                            token: {
                                colorPrimary: '#76A795',
                            }
                        }} >

                        <Navbar />
                        <div className={`${s.content} ${s.center_flex}`}>
                            <div className={s.left_part}>
                                <div className={`${s.container} ${s.box1}`}>
                                    <h1>Welcome {user && capitalize(user.first_name)}</h1>
                                </div>
                                <div className={`${s.container} ${s.box2}`}>
                                    <h3>Build a new world inspired by your
                                        imagination!</h3>
                                    <Button
                                        className={s.service_btn}
                                        onClick={() => { navigate('/CreateStory') }}
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
                                        size="large"
                                        className={s.lib_box}
                                        block
                                        onChange={(value) => { setSegmented(value) }}
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
                                            size="large"
                                            placeholder="Search for a story"
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <Select
                                            size="large"
                                            className={s.sort}
                                            defaultValue='creation_date'
                                            onChange={(e) => { setSort(e) }}
                                            placeholder="Sort"
                                            options={[
                                                { value: 'creation_date', label: <span>Creation Date</span> },
                                                { value: 'alphabetically', label: <span>A → Z</span> }
                                            ]}
                                        />
                                    </Flex>
                                </div>
                                {isLoading ?
                                    <div className={`${s.center_flex} ${s.fullHeight}`}>
                                        <Spin tip="Loading Stories..." size="large" />
                                    </div>
                                    :
                                    <div className={`${s.stories_container} ${s.fullHeight}`}>
                                        {((library === undefined) || (library === null) || (library.length === 0)) ?
                                            <Empty className={s.empty} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                            :
                                            <InfiniteScroll
                                                className={s.scrollable}
                                                dataLength={library.length}
                                                // next={fetchMoreData} give the function that fetches next data
                                                hasMore={hasMore}
                                                loader={<h4>Loading...</h4>}
                                                scrollableTarget="scrollableDiv"
                                            >
                                                {
                                                    segmentedValue === 'Favorites' ?
                                                        sort === 'alphabetically' ?
                                                            library // Faved & Sorted A -> Z
                                                                .filter((image, index) => { return search.toLowerCase() === '' ? image : image.title.toLowerCase().includes(search) })
                                                                .filter((item, index) => item.is_favorite === true)
                                                                .sort((a, b) => a.title.localeCompare(b.title))
                                                                .map((image, index) => { return <Story key={index} content={image} /> })
                                                            :
                                                            library // Faved & Sorted by Creation Date
                                                                .filter((image, index) => { return search.toLowerCase() === '' ? image : image.title.toLowerCase().includes(search) })
                                                                .filter((item, index) => item.is_favorite === true)
                                                                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                                                .map((image, index) => { return <Story key={index} content={image} /> })
                                                        :
                                                        sort === 'alphabetically' ?
                                                            library // not Faved & Sorted A -> Z
                                                                .filter((image, index) => { return search.toLowerCase() === '' ? image : image.title.toLowerCase().includes(search) })
                                                                .sort((a, b) => a.title.localeCompare(b.title))
                                                                .map((image, index) => { return <Story key={index} content={image} /> })
                                                            :
                                                            library // not Faved & Sorted by Creation Date
                                                                .filter((image, index) => { return search.toLowerCase() === '' ? image : image.title.toLowerCase().includes(search) })
                                                                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                                                .map((image, index) => { return <Story key={index} content={image} /> })
                                                }
                                            </InfiniteScroll>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </ConfigProvider>
                </div>
                <Footer />
            </>
        )
    }
}

export default Library