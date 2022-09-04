import MobileNav from '../modules/MobileNav.js'
import PcNav from '../modules/PcNav.js'
import style from '../style/main.css'
import { useState, useEffect } from 'react'
import { db } from '../firebase.config'
import { addDoc, collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import taskCreator from '../constructors/taskCreator'

let Main = ({userDataFromFirestore}) => {

    let displayCreator = () => {
        let creator = document.querySelector('.task-creator')
        creator.style.display = 'flex'
    }

    let [title, setTitle] = useState('')
    let [description, setDescription] = useState('')
    let [date, setDate] = useState('')
    let [priority, setPriority] = useState('High')

    let userCollectionRef = collection(db, `${localStorage.getItem('id')}`)
    let createDoc = async () => {
        await addDoc(userCollectionRef, {title,description,date,priority})
    }

    let clearInputs = () => {
        let inputs = document.querySelectorAll('input')
        for(let i = 0; i < inputs.length; i++){
            inputs[i].value = ''
        }
    }

    let addTask = () => {
        if(title!==''&&description!==''&&date!==''){
            let creator = document.querySelector('.task-creator')
            creator.style.display = 'none'
            createDoc()
            clearInputs()
        }
    }

    return(
        <div className='main'>
            <MobileNav/>
            <PcNav/>
            <div className="main-container">
                <p className='page-indicator'>Home</p>
                <button onClick={displayCreator} className="add-task">+</button>
                <div className="task-creator">
                    <label htmlFor="task-title-input">Task title:</label>
                    <input onChange={(e)=>setTitle(e.target.value)} type="text" name="task-title" id="task-title-input" placeholder='Title' />
                    <label htmlFor="task-description-input">Task description:</label>
                    <input onChange={(e)=>setDescription(e.target.value)} type="text" name="task-description" id="task-description-input" placeholder='Description' />
                    <label htmlFor="date-from-input">Date:</label>
                    <input onChange={(e)=>setDate(e.target.value)} type="date" name="task-date-from" id="date-from-input" />
                    <label htmlFor="priority-input">Priority:</label>
                    <select onChange={(e)=>setPriority(e.target.value)} name="priority" id="priority">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <button onClick={addTask}>Add</button>
                    <button onClick={()=>{
                        let creator = document.querySelector('.task-creator')
                        creator.style.display = 'none'
                        clearInputs()
                    }}>Close</button>
                </div>
                <div className="tasks-container">
                    {userDataFromFirestore.map((data)=>taskCreator(data.title,data.description,data.date,data.priority,data.id))}
                </div>
            </div>
        </div>
    )
};

export default Main;