import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import fakeAuth from '../../utils/authContext'
import LogOut from '../../components/logOutBut'
import API from '../../utils/API'
import { useHistory } from "react-router-dom";
import { withGlobalState } from 'react-globally'
import "./member.css"
import logo from "./white-logo.png"
import NavBar from '../../components/NavBar'
import Sidenav from '../../components/SideNav'

// import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:7001');

function Member(props) {
  Cookies.set('url', '/member', { path: '' })
    const [user, setUser] = useState('')
    
    let history = useHistory();
    
    useEffect(() => {
        API.userGreeting({
            id: props.globalState.user.userId
        })
        .then(res => {
            setUser(res.data[0].username)
            // socket.emit('log-user-info')
        })
    }, [])

    let login = (site) => {
      fakeAuth.authenticate(() => {
        history.replace(site);
      });
    };

    return (
        <body className="main-body">

          <NavBar />

          <Sidenav/>
        <div className="member-div">
            <p className="main-div">Welcome! {user}<span className="name"></span></p>

        </div>
        <img className="logo" src={logo}></img>
      </body>
    )   
}

export default withGlobalState(Member)