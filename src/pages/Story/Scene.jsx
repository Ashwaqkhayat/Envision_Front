import React from 'react'
import s from './Story_style.module.css'
import { Button } from 'antd'

function Scene({ audio, scene, img, playNarration }) {
    // Audio 
    const playAudio = async () => {
        if (!localStorage.getItem('narrationExist') || audio === undefined || audio === null) {
            await playNarration()  
        } else {
            let audio2 = new Audio(audio)
            audio2.play()
        }
    }

    return (
        <>
            <div className={s.content_wrapper}>
                <div className={s.text_cont}>
                    <h2 style={{ position: 'relative' }}>
                        {scene}

                        <Button
                            className={s.narration_btn}
                            size='default'
                            style={{ border: 'none' }}
                            onClick={playAudio}
                            icon={<box-icon color="#d1d1d1" size='30px' name='volume-full' />}
                        />
                    </h2>
                </div>
                <div>
                    <img src={img} className={s.slider_img} alt='Scene Image' />
                </div>
            </div>
        </>
    )
}

export default Scene