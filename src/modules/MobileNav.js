import { useState } from 'react';
import style from '../style/mobileNav.css'
import { auth } from '../firebase.config.js'
import { signOut } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'

let MobileNavbar = () => {

    let [clicked, setClicked] = useState(false)

    const displayDropdown = () => {
        if (!clicked){
            let dropdown = document.querySelector('.dropdown-container')
            let nav = document.querySelector('.mobile-nav')
            let navHeight = nav.clientHeight
            dropdown.style.display = 'flex'
            dropdown.style.top = `${navHeight}px`
            setClicked(true)
        }else if(clicked){
            let dropdown = document.querySelector('.dropdown-container')
            dropdown.style.display = 'none'
            setClicked(false)
        }
    }

    let navigation = useNavigate()

    const signUserOut = async () => {
        await signOut(auth)
        localStorage.clear()
        navigation('/')
    }

    return(
        <div className="mobile-nav">
            <img onClick={displayDropdown} src="imgs/menu-bar.png" alt="display dropdown" />
            <h1>Organizer</h1>
            <img onClick={signUserOut} className='log-out' src="imgs/log-out.png" alt="log out" />
            <div className="dropdown-container">
                <Link to={'/main'} className="dropdown-item">Home</Link>
                <Link to={'/today'} className="dropdown-item">Today</Link>
                <Link to={'/thisweek'} className="dropdown-item">This week</Link>
                <Link to={'/thismonth'} className="dropdown-item">This month</Link>
            </div>
        </div>
    )
};

export default MobileNavbar;