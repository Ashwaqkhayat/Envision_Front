import React, { useRef, useState, useEffect } from 'react'
import s from './Story_style.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { ConfigProvider, Button, Spin, Tour, Modal, Input, message } from 'antd'
import {
    CloseOutlined, HeartOutlined,
    HeartFilled, LoadingOutlined, EditOutlined,
    SoundOutlined, FolderOutlined, FolderFilled,
    SaveOutlined,
    SaveFilled,
} from '@ant-design/icons'
// importing components
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ContentSlider from './ContentSlider'
// translation hook
import { useTranslation } from 'react-i18next';

function DisplayStory() {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const auth = JSON.parse(localStorage.getItem('user-info'))

    // Save & Fave buttons
    const [isSaved, setIsSaved] = useState(false)
    const [saveIcon, setSaveIcon] = useState(<FolderOutlined />)

    const [isFaved, setIsFaved] = useState(false)
    const [faveIcon, setFaveIcon] = useState(<HeartOutlined />)
    const [faveColor, setFaveColor] = useState('#494C4C')

    const [saveLoading, setSaveLoading] = useState(false)
    const [faveLoading, setFaveLoading] = useState(false)

    const [story, setStory] = useState(JSON.parse(localStorage.getItem('story'))) //state item to store fetched story
    const [isLoading, setIsLoading] = useState(true) //Loading API fetching

    // References to components
    const saveRef = useRef(null)
    const [open, setOpen] = useState(false)
    const steps = [
        {
            title: t("story fave step title"),
            description: t("story fave step desc"),
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
                    popMsg(t("story title change success"), 'success')
                } else {
                    console.error('Response recieved but is not ok: ', response.status)
                    popMsg(t("story title change failure"), 'error')
                }
            }
        } catch (error) {
            console.error("Error in changing title: ", error)
            popMsg(t("server req error"), 'error')
        } finally {
            setIsModalOpen(false);
            document.querySelector('.changeTitle').value = ''
        }

    }

    //if there's no story in the local storage, redirect to main page
    useEffect(() => {
        setIsLoading(true)
        // If story isn't exist in localStorage, redirect back
        if (!story) { navigate(-1) }
        setIsSaved(story.is_saved)
        setSaveIcon(story.is_saved ? <FolderFilled style={{ fontSize: '24pt' }} /> : <FolderOutlined style={{ fontSize: '24pt' }} />)

        setIsFaved(story.is_favorite)
        setFaveIcon(story.is_favorite ? <HeartFilled style={{ fontSize: '24pt' }} /> : <HeartOutlined style={{ fontSize: '24pt' }} />)
        setFaveColor(story.is_favorite ? '#d94848' : '#494C4C')

        setTitle(story.title)
        setIsLoading(false)

    }, [])

    function displayBase64Images(img) {
        return `data:image/jpeg;base64,${img}`
    }

    async function handleSave() {
        if (isSaved === false) { //if story isn't saved => Save
            const requestBody = {
                title: story.title,
                language: story.language,
                prompt: story.prompt,
                story_ar: story.story_ar,
                story_en: story.story_en,
                story_images: story.story_images,
                start_time: story.start_time,
                end_time: story.end_time,
                story_questions: [],
            }
            try {
                setSaveLoading(true)
                console.warn("Saving Story..")
                setSaveIcon(<LoadingOutlined style={{ fontSize: '24pt' }} />)
                const response = await fetch(`${process.env.REACT_APP_url}/children/stories/save`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(requestBody),
                })
                const data = await response.json()
                if (response.ok) {
                    setStory({ ...story, id: data.story[0].id })
                    setIsSaved(true)
                    setSaveIcon(<FolderFilled style={{ fontSize: '24pt' }} />)
                    console.log("Successfully Saved!!")
                } else {
                    console.warn("Save Response recieved but not OK: ", response.status)
                    setSaveIcon(<FolderOutlined style={{ fontSize: '24pt' }} />)
                    setIsSaved(false)
                }
            } catch (e) {
                console.error('Error occured while saving story, ', e)
            }
        } else { //if story is saved => Delete
            try {
                console.warn("Deleting Story..")
                setSaveIcon(<LoadingOutlined style={{ fontSize: '24pt' }} />)
                const response = await fetch(`${process.env.REACT_APP_url}/children/stories?id=${story.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                })
                if (response.ok) {
                    setIsSaved(false)
                    setSaveIcon(<FolderOutlined style={{ fontSize: '24pt' }} />)
                    console.log("Successfully Deleted!")

                    // if Story was faved, remove favorite..
                    setIsFaved(false)
                    setFaveIcon(<HeartOutlined style={{ fontSize: '24pt' }} />)
                    setFaveColor('#494C4C')
                } else {
                    console.warn("Delete Response recieved but not OK: ", response.status)
                    setSaveIcon(<FolderFilled style={{ fontSize: '24pt' }} />)
                    setIsSaved(true)
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
                try {
                    console.warn("Adding Story to Favorites...")
                    setFaveIcon(<LoadingOutlined style={{ fontSize: '24pt' }} />)
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
                        setFaveIcon(<HeartFilled style={{ fontSize: '24pt' }} />)
                        setFaveColor('#d94848')
                    } else {
                        console.warn("Response recieved but not OK: ", response.status)
                        setIsFaved(false)
                        setFaveIcon(<HeartOutlined style={{ fontSize: '24pt' }} />)
                        setFaveColor('#494C4C')
                    }
                } catch (e) {
                    console.error('Error occured while updating favorites, ', e)
                }
            } else { // if faved, remove
                console.warn("Removing Story from Favorites...")
                try {
                    setFaveIcon(<LoadingOutlined style={{ fontSize: '24pt' }} />)
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
                        setFaveIcon(<HeartOutlined style={{ fontSize: '24pt' }} />)
                        setFaveColor('#494C4C')
                    } else {
                        console.warn("Response recieved but not OK: ", response.status)
                        setFaveIcon(<HeartFilled style={{ fontSize: '24pt' }} />)
                        setIsFaved(true)
                        setFaveColor('#d94848')
                    }
                } catch (e) {
                    console.error('Error occured while updating favorites, ', e)
                }
            }
        }
    }

    return (
        <>
            <ConfigProvider theme={{ token: { colorPrimary: '#8993ed', } }}>
                {contextHolder}
                <Tour open={open} onClose={() => setOpen(false)} steps={steps}/>
                <Modal
                    title={t("story title edit label")}
                    open={isModalOpen} onOk={handleOk}
                    onCancel={handleCancel}
                    okText={t("story title edit ok")}
                    cancelText={t("story title edit cancel")}
                    style={{direction: i18n.dir()}}
                >
                    <Input size='large' className="changeTitle" placeholder={t("story title edit placeholder")} />
                </Modal>
            </ConfigProvider>

            <div className={s.body}>
                <Navbar />
                <div className={s.content}>
                    <ConfigProvider theme={{ token: { colorPrimary: '#96CCC0', fontSize: 16, sizeStep: 2, } }} >

                        {isLoading ?
                            <Spin spinning={isLoading} size="large" tip={t("load story spin tip")} />
                            :
                            <>
                                <div className={s.header} >
                                    <div className={s.titles} >
                                        <Link style={{ marginRight: '10px' }} to={-1}>
                                            <CloseOutlined style={{ fontSize: '30px', color: '#494C4C' }} />
                                        </Link>
                                        <h1 style={{ color: '#8993ED', direction: i18n.dir() }}>{`${t("story title")}: ${title}`}</h1>
                                        {auth && auth.userType === "child" &&
                                            <Link style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }} onClick={showModal}>
                                                <box-icon color='#b3b3b3' size='30px' name='edit-alt' />
                                            </Link>
                                        }
                                    </div>

                                    {auth && auth.userType === "child" &&
                                        <div className={s.buttons}>
                                            <Button icon={saveIcon} ref={saveRef} size='large' type='link' style={{ color: '#494C4C', width: '50px', height: '50px' }} onClick={handleSave} />
                                            <Button icon={faveIcon} size='large' type='link' style={{ color: `${faveColor}`, width: '50px', height: '50px' }} onClick={handleFave} />
                                            {/* <Link ref={saveRef} style={{ display: 'flex', alignItems: 'center' }} onClick={handleSave}>
                                                <box-icon name='bookmark' type={saveIcon} size='40px' />
                                            </Link>
                                            <Link style={{ display: 'flex', alignItems: 'center' }} onClick={handleFave}>
                                                <box-icon name='heart' type={faveIcon} size='40px' color={faveColor} />
                                            </Link> */}
                                        </div>
                                    }
                                </div>

                                <div className={s.contentSlider}>
                                    <ContentSlider
                                        language={story.language}
                                        storyTexts={{ story_ar: story.story_ar, story_en: story.story_en }}
                                        storyImg={story.story_images}
                                    />
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

export default DisplayStory