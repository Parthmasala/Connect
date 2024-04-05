import React from 'react';
import './index.scss';
import { IoIosClose } from "react-icons/io";

export default function Search({setIsSearch, setSearchInput}) { 
    return (
        <div className='search-main'>
            <input 
                placeholder='Search'
                onChange={(event) => setSearchInput(event.target.value)}
            />
            <IoIosClose className= "close-icon" size = {20} 
            onClick = {() => {
                setIsSearch(false);
                setSearchInput("");
        }
            }
            />
        </div>
        )
}

