import React, { useEffect } from "react"
import { useNavigate } from 'react-router-dom'

function Protected(props) {
    const navigate = useNavigate()
    let Comp = props.Comp
    const auth = localStorage.getItem("user-info")
    useEffect(() => {
        if (!auth) {
            navigate('/')
        }
    }, [])
    if (auth) {
        return (
            <div>
                <Comp />
            </div>
        )
    }
}

export default Protected