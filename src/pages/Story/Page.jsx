import React from "react"
import s from './Story_style.module.css'

function Page(props) {
    return (
        <>
            <div className={s.paper} id={s.p1} ref={ppr1}>
                <div className={s.front}>
                    <div className={s.front_content}>
                        <h1>Cover Page</h1>
                    </div>
                </div>
                <div className={s.back}>
                    <div className={s.back_content}>
                        <h1>Back 1</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page