import React, { useRef, useState, useEffect } from 'react'
import s from './Story_style.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { ConfigProvider, Button, Spin, Tour, Modal, Input, message, Carousel } from 'antd'
import {
    LeftOutlined, RightOutlined, CloseOutlined, HeartOutlined,
    HeartFilled, CloudFilled, CloudOutlined, LoadingOutlined,
    EditOutlined, SoundOutlined,
} from '@ant-design/icons'
// importing components
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ContentSlider from './ContentSlider'

// Delete later --------------------------------
import tempData from './data.json'
import tempData2 from './exampleStory.json'

function DisplayStory() {
    //                                                      <-- Delete later 
    const data = tempData2.story[0]
    // console.log(data)

    const navigate = useNavigate()
    const auth = JSON.parse(localStorage.getItem('user-info'))
    const isStoryExist = localStorage.getItem('story')

    useEffect(()=>{
        if(!auth){
            navigate(-1)
        }
    },[])

    // Save & Fave buttons
    const [isSaved, setIsSaved] = useState(false)
    const [save, setSave] = useState('default')

    const [isFaved, setIsFaved] = useState(false)
    const [fave, setFave] = useState('default')
    const [faveColor, setFaveColor] = useState('#494C4C')

    const [story, setStory] = useState(null) //state item to store fetched story
    const [isLoading, setIsLoading] = useState(true) //Loading API fetching

    //if there's no story in the local storage, redirect to main page         <-- Restore later
    // useEffect(() => {
    //     if (isStoryExist === null) {
    //         navigate('/')
    //     }
    // }, [])

    // References to components
    const saveRef = useRef(null)
    const [open, setOpen] = useState(false)
    const steps = [
        {
            title: 'You Have to Save Story First!',
            description: 'Please save the story by clicking the save button so it can be added to your favorites.',
            placement: 'bottom',
            target: () => saveRef.current,
        },
    ]

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

    // Edit title modal
    const [title, setTitle] = useState("Story Title")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const handleOk = async () => {
        const newTitle = document.querySelector('.changeTitle').value
        setTitle(newTitle)
        setStory({ ...story, title: newTitle })
        try {
            if (isSaved) {
                const requestBody = {
                    title: newTitle,
                    id: story.id,
                }
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody),
                    credentials: 'include',
                }
                const response = await fetch(`${process.env.REACT_APP_url}/children/stories`, requestOptions)
                if (response.ok) {
                    console.warn("Story title changed successfully.")
                    popMsg('Title changed!', 'success')
                } else {
                    console.error('Response recieved but is not ok: ', response.status)
                    popMsg('Something went wrong :( Try again.', 'error')
                }
            }
        } catch (error) {
            console.error("Error in changing title: ", error)
            popMsg('Sorry we cannot change the title now, try again later.', 'error')
        } finally {
            setIsModalOpen(false);
            document.querySelector('.changeTitle').value = ''
        }

    }


    // Load Story from local storage                        <-- Restore later
    // useEffect(() => {
    //     setIsLoading(true) //Loading page content to be fetched
    //     const story_data = JSON.parse(localStorage.getItem('story'))
    //     //console.warn("Recieved Data: ", story_data)
    //     const setData = async () => {
    //         setStory({
    //             title: story_data.title,
    //             language: story_data.language,
    //             prompt: story_data.prompt,
    //             start_time: story_data.start_time,
    //             end_time: story_data.end_time,
    //             story_text: story_data.story_text,
    //             story_images: story_data.story_images,
    //             is_favorite: story_data.is_favorite,
    //             is_saved: story_data.is_saved,
    //             scenesNum: story_data.story_text.length,
    //             id: story_data.id,
    //         })
    //         setIsSaved(story_data.is_saved)
    //         setSave(story_data.is_saved ? <CloudFilled /> : <CloudOutlined />)

    //         setIsFaved(story_data.is_favorite)
    //         setFave(story_data.is_favorite ? <HeartFilled /> : <HeartOutlined />)

    //         setTitle(story_data.title)

    //         setIsLoading(false) //When data is fetched, set loading to false
    //     }

    //     setData()
    // }, []);

    // function displayBase64Images(img) {
    //     return `data:image/jpeg;base64,${img}`
    // }

    async function handleSave() {
        if (isSaved === false) { //if story isn't saved => Save
            const requestBody = {
                title: story.title,
                language: story.language,
                prompt: story.prompt,
                story_text: story.story_text,
                story_images: story.story_images,
                start_time: story.start_time,
                end_time: story.end_time,
            }
            try {
                console.warn("Saving Story..")
                // setSave(<LoadingOutlined />)
                const response = await fetch(`${process.env.REACT_APP_url}/children/stories/save`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(requestBody),
                })
                if (response.ok) {
                    const data = await response.json()
                    console.log("data of story: ", data)
                    setStory({ ...story, id: data.story[0].id })
                    setIsSaved(true)
                    setSave('solid')
                    console.log("Successfully Saved!!")
                } else {
                    console.warn("Save Response recieved but not OK: ", response.status)
                }
            } catch (e) {
                console.error('Error occured while saving story, ', e)
            }
        } else { //if story is saved => Delete
            try {
                console.warn("Deleting Story..")
                console.log("deletee story id: ", story.id)
                const response = await fetch(`${process.env.REACT_APP_url}/children/stories?id=${story.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                })
                if (response.ok) {
                    setIsSaved(false)
                    setSave('default')
                    console.log("Successfully Deleted!")

                    // if Story was faved, remove favorite..
                    setIsFaved(false)
                    setFave('default')
                    setFaveColor('#494C4C')
                } else {
                    console.warn("Delete Response recieved but not OK: ", response.status)
                }
            } catch (e) {
                console.error('Error occured while deleting story, ', e)
            }
        }
    }

    async function handleFave() {
        if (!isSaved) { //if Story is not saved, ask to save it.
            setOpen(true)
        } else {
            if (!isFaved) { //if not faved, add to favorite
                // setFave(<LoadingOutlined />)
                try {
                    console.warn("Adding Story to Favorites...")
                    const response = await fetch(`${process.env.REACT_APP_url}/children/stories/favorite?id=${story.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        credentials: 'include',
                    })
                    if (response.ok) {
                        console.log("Successfully Added Story to Favorites!")
                        setIsFaved(true)
                        setFave('solid')
                        setFaveColor('#d94848')
                    } else {
                        console.warn("Response recieved but not OK: ", response.status)
                    }
                } catch (e) {
                    console.error('Error occured while updating favorites, ', e)
                }
            } else { // if faved, remove
                console.warn("Removing Story from Favorites...")
                try {
                    // setFave(<LoadingOutlined />)
                    const response = await fetch(`${process.env.REACT_APP_url}/children/stories/favorite?id=${story.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        credentials: 'include',
                    })
                    if (response.ok) {
                        console.log("Successfully Removed Story from Favorites!")
                        setIsFaved(false)
                        setFave('default')
                        setFaveColor('#494C4C')
                    } else {
                        console.warn("Response recieved but not OK: ", response.status)
                    }
                } catch (e) {
                    console.error('Error occured while updating favorites, ', e)
                }
            }
        }
    }

    // if (story) {
    if (auth) {
    return (
        <>
            <ConfigProvider
                theme={{ token: { colorPrimary: '#8993ed', } }}>
                {contextHolder}
                <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
                <Modal title="Edit Title" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Input size='large' className="changeTitle" placeholder="Enter new title here" />
                </Modal>
            </ConfigProvider>

            <div className={s.body}>
                <Navbar />
                <div className={s.content}>
                    <ConfigProvider theme={{ token: { colorPrimary: '#96CCC0', fontSize: 16, sizeStep: 2, } }} >

                        {/* {isLoading ?
                                <Spin size="large" tip="Just a few seconds more! Your story is loading..." />
                                : */}
                        <>
                            <div className={s.header}>
                                <div className={s.titles}>
                                    <Link style={{ marginRight: '10px' }} to={-1}>
                                        <CloseOutlined style={{ fontSize: '30px', color: '#494C4C' }} />
                                    </Link>
                                    <h1 style={{ color: '#8993ED' }}>{`Story title: ${title}`}</h1>
                                    {auth.userType === "child" &&
                                        <Link style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }} onClick={showModal}>
                                            <box-icon color='#b3b3b3' size='30px' name='edit-alt' />
                                        </Link>
                                    }
                                </div>

                                {auth && auth.userType === "child" &&
                                    <div className={s.buttons}>
                                        <Link ref={saveRef} style={{ display: 'flex', alignItems: 'center' }} onClick={handleSave}>
                                            <box-icon name='bookmark' type={save} size='40px' color="#494C4C" />
                                        </Link>
                                        <Link style={{ display: 'flex', alignItems: 'center' }} onClick={handleFave}>
                                            <box-icon name='heart' type={fave} size='40px' color={faveColor} />
                                        </Link>
                                        {/* <Button ref={saveRef} onClick={handleSave} size='large' icon={save}></Button>
                                        <Button onClick={handleFave} size='large' icon={fave}></Button> */}
                                    </div>
                                }
                            </div>

                            <div className={s.contentSlider}>
                                <ContentSlider content={data} />
                            </div>
                        </>
                        {/* } */}
                    </ConfigProvider>
                </div>
            </div>
            <Footer />
        </>
    )
    }
}

export default DisplayStory