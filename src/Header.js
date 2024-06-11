import React from 'react'

const Header = (props) => {
    return (
        <header className="bg-gray-800 text-center text-white text-5xl text-center p-8">
            <h1>{props.title}</h1>
        </header>
    )
}
// Header.defaultProps={
//  title:"React Development"
// }
export default Header
