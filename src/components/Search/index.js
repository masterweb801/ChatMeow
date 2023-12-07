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

const Search = (props) => {
    return (
        <div className="search" style={{backgroundColor: props.mode === "light"? "transparent":"#333", color: props.mode === "light"? "":"#fff"}}>
            <span className="text">Select an user to start chat</span>
            <input type="text" placeholder="Enter name to search..." />
            <button onClick={toggle} ><i className="fas fa-search"></i></button>
        </div>
    )
}

export default Search