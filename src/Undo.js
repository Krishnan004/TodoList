import React from 'react'

const Undo = ({handleUndo}) => {
    return (
        <div className="mx-40">
            <button className="p-2 text-xl border-2 rounded-lg shadow-xl hover:bg-gray-600 hover:transition duration-150 hover:text-white"  onClick={handleUndo}>Undo</button>
        </div>

    )
}

export default Undo
