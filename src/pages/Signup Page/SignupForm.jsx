import React, { useState, useEffect } from "react";
import s from './Signup_style.module.css'
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"

//Navigations using buttons
import { Link, useNavigate } from "react-router-dom";

//import Ant Components
import { ConfigProvider, Spin, Progress, message } from 'antd';
import SignupMain from "./SignupMain";
import SignupChild1 from "./SignupChild1"
import SignupChild2 from "./SignupChild2"
import SignupGuard from "./SignupGuard"

function SignupForm() {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    // if user is logged in/ signed up and tried to enter the signin page, he'll be redirected to the home page!
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/')
        }
    }, [])

    //Antd items
    const [messageApi, contextHolder] = message.useMessage()
    const info = (msg, type) => {
        messageApi.open({
            type: type,
            content: msg,
            duration: 5,
            style: {
                fontSize: '18px',
                justifyContent: 'center',
            },
        })
    }

    //Changing titles and buttons through steps..
    const formTitles = ["مرحبـًـا!", "تبقت خطوة واحدة", "الخطوة الأخيرة"]
    const backBtn = ["إلغاء", "السابق", "السابق"]
    const progressPerc = [30, 60, 100]

    //Change between Pages
    const [page, setPage] = useState(0)

    //Store user's information
    const [mainInfo, setMainInfo] = useState(null)

    const onFinishMainForm = (values) => {
        setMainInfo(values)
        setPage(1)
    }
    const [childInfo, setChildInfo] = useState(null)
    const onFinishChildForm1 = (values) => {
        setChildInfo(values)
        setPage(2)
    }
    const [childInfo2, setChildInfo2] = useState(null)
    const onFinishChildForm2 = (values) => {
        setChildInfo2(values)
        signupChild(values)
    }
    const [guardInfo, setGuardInfo] = useState(null)
    const onFinishGuardForm = (values) => {
        setGuardInfo(values)
        signupGuard(values)
    }

    async function signupGuard(vals) {
        setIsLoading(true)
        const requestBody = {
            email: mainInfo.email.toLowerCase(),
            first_name: vals.first_name,
            last_name: vals.last_name,
            age: vals.age,
            password: mainInfo.password,
            // phone: "" + vals.phone_code + vals.phone_number        <-- Future use
            phone: "+966" + vals.phone_number
        }

        // Display loading message while fetching data
        info('جاري التسجيل..', 'loading')

        // Use fetch to send the POST request to the API
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_url}/guardians/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody),
                    credentials: 'include'
                })
                const data = await response.json()

                if (response.ok) {
                    localStorage.setItem("user-info", JSON.stringify(data))
                    localStorage.setItem("isNewUser", true)
                    console.log('Sign up successful')
                    setIsLoading(false) // Hide loading message
                    setTimeout(() => { navigate('/') }, 1500);
                } else {
                    info(data.error, 'error')
                    setIsLoading(false)
                }
            } catch (error) {
                console.error('Error during sign up:', error)
                info('An error occurred. Please try again later.', 'error')
                setIsLoading(false)
            }
        }
        fetchData()
    }

    async function signupChild(vals) {
        setIsLoading(true)
        const requestBody = {
            email: mainInfo.email.toLowerCase(),
            first_name: childInfo.first_name,
            last_name: childInfo.last_name,
            password: mainInfo.password,
            gender: childInfo.gender,
            favorite_color: vals.faveColor.toLowerCase(),
            birth_date: vals.birth_date.$d
        };

        // Display loading message while fetching data
        info('جاري التسجيل..', 'loading')

        // Use fetch to send the POST request to the API
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_url}/children/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Acccept': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                    credentials: 'include'
                })
                const data = await response.json()

                if (response.ok) {
                    console.log('Sign up successful:', data)
                    setIsLoading(false) // Hide loading message
                    localStorage.setItem("user-info", JSON.stringify(data))
                    localStorage.setItem("isNewUser", true)
                    setTimeout(() => { navigate('/') }, 2000);

                } else {
                    info(data.error, 'error')
                    setIsLoading(false)
                }
            } catch (error) {
                console.error('Error during sign up:', error)
                info('An error occurred. Please try again later.', 'error')
                setIsLoading(false)
            }
        }
        fetchData()
    }

    function getStep(page) {
        if (page === 0) {
            return <SignupMain onFinish={onFinishMainForm} initialValues={mainInfo} />
        } else if (page === 1 && mainInfo.accType === 'child') {
            return <SignupChild1 onFinish={onFinishChildForm1} initialValues={childInfo} />
        } else if (page === 2 && mainInfo.accType === 'child') {
            return <SignupChild2 onFinish={onFinishChildForm2} initialValues={childInfo2} />
        } else if (page === 1 && mainInfo.accType === 'guardian') {
            return <SignupGuard onFinish={onFinishGuardForm} initialValues={guardInfo} />
        } else {
            navigate('/')
        }
    }

    return (
        <>
            <div className={s.body}>
                {contextHolder}
                <Navbar />
                <div className={s.content}>
                    <ConfigProvider //change color theme
                        theme={{
                            token: {
                                colorPrimary: '#8993ED',
                            }
                        }} >
                        <Spin className={s.spin} spinning={isLoading} tip="يتم التسجيل.." size="large">
                            <div className={s.wrapper}>
                                <Progress className={s.prog_bar} percent={progressPerc[page]} showInfo={false} strokeColor='#8993ED' />

                                <Link
                                    className={s.cancel_btn}
                                    onClick={() => {
                                        page == 0 ? navigate('/') : setPage((currPage) => currPage - 1)
                                    }}
                                >{backBtn[page]}
                                </Link>

                                <h1>{formTitles[page]}</h1>

                                {/* Form pages */}
                                {getStep(page)}
                            </div>
                        </Spin>
                    </ConfigProvider>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SignupForm