import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ConfigProvider, Button, Spin, Tour, Modal, Input } from 'antd'
import {
    LeftOutlined, RightOutlined, CloseOutlined, HeartOutlined,
    HeartFilled, CloudFilled, CloudOutlined, LoadingOutlined,
    EditOutlined
} from '@ant-design/icons'
import 'boxicons'
import s from './Story_style.module.css'
// importing components
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Page from './Page'

// Delete later --------------------------------
import Card from './Card'
import cat from '../../assets/images/candy.jpg'

function DisplayStory() {
    const navigate = useNavigate()
    const auth = localStorage.getItem('user-info')
    const isStoryExist = localStorage.getItem('story')

    // Save & Fave buttons
    const [isSaved, setIsSaved] = useState(false)
    const [save, setSave] = useState(<CloudOutlined />)

    const [isFaved, setIsFaved] = useState(false)
    const [fave, setFave] = useState(<HeartOutlined />)

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

    // Edit title modal
    //const titleRef = useRef(null);
    const [title, setTitle] = useState("Story Title")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => {
        setIsModalOpen(true)
    }
    async function handleOk(){
        try {
            const requestBody = {
                title: document.querySelector('.changeTitle').value,
                Id: story.Id,
            }
            console.log("body: " , requestBody)
            const response = await fetch(`${process.env.REACT_APP_url}/children/stories`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(requestBody),
                credentials: 'include',
            })
            const data = await response.json()
            console.log(data)
            if(!response.ok){
                throw new Error(`Error in changing story title`)
            }
            console.warn("Story title changed successfully.")
            setTitle(newTitle)
        } catch (e) {
            console.error('Error:', error)
        }
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    // ======================= Flipping Book ==========================
    // const prevBtn = useRef(null);
    // const nextBtn = useRef(null);

    // const book = useRef(null);
    // const ppr1 = useRef(null);
    // const ppr2 = useRef(null);
    // const ppr3 = useRef(null);

    // const storyTitle = useRef(null);
    // const serv = useRef(null);

    // const [currentPage, setCurrentPage] = useState(1);
    // ===================== Flipping Book END =======================

    const [story, setStory] = useState(null) //state item to store fetched story
    const [isLoading, setIsLoading] = useState(true) //Loading API fetching

    //if there's no story in the local storage, redirect to main page
    useEffect(() => {
        if (isStoryExist === null) {
            navigate('/')
        }
    }, [])

    // ======================= Flipping Book ==========================

    // const [numOfPages, setNumOfPages] = useState(1)
    // const [maxLocation, setMaxLocation] = useState(2)

    // let numOfPages = 3;       /////////////// Must change (number of scenes + 2 cover and fin)
    // let maxLocation = numOfPages + 1;

    // function openBook() {
    //     book.current.style.transform = "translateX(50%)"
    //     prevBtn.current.style.transform = "translateX(-200px)"
    //     nextBtn.current.style.transform = "translateX(200px)"
    //     storyTitle.current.style.transform = "translateX(-11.3rem)"
    //     { auth ? serv.current.style.transform = "translateX(11.3rem)" : null }
    // }

    // function closeBook(isAtBeginning) {
    //     if (isAtBeginning) {
    //         book.current.style.transform = "translateX(0)"
    //     } else {
    //         book.current.style.transform = "translateX(100%)"
    //     }
    //     prevBtn.current.style.transform = "translateX(0)"
    //     nextBtn.current.style.transform = "translateX(0)"
    //     storyTitle.current.style.transform = "translateX(0)"
    //     { auth ? serv.current.style.transform = "translateX(0)" : null }
    // }

    // function nextPage() {
    //     if (currentPage < maxLocation) {
    //         switch (currentPage) {
    //             case 1:
    //                 openBook();
    //                 ppr1.current.classList.add(s.flipped);
    //                 ppr1.current.style.zIndex = 1;
    //                 break;
    //             case 2:
    //                 ppr2.current.classList.add(s.flipped);
    //                 ppr2.current.style.zIndex = 2;
    //                 break;
    //             case 3:
    //                 ppr3.current.classList.add(s.flipped);
    //                 ppr3.current.style.zIndex = 3;
    //                 closeBook();
    //                 break;
    //             default:
    //                 throw new Error("unknow state");
    //         }
    //         setCurrentPage(currentPage + 1);
    //     }
    // }

    // function prevPage() {
    //     if (currentPage > 1) {
    //         switch (currentPage) {
    //             case 2:
    //                 closeBook(true);
    //                 ppr1.current.classList.remove(s.flipped);
    //                 ppr1.current.style.zIndex = 3;
    //                 break;
    //             case 3:
    //                 ppr2.current.classList.remove(s.flipped);
    //                 ppr2.current.style.zIndex = 2;
    //                 break;
    //             case 4:
    //                 openBook();
    //                 ppr3.current.classList.remove(s.flipped);
    //                 ppr3.current.style.zIndex = 1;
    //                 break;
    //             default:
    //                 throw new Error("unknow state");
    //         }
    //         setCurrentPage(currentPage - 1);
    //     }
    // }

    // ===================== Flipping Book END =======================

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
                Id: story_data.Id,
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
                    setStory({ ...story, Id: data.story[0].Id })
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
                const response = await fetch(`${process.env.REACT_APP_url}/children/stories?id=${story.Id}`, {
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
                try {
                    console.warn("Adding Story to Favorites...")
                    const response = await fetch(`${process.env.REACT_APP_url}/children/stories/favorite?id=${story.Id}`, {
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
                    const response = await fetch(`${process.env.REACT_APP_url}/children/stories/favorite?id=${story.Id}`, {
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

    if (story) {
        return (
            <>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#8993ed',
                        }
                    }}>
                    <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
                    <Modal title="Edit Title" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Input className="changeTitle" placeholder="Enter new title here" />
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
                                            <h2>{`#Scenes: ${story.scenesNum}`}</h2>
                                        </div>

                                        {auth &&
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