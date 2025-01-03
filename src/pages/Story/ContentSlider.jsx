import React, { useState, useEffect, useRef } from 'react'
import s from './Story_style.module.css'
import { Button, message } from 'antd'
import Scene from './Scene'
// translation hook
import { useTranslation } from 'react-i18next';

function ContentSlider({ language, storyTexts, storyImg }) {
    const { t, i18n } = useTranslation()
    // Prepare story data
    let storyText_ar = storyTexts.story_ar // <-- Array
    let storyText_en = storyTexts.story_en // <-- Array

    const storyText = language == "en" ? storyText_en : storyText_ar

    //this.setState({ myArray: [...this.state.myArray, 'new value'] }) //simple value
    let [storyUrls, setStoryUrls] = useState([])

    // Set images of the story =========================================
    useEffect(() => {
        storyImg.map(scene => {
            setStoryUrls(storyUrls => [...storyUrls, displayBase64Images(scene)])
        })
    }, [])

    // Scenes Navigation ===============================================
    const [sceneIndex, setSceneIndex] = useState(0)
    function showPrevScene() {
        setSceneIndex(index => {
            // if (index === 0) return storyText.length - 1
            return index - 1
        })
    }
    function showNextScene() {
        setSceneIndex(index => {
            // if (index === storyText.length - 1) return 0
            return index + 1
        })
    }

    // Messages ========================================================
    const [messageApi, contextHolder] = message.useMessage()
    const info = (msg, type, dur) => {
        messageApi.open({
            type: type,
            content: msg,
            duration: dur,
            style: {
                fontSize: '18px',
                justifyContent: 'center',
            },
        })
    }

    // Narrate Story ===================================================
    const [narration, setNarration] = useState([])
    async function playNarration() {
        try {
            info(t("story load voice"), "loading", 0.7)
            // Request Audio Narration
            const response = await fetch(`${process.env.REACT_APP_url}/children/stories/narrate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ story_text: storyText, language: language }),
                credentials: 'include',
            })
            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('narrationExist', "true")
                setNarration(data.narrations)
                setTimeout(info(t("story ready voice"), "success", 3.5), 1000)
            } else {
                throw new Error("Response recieved but not OK: ", response.status)
            }
        } catch (e) {
            setTimeout(messageApi.destroy, 1500)
            console.error('Error occured while requesting narration, ', e)
            info(t("server req error"), "error", 3.5)
        }
    }

    // Content Formatting ==============================================
    function displayBase64Images(img) {
        return `data:image/jpeg;base64,${img}`
    }
    const extractContent = (str) => {
        //Convert recieved urls to JSON array of strings
        return JSON.parse("[" + str.slice(1, -1) + "]")
    }

    if (storyUrls.length > 0 && storyText) {
        return (
            <>
                {contextHolder}
                <div className={s.content_cont}>
                    <div className={s.map_cont} >
                        {storyText.map((scene, index) => (
                            <div key={scene} style={{
                                flexShrink: 0,
                                width: '100%',
                                translate: `${-100 * sceneIndex}%`,
                                transition: 'translate 0.5s ease-in-out',
                            }}>
                                <Scene audio={narration[index]} scene={scene} img={storyUrls[index]} playNarration={playNarration} />
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
                                <div className={s.openingq_start_text} style={{ borderRight: '#a8a8a8 solid 2px', direction: i18n.dir() }}>
                                    <h1>{t("openQ end")}</h1>
                                    <p>{t("openQ desc")}</p>
                                    <Button
                                        style={{ width: '150px', backgroundColor: '#8993ED' }}
                                        size='large'
                                        type='primary'
                                        onClick={showNextScene}
                                    >{t("openQ start btn")}</Button>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <div
                                        className={s.opq_img_cont}
                                        style={{
                                            position: 'absolute',
                                            top: '4rem',
                                            right: '5.5rem',
                                            transform: 'rotate(5deg)'
                                        }}>
                                        <img
                                            src={storyUrls[0]}
                                            className={s.slider_img}
                                            alt='Scene Image'
                                        />
                                    </div>
                                    <div
                                        className={s.opq_img_cont}
                                        style={{
                                            position: 'absolute',
                                            top: '10rem',
                                            left: '5rem',
                                            transform: 'rotate(-10deg)'
                                        }}>
                                        <img
                                            src={storyUrls[1]}
                                            className={s.slider_img}
                                            alt='Scene Image'
                                        />
                                    </div>
                                    <div
                                        className={s.opq_img_cont}
                                        style={{
                                            position: 'absolute',
                                            bottom: '4rem',
                                            right: '5.5rem'
                                        }}>
                                        <img
                                            src={storyUrls[2]}
                                            className={s.slider_img}
                                            alt='Scene Image'
                                        />
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
                                <div className={s.openingq_text} style={{ borderRight: '#a8a8a8 solid 2px', direction: i18n.dir() }}>
                                    <h3>{t("openQ1")}</h3>
                                    <h3>{t("openQ2")}</h3>
                                    <h3>{t("openQ3")}</h3>
                                    <h3>{t("openQ4")}</h3>
                                    <h3>{t("openQ5")}</h3>
                                    <h3>{t("openQ6")}</h3>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <div
                                        className={s.opq_img_cont}
                                        style={{
                                            position: 'absolute',
                                            top: '4rem',
                                            right: '5.5rem',
                                            transform: 'rotate(5deg)'
                                        }}>
                                        <img
                                            src={storyUrls[0]}
                                            className={s.slider_img}
                                            alt='Scene Image'
                                        />
                                    </div>
                                    <div
                                        className={s.opq_img_cont}
                                        style={{
                                            position: 'absolute',
                                            top: '10rem',
                                            left: '5rem',
                                            transform: 'rotate(-10deg)'
                                        }}>
                                        <img
                                            src={storyUrls[1]}
                                            className={s.slider_img}
                                            alt='Scene Image'
                                        />
                                    </div>
                                    <div
                                        className={s.opq_img_cont}
                                        style={{
                                            position: 'absolute',
                                            bottom: '4rem',
                                            right: '5.5rem'
                                        }}>
                                        <img
                                            src={storyUrls[2]}
                                            className={s.slider_img}
                                            alt='Scene Image'
                                        />
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
            </>
        )
    }
}


export default ContentSlider