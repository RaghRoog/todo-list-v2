import style from '../style/loginPage.css'
import { auth, provider } from '../firebase.config.js'
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

let LoginPage = () => {

    let navigation = useNavigate()

    let [registration, setRegistration] = useState(false)
    let [isLoggedIn, setIsLoggedIn] = useState(false)

    let [registerEmail, setRegisterEmail] = useState('')
    let [registerPassword, setRegisterPassword] = useState('')
    let [loginEmail, setLoginEmail] = useState('')
    let [loginPassword, setLoginPassword] = useState('')

    let [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if(isLoggedIn){
            navigation('/main')
            window.location.reload()
        }
    }, [isLoggedIn])

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
          .then((result) => {
              const email = result.user.email;
              const userId = result.user.uid;
              localStorage.setItem('email', email)
              localStorage.setItem('id', userId)
              setIsLoggedIn(true)
        }).catch((error) => {
            console.log(error);
        });
    };

    const registerWithEmail = async () => {
        try{
            let user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            const userId = user.user.uid;
            localStorage.setItem('id', userId)
            setIsLoggedIn(true)
        }catch (error){
            if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).')
            {
                setErrorMessage('Password should be at least 6 characters long')
            }else if(error.message === 'Firebase: Error (auth/invalid-email).'){
                setErrorMessage('Invalid email')
            }else if (error.message === 'Firebase: Error (auth/email-already-in-use).'){
                setErrorMessage('Email already in use')
            }
        }
    }

    const loginWithEmail = async () => {
        try{
            let user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            const email = user.user.email;
            const userId = user.user.uid;
            localStorage.setItem('email', email)
            localStorage.setItem('id', userId)
            setIsLoggedIn(true)
        }catch (error){
            if (error.message === 'Firebase: Error (auth/user-not-found).')
            {
                setErrorMessage('User not found')
            }else if(error.message === 'Firebase: Error (auth/invalid-email).'){
                setErrorMessage('Invalid email')
            }else if(error.message === 'Firebase: Error (auth/wrong-password).'){
                setErrorMessage('Wrong password')
            }
        }
    }

    const cleanInputs = () => {
        let inputs = document.querySelectorAll('input')
        for (let i = 0; i < inputs.length; i++){
            inputs[i].value = ''
        }
    }


    function registerRender() {
        switch(registration){
            case false:
                return(
                    <div className="login-container">
                        <h2>Let's organize!</h2>
                        <label htmlFor="email">E-mail</label>
                        <input onChange={(event)=>setLoginEmail(event.target.value)} type="email" name="email" id="email" placeholder='E-mail' required/>
                        <label htmlFor="password">Password</label>
                        <input onChange={(event)=>setLoginPassword(event.target.value)} type="password" name="password" id="password" placeholder='Password' required/>
                        {errorMessage === '' ? null : <div className='error'>{errorMessage}</div>}
                        <button onClick={loginWithEmail} className='register-btn'>Log in</button>
                        <hr />
                        <button onClick={()=>setRegistration(!registration)} className='register-btn'>Sign up</button>
                        <button onClick={signInWithGoogle} className='google-btn'>Log in with Google</button>
                    </div>
                )
                break;
            case true:
                return(
                    <div className="login-container">
                        <h2>Let's organize!</h2>
                        <label htmlFor="email">E-mail</label>
                        <input onChange={(event)=>setRegisterEmail(event.target.value)} type="email" name="email" id="email" placeholder='E-mail' required/>
                        <label htmlFor="password">Password</label>
                        <input onChange={(event)=>setRegisterPassword(event.target.value)} type="password" name="password" id="password" placeholder='Password' required/>
                        {errorMessage === '' ? null : <div className='error'>{errorMessage}</div>}
                        <button onClick={()=>{registerWithEmail()}} className='register-btn'>Sign up</button>
                        <button onClick={()=>{
                            setRegistration(!registration)
                            cleanInputs()
                        }} className='register-btn'>Return</button>
                    </div>
                )
        }
    }

    return(
        <div className="login-page">
            <div className="login-left">
                <h1 className="title">Organizer</h1>
            </div>
            <div className="login-right">
                {registerRender()}
            </div>
        </div>
    )
};

export default LoginPage;