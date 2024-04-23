import React from "react"
import s from './Story_style.module.css'
import { useNavigate } from "react-router-dom";

function Story(props) {
    function displayImages(img) {
        return `data:image/jpeg;base64,${img}`
    }

    const extractContent = (str) => {
        //Convert recieved urls to JSON array of strings
        return JSON.parse("[" + str.slice(1, -1) + "]")
    }

    function openStory() {
        localStorage.setItem("story", JSON.stringify({
            title: storyTitle,
            language: content.language,
            prompt: content.prompt,
            story_ar: content.story_ar,
            story_en: content.story_en,
            story_images: content.story_images,
            start_time: content.start_time,
            end_time: content.end_time,
            is_favorite: content.is_favorite,
            is_saved: true,
            id: content.id,
            story_questions: [],
        }))
        navigate('/Story')
    }

    const navigate = useNavigate()
    const content = props.content
    let storyTitle = content.title
    let storyImages = content.story_images
    let storyTexts = content.language == "en" ? content.story_en : content.story_ar 
    // let cover = displayImages(storyImages[0][0])
    let scNum = storyTexts.length

    return (
        <div className={s.container} onClick={openStory}>
            {/* <img src={cover} alt="cover image" /> */}
            <h3>{storyTitle}</h3>
        </div>
    )
}

export default Story