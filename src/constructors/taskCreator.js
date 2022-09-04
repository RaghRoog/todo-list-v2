import { db } from '../firebase.config.js'
import { doc, deleteDoc } from 'firebase/firestore'

let taskCreator = (title,description,date,priority,id) => {

    return(
        <div className="task">
            <p className="task-title">{`Title: ${title}`}</p>
            <p className="task-description">{`Description: ${description}`}</p>
            <p className="task-date-from">{`Date: ${date}`}</p>
            <p className="task-priority">{`Priority: ${priority}`}</p>
            <button onClick={()=>{
                const docRef = doc(db, `${localStorage.getItem('id')}`, id)
                deleteDoc(docRef)
            }} className='done' style={{margin: '6px'}}>Done</button>
        </div>
    )
}

export default taskCreator