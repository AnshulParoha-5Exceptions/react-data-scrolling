import React, { useState } from 'react'

const Search = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');
    const handleSearch = (e) => {
        onSearch(searchText);
        setSearchText('');
    }
    return (
        <>
            <div className='container'>
                <div className="row alert alert-dark">
                    
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search by username"
                            className='form-control'
                        />

                        <button className="btn btn-dark mt-2" onClick={handleSearch}>Search</button>
                    
                </div>
            </div>
        </>
    )
}

export default Search