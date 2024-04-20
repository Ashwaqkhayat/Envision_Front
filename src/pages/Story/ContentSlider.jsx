import React, { useState } from 'react'
import s from './Story_style.module.css'
import { Button } from 'antd'

// Temp lines               <-- Delete Later
import candy from '../../assets/images/candy.jpg'

function ContentSlider({ content }) {
    // Prepare story data                                   <-- Edit Later
    const storyText = content.text // <-- Array
    const storyUrls = content.images // <-- Array

    // console.log("text: ", storyText, "images: ", storyUrls)

    // Opening Questions



    const [sceneIndex, setSceneIndex] = useState(0)

    function showPrevScene() {
        setSceneIndex(index => {
            if (index === 0) return content.length - 1
            return index - 1
        })
    }
    function showNextScene() {
        setSceneIndex(index => {
            if (index === content.length - 1) return 0
            return index + 1
        })
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

    function displayBase64Images(img) {
        return `data:image/jpeg;base64,${img}`
    }
    const extractContent = (str) => {
        //Convert recieved urls to JSON array of strings
        return JSON.parse("[" + str.slice(1, -1) + "]")
    }

    return (
        <div className={s.content_cont}>
            <div className={s.map_cont} >
                {storyText.map((scene, index) => (
                    <div key={scene} style={{
                        flexShrink: 0,
                        width: '100%',
                        translate: `${-100 * sceneIndex}%`,
                        transition: 'translate 0.5s ease-in-out',
                    }}>
                        <div className={s.content_wrapper}>
                            <div className={s.text_cont}>
                                <h2 style={{ position: 'relative' }}>
                                    {scene}

                                    <Button
                                        className={s.narration_btn}
                                        size='default'
                                        style={{ border: 'none' }}
                                        // onClick={playNarration}
                                        icon={<box-icon color="#d1d1d1" size='30px' name='volume-full' />}
                                    />
                                </h2>
                            </div>
                            <div>
                                <img src={storyUrls[index]} className={s.slider_img} alt='Scene Image' />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Opening Questions ... */}
                <div style={{
                    opacity: sceneIndex > storyText.length - 1 ? 1 : 0,
                    flexShrink: 0,
                    width: '100%',
                    translate: `${-100 * sceneIndex}%`,
                    transition: 'translate 0.5s ease-in-out',
                }}>
                    <div className={s.content_wrapper} style={{ position: 'relative' }}>
                        <div className={s.openingq_start_text} style={{ borderRight: '#a8a8a8 solid 2px' }}>
                            <h1>The End</h1>
                            <p>Answer the following questions to test your understanding of the story.</p>
                            <Button
                                style={{ width: '150px', backgroundColor: '#8993ED' }}
                                size='large'
                                type='primary'
                                onClick={showNextScene}
                            >Go!</Button>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div
                                className={s.opq_img_cont}
                                style={{
                                    position: 'absolute', top: '4rem', right: '5.5rem', transform: 'rotate(5deg)'
                                }}>
                                <img src={storyUrls[0]} className={s.slider_img} alt='Scene Image' />
                            </div>
                            <div
                                className={s.opq_img_cont}
                                style={{
                                    position: 'absolute', top: '10rem', left: '5rem', transform: 'rotate(-10deg)'
                                }}>
                                <img src={storyUrls[1]} className={s.slider_img} alt='Scene Image' />
                            </div>
                            <div
                                className={s.opq_img_cont}
                                style={{
                                    position: 'absolute', bottom: '4rem', right: '5.5rem'
                                }}>
                                <img src={storyUrls[2]} className={s.slider_img} alt='Scene Image' />
                            </div>
                            {/* <img src={storyUrls[1]} className={s.opq_img} alt='Scene Image' />
                            <img src={storyUrls[2]} className={s.opq_img} alt='Scene Image' /> */}
                        </div>
                    </div>
                </div>

                <div style={{
                    opacity: sceneIndex > storyText.length ? 1 : 0,
                    flexShrink: 0,
                    width: '100%',
                    translate: `${-100 * sceneIndex}%`,
                    transition: 'translate 0.5s ease-in-out',
                }}>
                    <div className={s.content_wrapper} style={{ position: 'relative' }}>
                        <div className={s.openingq_text} style={{ borderRight: '#a8a8a8 solid 2px' }}>
                            <h3>What was the hero’s <span>name?</span></h3>
                            <h3>What was the hero <span>wearing</span>?</h3>
                            <h3>What <span>colors</span> did you see in the story?</h3>
                            <h3>Where did the hero <span>go</span>?</h3>
                            <h3>What <span>happened</span> to the hero?</h3>
                            <h3>What did you <span>benefit</span> from the story?</h3>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div
                                className={s.opq_img_cont}
                                style={{
                                    position: 'absolute', top: '4rem', right: '5.5rem', transform: 'rotate(5deg)'
                                }}>
                                <img src={storyUrls[0]} className={s.slider_img} alt='Scene Image' />
                            </div>
                            <div
                                className={s.opq_img_cont}
                                style={{
                                    position: 'absolute', top: '10rem', left: '5rem', transform: 'rotate(-10deg)'
                                }}>
                                <img src={storyUrls[1]} className={s.slider_img} alt='Scene Image' />
                            </div>
                            <div
                                className={s.opq_img_cont}
                                style={{
                                    position: 'absolute', bottom: '4rem', right: '5.5rem'
                                }}>
                                <img src={storyUrls[2]} className={s.slider_img} alt='Scene Image' />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {sceneIndex > 0 &&
                <Button
                    onClick={showPrevScene}
                    size='large'
                    style={{ left: -100, height: '100px', width: '70px' }}
                    className={s.slider_button}
                    type='primary'
                    icon={<box-icon color="#fff" size='lg' name='chevron-left' />}
                />
            }
            {sceneIndex <= storyText.length &&
                <Button
                    onClick={showNextScene}
                    size='large'
                    style={{ right: -100, height: '100px', width: '70px' }}
                    className={s.slider_button}
                    type='primary'
                    icon={<box-icon color="#fff" size='lg' name='chevron-right' />}
                />
            }
        </div>
    )
}

export default ContentSlider