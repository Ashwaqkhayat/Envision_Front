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
            story_text: storyTexts,
            story_images: storyImages,
            language: content.language,
            prompt: content.prompt,
            start_time: content.start_time,
            end_time: content.end_time,
            is_favorite: content.is_favorite,
            is_saved: true,
            Id: content.Id,
        }))
        navigate('/Story')
    }

    const navigate = useNavigate()
    const content = props.content
    let storyTitle = content.title
    let storyImages = extractContent(content.story_images)
    let storyTexts = extractContent(content.story_text)
    let cover = displayImages(storyImages[0])
    let scNum = storyTexts.length

    return (
        <div className={s.container} onClick={openStory}>
            <img src={cover} alt="cover image" />
            <h3>{storyTitle}</h3>
        </div>
    )
}

export default Story