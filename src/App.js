import style from './style/index.css'
import LoginPage from './modules/LoginPage';
import Main from './modules/Main';
import Today from './modules/Today';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { auth } from './firebase.config'
import { signOut } from 'firebase/auth'
import { db } from './firebase.config'
import { addDoc, collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import ThisMonth from './modules/ThisMonth';
import ThisWeek from './modules/ThisWeek';

function App() {
  
  let userCollectionRef = collection(db, `${localStorage.getItem('id')}`)
  let [userDataFromFirestore, setUserDataFromFirestore] = useState([])
  useEffect(() => {
      onSnapshot(userCollectionRef, (snapshot) => {
          let userData = []
          snapshot.docs.forEach((doc) => {
              userData.push({...doc.data(), id: doc.id})
          })
          setUserDataFromFirestore(userData)
      })
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/main' element={<Main userDataFromFirestore={userDataFromFirestore}/>}/>
          <Route path='/today' element={<Today userDataFromFirestore={userDataFromFirestore}/>}/>
          <Route path='/thismonth' element={<ThisMonth userDataFromFirestore={userDataFromFirestore}/>}/>
          <Route path='/thisweek' element={<ThisWeek userDataFromFirestore={userDataFromFirestore}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
