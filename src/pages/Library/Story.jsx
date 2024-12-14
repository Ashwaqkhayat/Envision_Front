import React, { useState } from "react"
import s from './Story_style.module.css'
import { useNavigate } from "react-router-dom"
import { ConfigProvider, Spin } from 'antd'

function Story(props) {
    let storyId = props.content.story.id
    const [isLoading, setIsLoading] = useState(false)
    const [story, setStory] = useState(false)

    function displayImages(img) {
        return `data:image/jpeg;base64,${img}`
    }

    const extractContent = (str) => {
        //Convert recieved urls to JSON array of strings
        return JSON.parse("[" + str.slice(1, -1) + "]")
    }

    async function openStory() {
        try {
            setIsLoading(true)
            console.warn("Getting story data...")
            const response = await fetch(`${process.env.REACT_APP_url}/children/stories/?id=${storyId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                let story = {...data.story,
                is_saved: true }

                localStorage.setItem('story', JSON.stringify(story))
                // console.log("Story is fetcheddd successfully ", data)
                setIsLoading(false)
                navigate('/Story')
            } else {
                throw new Error("Response is recieved but not ok..", response.status)
            }
        } catch (e) {
            setIsLoading(false)
            console.error("Error occured, try again later: ", e)
        }
    }
    // function openStory() {
    //     localStorage.setItem("story", JSON.stringify({
    //         title: storyTitle,
    //         language: content.language,
    //         prompt: content.prompt,
    //         story_ar: content.story_ar,
    //         story_en: content.story_en,
    //         story_images: content.story_images,
    //         start_time: content.start_time,
    //         end_time: content.end_time,
    //         is_favorite: content.is_favorite,
    //         is_saved: true,
    //         id: content.id,
    //         story_questions: [],
    //     }))
    //     navigate('/Story')
    // }

    const navigate = useNavigate()
    const content = props.content.story
    let storyTitle = content.title
    let storyImages = content.story_images
    // let storyTexts = content.language == "en" ? content.story_en : content.story_ar
    let cover = ''
    if (storyImages[1] !== undefined || storyImages[1] != null) {
        cover = displayImages(storyImages[1])
    }
    // let scNum = storyTexts.length

    if (content != null) {
        return (
            <ConfigProvider
                theme={{
                    components: { Spin: { colorPrimary: '#8993ED' } },
                    token: { colorPrimary: '#76A795' }
                }}>
                <Spin spinning={isLoading} size="large">
                    <div className={s.container} onClick={openStory}>
                        <img src={cover} alt="cover image" />
                        <h3>{storyTitle}</h3>
                    </div>
                </Spin>
            </ConfigProvider>
        )
    }
}

export default Story