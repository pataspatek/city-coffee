import CoffeeStamps from "../components/CoffeeStamps";
import UserInfo from "../components/UserInfo";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const COFFEE_REQURED = 6;

function UserDetailView() {
    const { user_id } = useParams();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");

    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5000/get_current_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                setName(data.user.name)
                setSurname(data.user.surname)
                setEmail(data.user.email)
                setCount(data.user.count)
            }
        });
    }, [])

    return (
        <div className="content-wrapper">
            <UserInfo name={name} surname={surname} email={email} />
            <CoffeeStamps count={count} user_id={user_id} setCount={setCount}/>
        </div>
    );
}

export default UserDetailView;