import SearchBar from '../components/SearchBar';
import UserList from '../components/UserList';

import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function HomeView() {

    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/get_all_users")
        .then((response) => response.json())
        .then((data) => {
           if (data.succes) {
            setUsers(data.users)
           }
        });
    }, [location])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const searchedList = users.filter((user) => 
        user.name.toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase())
    );

    // Error message when no user mathes the searched term
    useEffect(() => {
        if (searchedList.length === 0) {
            setErrorMessage("No users found")
        } else {
            setErrorMessage("")
        }
    }, [searchedList]);


    return (
        <div className="content-wrapper">
            <SearchBar search={searchTerm} onSearch={handleSearch}/>
            <UserList searchedList={searchedList} errorMessage={errorMessage}/>
        </div>
    );
}

export default HomeView;