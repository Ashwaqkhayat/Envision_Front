import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ConfigProvider, Button, Spin, Tour, Modal, Input, message, Carousel  } from 'antd'
import {
    LeftOutlined, RightOutlined, CloseOutlined, HeartOutlined,
    HeartFilled, CloudFilled, CloudOutlined, LoadingOutlined,
    EditOutlined, SoundOutlined,
} from '@ant-design/icons'
import 'boxicons'
import s from './Story_style.module.css'
// importing components
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Page from './Page'

// Delete later --------------------------------
import Card from './Card'

function DisplayStory() {
    const navigate = useNavigate()
    const auth = JSON.parse(localStorage.getItem('user-info'))
    const isStoryExist = localStorage.getItem('story')

    // Save & Fave buttons
    const [isSaved, setIsSaved] = useState(false)
    const [save, setSave] = useState(<CloudOutlined />)

    const [isFaved, setIsFaved] = useState(false)
    const [fave, setFave] = useState(<HeartOutlined />)

    const [story, setStory] = useState(null) //state item to store fetched story
    const [isLoading, setIsLoading] = useState(true) //Loading API fetching

    //if there's no story in the local storage, redirect to main page
    useEffect(() => {
        if (isStoryExist === null) {
            navigate('/')
        }
    }, [])

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

    

    // Load Story from local storage
    useEffect(() => {
        setIsLoading(true) //Loading page content to be fetched
        const story_data = JSON.parse(localStorage.getItem('story'))
        //console.warn("Recieved Data: ", story_data)
        const setData = async () => {
            setStory({
                title: story_data.title,
                language: story_data.language,
                prompt: story_data.prompt,
                start_time: story_data.start_time,
                end_time: story_data.end_time,
                story_text: story_data.story_text,
                story_images: story_data.story_images,
                is_favorite: story_data.is_favorite,
                is_saved: story_data.is_saved,
                scenesNum: story_data.story_text.length,
                id: story_data.id,
            })
            setIsSaved(story_data.is_saved)
            setSave(story_data.is_saved ? <CloudFilled /> : <CloudOutlined />)

            setIsFaved(story_data.is_favorite)
            setFave(story_data.is_favorite ? <HeartFilled /> : <HeartOutlined />)

            setTitle(story_data.title)

            setIsLoading(false) //When data is fetched, set loading to false
        }

        setData()
    }, []);

    function displayBase64Images(img) {
        return `data:image/jpeg;base64,${img}`
    }

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
                setSave(<LoadingOutlined />)
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
                    setSave(<CloudFilled />)
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
                    setSave(<CloudOutlined />)
                    console.log("Successfully Deleted!")

                    // if Story was faved, remove favorite..
                    setIsFaved(false)
                    setFave(<HeartOutlined />)
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
                setFave(<LoadingOutlined />)
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
                        setFave(<HeartFilled />)
                    } else {
                        console.warn("Response recieved but not OK: ", response.status)
                    }
                } catch (e) {
                    console.error('Error occured while updating favorites, ', e)
                }
            } else { // if faved, remove
                console.warn("Removing Story from Favorites...")
                try {
                    setFave(<LoadingOutlined />)
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
                        setFave(<HeartOutlined />)
                    } else {
                        console.warn("Response recieved but not OK: ", response.status)
                    }
                } catch (e) {
                    console.error('Error occured while updating favorites, ', e)
                }
            }
        }
    }

    async function playNarration() {
        try {
            console.warn("Playing Story Narration...")
            const response = await fetch(`${process.env.REACT_APP_url}/children/stories/narrate`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ story_text: story.story_text }),
                credentials: 'include',
            })
            if (response.ok) {
                const data = await response.json()
                console.log("Successfully Playing Narration...", data)
            } else {
                console.warn("Response recieved but not OK: ", response.status)
            }
        } catch (e) {
            console.error('Error occured while playing narration, ', e)
        }
    }

    // Carousel Component customization
    const contentStyle = {
        margin: 0,
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };

    if (story) {
        return (
            <>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#8993ed',
                        }
                    }}>
                    {contextHolder}
                    <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
                    <Modal title="Edit Title" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Input size='large' className="changeTitle" placeholder="Enter new title here" />
                    </Modal>
                </ConfigProvider>
                <div className={s.body}>
                    <Navbar />
                    <div className={s.wrapper}>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#96CCC0',
                                    fontSize: 16,
                                    sizeStep: 2,
                                }
                            }} >
                            {isLoading ?
                                <Spin size="large" tip="Just a few seconds more! Your story is loading..." />
                                :
                                <>
                                    <div className={s.header}>
                                        <div className={s.titles}>
                                            <h1>{`Story title: ${title}`}</h1>
                                            <Button onClick={showModal} icon={<EditOutlined />} size='large' />
                                            <Button onClick={playNarration} icon={<SoundOutlined />} size='large' />
                                            <h2>{`#Scenes: ${story.scenesNum}`}</h2>
                                        </div>

                                        {auth && auth.userType === "child" &&
                                            <div className={s.buttons}>
                                                <Button ref={saveRef} onClick={handleSave} size='large' icon={save}></Button>
                                                <Button onClick={handleFave} size='large' icon={fave}></Button>
                                            </div>
                                        }
                                    </div>

                                    <div className={s.scenes_cont}>
                                        {story.story_text.map((item, index) => (
                                            <Card img={displayBase64Images(story.story_images[index])} text={item} />
                                        ))}
                                    </div>
                                </>
                            }
                        </ConfigProvider>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default DisplayStory