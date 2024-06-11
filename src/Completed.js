import React from 'react';
import { FaClock } from "react-icons/fa6";

const Completed = ({ resultData, handleResult ,items}) => {
    if (!resultData || !Array.isArray(resultData) || resultData.length === 0) {
        return (
            <div className="">
                <p className="ml-16 my-8 text-2xl font-mono "> Result is empty</p>
                <button
                    className="p-2 mx-32  text-xl border-2 rounded-lg shadow-xl 
                    hover:bg-gray-600 hover:transition duration-150 hover:text-white"
                    onClick={handleResult}
                >Result</button>
            </div>
        );
    }
    
    
    
    return (
        <div  >
            <ul>
                {resultData.map((item,index) => (
                    <li
                        key={index}
                        className="m-8 text-xl border-2 max-w-xs p-4  shadow-xl hover:rounded-xl
                             hover:transition duration-150"
                    >
                        <label htmlFor="result">{item.value}</label>
                        <label className=" flex text-s" 
                        htmlFor="addtime"><FaClock
                         className="text-xl p-1 mr-2"/>{item.time}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Completed;