import '../styles/SearchBar.css';
import { useState } from "react";

export const SearchBar = () => {
    const [cfHandle, setCfHandle] = useState("");

    const onInputChange = (e) => {
        setCfHandle(e.target.value);
    };

    return (
        <div className="search-bar">
            <div className='input-container'>
                <label for='cf-handle'>
                    CF HANDLE
                </label>
                <input id='cf-handle' type="text" onChange={onInputChange} value={cfHandle}/>
            </div>
            <button className='search-btn'>
                What If I Never Brick?
            </button>
        </div>
    )

};