import React, { useEffect, useState, useContext } from 'react';
import "/src/LeaderBoard/NewLeaderBoard.css";
import SVGheader from './SVGheader';
import Dashboard from '../dashBoard/Dashboard';
import MyCard from './MyCard';
import BoxLoader from '../Loader/BoxLoader';
import { UserContext } from '../Context/UserContext';

function NewLeaderboard() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const { bg, light, dark, user, role } = useContext(UserContext);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const excludeUsers = ["OfficialCources", "ProblemSet", "Contest"];
        setLoader(true);
        try {
            fetch('https://hytechlabs.online:9090/Public/getAllUser')
                .then(response => response.json())
                .then(data => {
                    const filteredUsers = data.filter(user => !excludeUsers.includes(user.name));
                    const sortedUsers = filteredUsers.sort((a, b) => b.rating - a.rating);
                    setUsers(sortedUsers);
                    if (sortedUsers.length > 0) {
                        setSelectedUser(sortedUsers[0]); // Set the first user as default selected user
                    }
                    setLoader(false);
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                    setLoader(false);
                });
        } catch (error) {
            console.error('Error:', error);
            setLoader(false);
        }
    }, []);

    const deleteUser = (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        setLoader(true);
        fetch(`https://hytechlabs.online:9090/Public/user/id/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    const updatedUsers = users.filter(user => user.id !== id);
                    setUsers(updatedUsers);
                    if (selectedUser && selectedUser.id === id) {
                        setSelectedUser(updatedUsers.length > 0 ? updatedUsers[0] : null);
                    }
                } else {
                    console.error('Error deleting user:', response);
                }
                setLoader(false);
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                setLoader(false);
            });
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <div>
            <Dashboard />
            {loader ? <BoxLoader /> :
                <article className="leaderboard">
                    <SVGheader />
                    <div className="leaderboard__header">
                        <span className="leaderboard__heading">Ranking</span>
                        <span className="leaderboard__heading">User</span>
                        <span className="leaderboard__heading">Question</span>
                        <span className="leaderboard__heading">Rating</span>
                    </div>
                    <main className="leaderboard__profiles">
                        {users.map((user, index) => (
                            <article
                                key={user.id}
                                className={`leaderboard__profile ${index === 0 ? 'leaderboard__profile--gold' : ''}`}
                                onClick={() => handleUserClick(user)}
                            >
                                <span className="leaderboard__index">{index + 1}</span>
                                <img src={user.profileImg} alt={user.name} className="leaderboard__picture" />
                                <span className="leaderboard__name">{user.name}</span>
                                <div style={{ position: "absolute", left: 400 }}>
                                    <span className="leaderboard__posts">{user.postCount}</span>
                                </div>
                                <span className="leaderboard__value">
                                    <div style={{ position: "absolute", left: 580 }}>
                                        {user.rating && <div>{user.rating}<span>r</span></div>}
                                    </div>
                                </span>
                                {role == "ADMIN" && <button className="leaderboard__delete" onClick={(e) => { e.stopPropagation(); deleteUser(user.id); }}>Delete</button>
                                }
                            </article>
                        ))}
                    </main>
                </article>
            }
            {!loader &&
                <div style={{ padding: '20px', position: "absolute", right: 0, top: 250 }}>
                    {selectedUser && (
                        <div className='card'>

                            <MyCard
                                userId={selectedUser.id}
                                index={users.indexOf(selectedUser) + 1}
                                profileImg={selectedUser.profileImg}
                                name={selectedUser.name}
                                rating={selectedUser.rating}
                                postCount={selectedUser.postCount}
                            />
                        </div>
                    )}
                </div>}
        </div>
    );
}

export default NewLeaderboard;
