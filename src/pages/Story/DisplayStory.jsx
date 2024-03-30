import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ConfigProvider, Button, Spin } from 'antd'
import { LeftOutlined, RightOutlined, CloseOutlined, HeartOutlined, HeartFilled, CloudFilled, CloudOutlined } from '@ant-design/icons'
import 'boxicons'
import s from './Story_style.module.css'
// importing components
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Page from './Page'
import HTMLFlipBook from 'react-pageflip';

// Delete later --------------------------------
import Card from './Card'
import cat from '../../assets/images/candy.jpg'

function DisplayStory() {
    const navigate = useNavigate()
    const auth = localStorage.getItem('user-info')
    const isStoryExist = localStorage.getItem('story_content') //To check if there's a story in the local storage
    // ======================= Flipping Book ==========================
    const prevBtn = useRef(null);
    const nextBtn = useRef(null);

    const book = useRef(null);
    const ppr1 = useRef(null);
    const ppr2 = useRef(null);
    const ppr3 = useRef(null);

    const storyTitle = useRef(null);
    const serv = useRef(null);

    const [currentPage, setCurrentPage] = useState(1);
    // ===================== Flipping Book END =======================


    const [story, setStory] = useState(null) //state item to store fetched story
    const [isLoading, setIsLoading] = useState(true) //Loading API fetching

    //if there's no story in the local storage, redirect to main page
    useEffect(() => {
        if(isStoryExist===null){
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

    // useEffect hook to fetch data after the component mounts. ensuring the effect runs only once on initial render.
    useEffect(() => {
        // Get story result
        setIsLoading(true) //Loading page content to be fetched
        const story_data = JSON.parse(localStorage.getItem('story_content'))
        setStory(story_data)
        setIsLoading(false) //When data is fetched, set loading to false
    }, []);

    function displayBase64Images(img) {
        return `data:image/jpeg;base64,${img}`
    }

    // Save & Fave buttons
    const [save, setSave] = useState(<CloudOutlined />)
    const [isSaveToggled, setIsSaveToggled] = useState(false)
    // const handleSaveClick = () => {
    //     setSave(isSaveToggled ? <CloudFilled /> : <CloudOutlined />) // Update attribute based on the toggle state
    // }

    async function saveStory(){
        console.warn("Saving")
        const requestBody = {
            title: story.title,
            language: 'en', //Edit laterrrrrrrrrr
            prompt: story.prompt,
            story_text: story.story_text,
            image_url: story.image_url,
            start_time: story.start_time,
            end_time: story.end_time,
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_url}/children/stories/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            })
            
            if(response.ok){
                setIsSaveToggled(true)
                // setSave(isSaveToggled ? <CloudFilled /> : <CloudOutlined />)
                setSave(<CloudFilled />)
                console.log("Successfully Saved!!")
            } else {
                console.warn("Response recieved but not OK")
            }
        } catch(e) {
            console.error('Error occured while saving story, ',e)
        }
    }

    const [fave, setFave] = useState(<HeartOutlined />)
    const [isFaveToggled, setIsFaveToggled] = useState(false)
    const handleFaveClick = () => {
        setIsFaveToggled(!isFaveToggled); // Toggle the state on each click
        setFave(isFaveToggled ? <HeartFilled /> : <HeartOutlined />) // Update attribute based on the toggle state
    }

    return (
        <>
            <div className={s.body}>
                <Navbar />
                <div className={s.wrapper}>
                    <ConfigProvider //change color theme
                        theme={{
                            token: {
                                colorPrimary: '#96CCC0',
                                fontSize: 16,
                                sizeStep: 2,
                            }
                        }} >

                        {isLoading ?
                            <Spin size="large" />
                            :
                            <>
                                <div className={s.header}>
                                    <div className={s.titles}>
                                        <h1>{`Story title: ${story.title}`}</h1>
                                        <h2>{`#Scenes: ${story.story_text.length}`}</h2>
                                    </div>

                                    {auth &&
                                        <div className={s.buttons}>
                                            <Button onClick={saveStory} size='large' icon={save} type='default'></Button>
                                            <Button onClick={handleFaveClick} size='large' icon={fave} type='default' disabled></Button>
                                        </div>
                                    }
                                </div>
                                
                                <div className={s.scenes_cont}>
                                    {story.story_text.map((item, index) => (
                                        <Card img={displayBase64Images(story.image_url[index])} text={item} />
                                    ))}
                                </div>
                            </>
                        }
                    </ConfigProvider>
                </div>
            </div> {/* body */}
            <Footer />
        </>
    )
}

export default DisplayStory