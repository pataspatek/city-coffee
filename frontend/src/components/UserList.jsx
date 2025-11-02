import { Link } from "react-router-dom";

function UserList({searchedList, errorMessage}) {
    const renderUserList = () => {
        if (searchedList.length === 0) {
            return <h1 className="no-user-found-message">{errorMessage}</h1>
        } else {
            return searchedList.map((item) => (
                <Link to={`/user_detail/${item.id}`} key={item.id} className="user-list-link">
                    <div className="user-card">
                        <h2>{item.name} {item.surname}</h2>
                        <p>{item.email}</p>
                    </div>
              </Link>
           ));
        }
    };
    return <div className="user-list-container">{renderUserList()}</div>;
}

export default UserList;
