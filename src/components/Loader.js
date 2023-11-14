import React from 'react'
import { Circles } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className='loader'
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Circles
                color="#0082e6"
                height={70}
                width={70}
                timeout={5000}
            />
        </div>
    )
}

export default Loader