import React from 'react';

const SearchArea = (props) => {
    return (
        <div className="search-area">
        <form onSubmit={props.handleSubmit}>
            <input onChange={props.handleChange} placeholder="Search books" type="text"/>
            <button type="submit">Search</button>
            <select value={props.sort} onChange={props.handleSort} >
                <option value="" disabled selected>Sort</option>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
            </select>
        </form>
        </div>
    )
}

export default SearchArea;
