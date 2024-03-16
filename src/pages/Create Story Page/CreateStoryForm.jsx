import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import s from "./CreateStory_style.module.css"

//Import components
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import CreateStory1 from './CreateStory1'
import CreateStory2 from './CreateStory2'
import CreateStory3 from './CreateStory3'

//import Ant Components
import { Progress, message } from 'antd';


function CreateStory() {
    // Define variables
    const navigate = useNavigate()
    const progressPerc = [50, 100]
    const backBtn = ["Cancel", "Previous"]
    const [messageApi, contextHolder] = message.useMessage()
    const info = (msg, type) => {
        messageApi.open({
            type: type,
            content: msg,
        })
    }

    //Change between Steps
    const [step, setStep] = useState(0)

    function getStep(step){
        if(step===0){
            return <CreateStory1 onFinish={onFinishStep1} initialValues={storySpec}/>
        } else if(step===1){
            return <CreateStory2 onFinish={onFinishStep2} initialValues={storyDesc}/>
        } else if(step===2){
            return <CreateStory3/>
        } else {
            navigate('/')
        }
    }

    const [storySpec, setStorySpec] = useState(null)

    const onFinishStep1 = (values) => {
        setStorySpec(values)
        setStep(1)
    }
    const [storyDesc, setStoryDesc] = useState(null)
    const onFinishStep2 = (values) => {
        setStoryDesc(values)
        createStory(values)
        setStep(2)
    }

    async function createStory(vals){
        const request = {
            title: "Story Title",
            prompt: vals.prompt,
            name: storySpec.name,
            gender: storySpec.gender,
            location: storySpec.location,
            emotion: storySpec.emotion,
            language: "en", // Change when arabic is supported
        }
        // Display loading message while fetching data
        info('Loading', 'loading')
        // POST data to API
        try {
            const response = await fetch('https://envision-api-z7cj.onrender.com/children/stories/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(request)
            })

            if (response.ok) {
                const data = await response.json()
                localStorage.setItem("story-prompt", JSON.stringify(data))
                console.log('Story submitted successfully', data)
            } else {
                info('Story submission failed, try again', 'error')
            }
        } catch (error) {
            console.error('Error during story submission:', error)
            info('An error occurred. Please try again later.', 'error')
        }
    }

    return (
        <>
            <div className={s.body}>
                {contextHolder}
                <Navbar />
                <div className={s.container}>
                    <div className={s.wrapper}>
                        {(step===0||step===1) && <Progress className={s.prog_bar} percent={progressPerc[step]} showInfo={false} strokeColor='#8993ED' />}
                        <Link
                            className={s.cancel_btn}
                            onClick={() => { step == 0 ? navigate('/') : setStep((currPage) => currPage - 1) }}
                        > {backBtn[step]}
                        </Link>
                        {(step===0||step===1) && <h1>New Story</h1>}
                        {getStep(step)}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CreateStory