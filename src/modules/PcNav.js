import { useEffect, useState } from 'react';
import style from '../style/pcNav.css'
import { auth } from '../firebase.config.js'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

let PcNav = () => {

    function resetStyle() {
        let items = document.querySelectorAll('.container-item')
        for(let i = 0; i< items.length; i++){
            items[i].style.transform = ''
            items[i].style.backgroundColor = '#0AA1DD'
        }
    }

    let navigation = useNavigate()

    const signUserOut = async () => {
        await signOut(auth)
        localStorage.clear()
        navigation('/')
    }

    return(
        <div className="pc-nav">
            <h1>Organizer</h1>
            <div className="nav-container">
                <div onClick={()=>navigation('/main')} className="container-item" id='Main'>Home</div>
                <div onClick={()=>navigation('/today')} className="container-item" id='Today'>Today</div>
                <div onClick={()=>navigation('/thisweek')} className="container-item" id='This-week'>This week</div>
                <div onClick={()=>navigation('/thismonth')} className="container-item" id='This-month'>This month</div>
            </div>
            <img onClick={signUserOut} className='pc-log-out' src="imgs/log-out.png" alt="log out" />
        </div>
    )
};

export default PcNav;