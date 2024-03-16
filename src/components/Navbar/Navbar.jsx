import React from "react";
import s from './Navbar_style.module.css'

//NAvigations using buttons
import { useNavigate, Link } from "react-router-dom";
//Antd buttons
import { ConfigProvider, Button, Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons';
//importing images
import logo from '../../assets/images/base.png'

export default function Navbar() {
    
    // navigate to other pages using UseNavigate
    const navigate = useNavigate()
    const auth = localStorage.getItem('user-info')

    function logOut(){
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className={s.nav}>
            <div className={s.nav_left}>
                <a href='/'><img src={logo} className={s.nav_logo} alt="Envision Logo" /></a>
                <Link to='/' className={s.nav_title}>Envision</Link>
            </div>

            <div className={s.nav_right}>
                <Flex gap="small" wrap="wrap">
                <ConfigProvider //change color theme
                theme={{
                    token: {
                        sizeStep: 7,
                        colorPrimary: '#8993ED',
                        colorBgContainer: 'rgba(73, 76, 76, 0)',
                    }
                }} >
                    
                    {/* If user is authinticated/logged in then show the profile, otherwise show the login/register btns */}
                    {auth? 
                        <>
                        <Link onClick={logOut}> Log out </Link>
                        <Button 
                        type="primary" 
                        shape="round" 
                        size="large"
                        icon={ <UserOutlined style={{ fontSize: '20px'}} /> }
                        > My Profile </Button>
                        </>
                    :
                        <>
                        <Button
                        className={s.nav_login}
                        type="primary"
                        size="large"
                        onClick={() => navigate('/Signin') }
                        >Login</Button>

                        <Button 
                        className={s.nav_register}
                        size="large"
                        onClick={() => navigate('/Signup')}
                        >Register</Button>
                        </>
                    }

                </ConfigProvider>
                </Flex>
            </div>
        </div>
    )
}