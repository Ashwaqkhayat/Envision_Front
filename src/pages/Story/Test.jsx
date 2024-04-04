import React, { useRef, useState, useEffect } from "react"
import s from './Test_s.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { ConfigProvider, Button, Spin } from 'antd'
import { LeftOutlined, RightOutlined, CloseOutlined, HeartOutlined, HeartFilled, CloudFilled, CloudOutlined } from '@ant-design/icons'

//Delete Later =======================
import randomData from './data.json'

export default function Test() {
    const data = randomData["data"]
    return (
        <>
            <div>
                No
            </div>
        </>
    )
}