import React from "react"
import s from './ViewChild_style.module.css'
import { ConfigProvider, Button } from 'antd'
import { useNavigate } from 'react-router-dom' 

function LibraryStory(props) {
    const navigate = useNavigate()
    let content = {...props.content, is_saved: true}
    
    const extractContent = (str) => {
        //Convert recieved urls to JSON array of strings
        return JSON.parse("[" + str.slice(1, -1) + "]")
    }

    return (
        <div className={s.story_cont}>
            <h4>{content.title}</h4>
            <div className={s.btn_cont}>
                <ConfigProvider theme={{ token: { colorPrimary: '#8993ED' } }} >
                    <Button
                        className={s.btn}
                        type="primary"
                        size="small"
                        onClick={() => {
                            content = {...content, 
                                story_text: extractContent(content.story_text), 
                                story_images: extractContent(content.story_images)
                            }
                            // store story in localStorage for displaying
                            localStorage.setItem('story', JSON.stringify(content))
                            // Navigate to display story
                            navigate('/Story')
                        }}
                    >Read</Button>
                </ConfigProvider>
            </div>
        </div>
    )
}

export default LibraryStory