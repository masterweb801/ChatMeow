import React from 'react'
import './index.css'


function toggle() {
    const searchBar = document.querySelector(".search input");
    const searchIcon = document.querySelector(".search button");

    searchBar.classList.toggle("show");

    searchIcon.classList.toggle("active");

    searchBar.focus();

    if (searchBar.classList.contains("active")) {

        searchBar.value = "";

        searchBar.classList.remove("active");

    }

}

const Search = () => {
    return (
        <div className="search">
            <span className="text">Select an user to start chat</span>
            <input type="text" placeholder="Enter name to search..." />
            <button onClick={toggle} ><i className="fas fa-search"></i></button>
        </div>
    )
}

export default Search