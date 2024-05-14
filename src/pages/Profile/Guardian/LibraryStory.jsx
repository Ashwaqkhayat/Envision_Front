import React, { useState } from "react"
import s from './ViewChild_style.module.css'
import { ConfigProvider, Button, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'

function LibraryStory(props) {
    const navigate = useNavigate()
    let content = { ...props.content, is_saved: true }
    const [isLoading, setIsLoading] = useState(false)

    const extractContent = (str) => {
        //Convert recieved urls to JSON array of strings
        return JSON.parse("[" + str.slice(1, -1) + "]")
    }

    console.log(props.content.id)

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
                <div className={s.story_cont}>
                    <h4>{content.title}</h4>
                    <div className={s.btn_cont}>
                        <Button
                            className={s.btn}
                            type="primary"
                            size="small"
                            onClick={openChildStory
                                // content = {...content, 
                                //     story_text: extractContent(content.story_text), 
                                //     story_images: extractContent(content.story_images)
                                // }
                                // localStorage.setItem('story', JSON.stringify(content))
                                // navigate('/Story')

                            }
                        >قراءة</Button>
                    </div>
                </div>
            </Spin>
        </ConfigProvider>
    )
}

export default LibraryStory