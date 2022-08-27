import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 


const SearchBox = () => {
  const navigate = useNavigate();

    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
           navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

    return (
        <form onSubmit={searchHandler} >
            <div style={{backgroundColor: '#fcbb6a'}} className="input-group rounded">
                <input
                style={{maxWidth: '93%'}}
                    type="text"
                    id="search_field"
                    className="form-control py-3"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="input-group-append pt-2">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search fa-2x" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default SearchBox