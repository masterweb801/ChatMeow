import React from 'react'
import { Circles, TailSpin } from "react-loader-spinner";

const Loader = (props) => {
    if (props.load === "main") {
        return (
            <div className='loader'
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: props.height,
                }}
            >
                <Circles
                    color="#0082e6"
                    height={props.size}
                    width={props.size}
                    timeout={5000}
                />
            </div>
        )
    }
    else {
        return (
            <div className='loader'
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: props.height,
                }}
            >
                <TailSpin
                    color="#0082e6"
                    height={props.size}
                    width={props.size}
                    timeout={5000}
                />
            </div>
        )
    }
}

export default Loader