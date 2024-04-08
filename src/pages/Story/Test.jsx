import React, { useRef, useState, useEffect } from "react"
import s from './Test_s.module.css'
import 'boxicons'
import { Link, useNavigate } from 'react-router-dom'
import { ConfigProvider, Button, Spin } from 'antd'
import { LeftOutlined, RightOutlined, CloseOutlined, HeartOutlined, HeartFilled, CloudFilled, CloudOutlined } from '@ant-design/icons'

//Delete Later =======================
import randomData from './exampleStory.json'

export default function Test() {
    const data = randomData["story"][0]

    console.log("Raw Data: ", data)

    const [numOfPages, setNumOfPages] = useState(data.images.length + 2)
    const [maxLocation, setMaxLocation] = useState(numOfPages+1)

    const prevBtn = useRef(null)
    const nextBtn = useRef(null)

    const book = useRef(null)
    const ppr1 = useRef(null)
    const ppr2 = useRef(null)
    const ppr3 = useRef(null)

    const storyTitle = useRef(null)
    const serv = useRef(null)

    const [currentPage, setCurrentPage] = useState(1)
    const [story, setStory] = useState(null) //state item to store fetched story

    function openBook() {
        book.current.style.transform = "translateX(50%)"
        prevBtn.current.style.transform = "translateX(-200px)"
        nextBtn.current.style.transform = "translateX(200px)"
        storyTitle.current.style.transform = "translateX(-11.3rem)"
        // { auth ? serv.current.style.transform = "translateX(11.3rem)" : null }
        serv.current.style.transform = "translateX(11.3rem)"
    }

    function closeBook(isAtBeginning) {
        if (isAtBeginning) {
            book.current.style.transform = "translateX(0)"
        } else {
            book.current.style.transform = "translateX(100%)"
        }
        prevBtn.current.style.transform = "translateX(0)"
        nextBtn.current.style.transform = "translateX(0)"
        storyTitle.current.style.transform = "translateX(0)"
        // { auth ? serv.current.style.transform = "translateX(0)" : null }
        serv.current.style.transform = "translateX(0)"
    }

    function nextPage() {
        if (currentPage < maxLocation) {
            switch (currentPage) {
                case 1:
                    openBook();
                    ppr1.current.classList.add(s.flipped);
                    ppr1.current.style.zIndex = 1;
                    break;
                case 2:
                    ppr2.current.classList.add(s.flipped);
                    ppr2.current.style.zIndex = 2;
                    break;
                case 3:
                    ppr3.current.classList.add(s.flipped);
                    ppr3.current.style.zIndex = 3;
                    closeBook();
                    break;
                default:
                    throw new Error("unknow state");
            }
            setCurrentPage(currentPage + 1);
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            switch (currentPage) {
                case 2:
                    closeBook(true);
                    ppr1.current.classList.remove(s.flipped);
                    ppr1.current.style.zIndex = 3;
                    break;
                case 3:
                    ppr2.current.classList.remove(s.flipped);
                    ppr2.current.style.zIndex = 2;
                    break;
                case 4:
                    openBook();
                    ppr3.current.classList.remove(s.flipped);
                    ppr3.current.style.zIndex = 1;
                    break;
                default:
                    throw new Error("unknow state");
            }
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <>
            <ConfigProvider //change color theme
                theme={{
                    token: {
                        colorPrimary: '#96CCC0',
                        fontSize: 16,
                        sizeStep: 2,
                    }
                }} >
                <div className={s.body}>
                    <div className={s.story_wrapper}>
                        <Button
                            className={s.arrow_btn}
                            id="prev-btn"
                            ref={prevBtn}
                            type="primary"
                            size="large"
                            onClick={prevPage} ><LeftOutlined /></Button>

                        <div className={s.story_content}>
                            <div className={s.story_header}>
                                <div className={s.title} ref={storyTitle}>
                                    <Link to={() => { navigate(-1) }}>
                                        <CloseOutlined style={{ fontSize: '25px', color: '#494C4C' }} />
                                    </Link>
                                    <h2>Story Title</h2>
                                </div>
                                <div className={s.services} ref={serv}>
                                    <box-icon name='heart' size='30px' color="#494C4C" ></box-icon>
                                    <box-icon name='bookmark' size='30px' color="#494C4C" ></box-icon>
                                </div>

                            </div>

                            <div className={s.book_container} ref={book}>
                                {/* Paper 1 */}
                                <div className={s.paper} id={s.p1} ref={ppr1}>
                                    <div className={s.front}>
                                        <div className={s.front_content}>
                                            <h1>Cover Page</h1>
                                            <img src={data.images[0]} alt="Cover" />
                                        </div>
                                    </div>
                                    <div className={s.back}>
                                        <div className={s.back_content}>
                                            <h3>{data.text[0]}</h3>
                                        </div>
                                    </div>
                                </div>
                                {/* Paper 2 */}
                                <div className={s.paper} id={s.p2} ref={ppr2}>
                                    <div className={s.front}>
                                        <div className={s.front_content}>
                                            <h1>Front 2</h1>
                                            <img src={data.images[0]} alt="Cover" />
                                        </div>
                                    </div>
                                    <div className={s.back}>
                                        <div className={s.back_content}>
                                            <h3>{data.text[1]}</h3>
                                        </div>
                                    </div>
                                </div>
                                {/* Paper 3 */}
                                <div className={s.paper} id={s.p3} ref={ppr3}>
                                    <div className={s.front}>
                                        <div className={s.front_content}>
                                            <img src={data.images[1]} alt="Cover" />
                                        </div>
                                    </div>
                                    <div className={s.back}>
                                        <div className={s.back_content}>
                                            <h1>Back 3</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button
                            className={s.arrow_btn}
                            id="next-btn"
                            ref={nextBtn}
                            type="primary"
                            size="large"
                            onClick={nextPage} ><RightOutlined /></Button>
                    </div>
                </div>
            </ConfigProvider>
        </>
    )
}