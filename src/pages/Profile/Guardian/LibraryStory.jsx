import React, { useEffect, useState } from "react"
import s from './ViewChild_style.module.css'
import { ConfigProvider, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
// translation hook
import { useTranslation } from 'react-i18next'

function LibraryStory(props) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    let content = { ...props.content, is_saved: true }
    const [cover, setCover] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const extractContent = (str) => {
        //Convert recieved urls to JSON array of strings
        return JSON.parse("[" + str.slice(1, -1) + "]")
    }

    useEffect(() => {
        //Extract cover page
        let img = extractContent(props.content.story_images)[1];
        setCover(`data:image/jpeg;base64,${img}`);
    },[])

    async function openChildStory() {
        try {
            setIsLoading(true)
            console.warn("Getting story data...")
            const response = await fetch(`${process.env.REACT_APP_url}/guardians/children/stories?id=${props.content.child_id}&story_id=${props.content.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                let story = {
                    ...data.story,
                    is_saved: true
                }

                localStorage.setItem('story', JSON.stringify(story))
                console.log("Story is fetched successfully ", data)
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

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#8993ED' }, components: { Spin: { colorPrimary: '#8993ED' } } }}  >
            <Spin spinning={isLoading}>
                <div
                    className={s.story_cont}
                    onClick={openChildStory}
                    style={{
                        backgroundImage: `url(${cover})`,
                        backgroundSize: 'cover'
                    }}
                >
                    <h4>{content.title}</h4>
                </div>
            </Spin>
        </ConfigProvider>
    )
}

export default LibraryStory