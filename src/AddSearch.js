import React from 'react'

const AddSearch = ({search,setSearch}) => {
    return (
        <form className=" p-8" onSubmit={(e)=>e.preventdefault}>
            <input 
            className="w-72 border-2  rounded-xl shadow-xl "
            placeholder="Search"
            type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            />
        </form>
    )
}

export default AddSearch
