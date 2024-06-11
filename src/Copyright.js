import React from 'react'

const Copyright = ({length}) => {
    return (
        <div 
        className="w-3/6 bg-gray-800 text-center text-white text-5xl text-center p-8"
        >
            <p>{length} {length<=1?"item":"items"}
            </p>
        </div>
    )
}

export default Copyright
