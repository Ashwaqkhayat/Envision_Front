import React from "react";
import d from "./CreateStory_style.module.css"
import { Button } from 'antd';
import Progress from "react-circle-progress-bar"

function CreateStory3(){
    return (
        <>
        <div className={d.content}>
            <h2>We are working on your story!</h2>
            <Progress className={d.prog_circle} progress={75} strokeWidth={20} gradient={[{stop: 0.0, color: '#81C3B4'}, {stop: 1, color: '#8993ED'}]}/>
            <Button className={d.storyCancel} type="primary" danger> Cancel Story </Button>
        </div>
        </>
    )
}

export default CreateStory3