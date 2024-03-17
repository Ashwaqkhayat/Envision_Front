import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function NotFoundPage() {
    const navigate = useNavigate();
    return(
        <div>
            {useEffect(() => {
                navigate('/')
            }, [])}
        </div>
    )
}