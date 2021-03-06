import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

import api from "../services/api";

import "./Main.css";

import logo from "../assets/logo.svg";
import dislike from "../assets/dislike.svg";
import like from "../assets/like.svg";
import itsamatch from "../assets/itsamatch.png";



export default function Main({ match }){

    const [ users, setUsers ] = useState([]);
    const [ macthDev, setMacthDev ] = useState(null);

    useEffect( () => {

        async function loadUsers(){
            const response = await api.get("/devs", {
                headers: {
                    user: match.params.userid
                }
            });

            setUsers(response.data);
        }

        loadUsers();
    }, [ match.params.userid ]);

    useEffect( () => {
        const socket = io("http://localhost:3333", {
            query: { user: match.params.userid }
        });
        
        socket.on("match", dev =>{
            setMacthDev(dev);
        });

    }, [ match.params.userid ]);


    async function handleLike(id){
        await api.post(`/devs/${id}/likes`, null, {
            headers: {
                user: match.params.userid
            }
        });
        setUsers(users.filter( user => user._id !== id));
    }
    async function handleDislike(id){
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: {
                user: match.params.userid
            }
        });
        setUsers(users.filter( user => user._id !== id));
    }


    return (
        <div className="main-container">
            <Link to="/" >
                <img src={logo} alt="Tindev"/>
            </Link>
            { users.length > 0 ? (
            <ul>
                {users.map( user => (
                    <li key={user._id} >
                        <img src={user.avatar} alt={user.name} />
                        <footer>
                            <strong>{user.name}</strong>
                            <p>
                            {user.bio}
                            </p>
                        </footer>
                        <div className="buttons">
                            <button type="button" onClick={() => { handleDislike(user._id) }} >
                                <img src={dislike} alt="Disliked" />                            
                            </button>
                            <button type="button" onClick={() => { handleLike(user._id) }}>
                                <img src={like} alt="Liked"/>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            ) : (
                <div className="empty">Acabou :(</div>
            )}

            { macthDev && (
                <div className="match-container">
                    <img src={itsamatch} alt="It's a match" />
                    <img className="avatar" src={macthDev.avatar} alt={macthDev.name} />
                    <strong>{macthDev.name}</strong>
                    <p>{macthDev.bio}</p>

                    <button type="button" onClick={ ()=> { setMacthDev(null) } }>FECHAR</button>
                </div>
            )}
        </div>
    );
}