import MobileNav from '../modules/MobileNav'
import PcNav from '../modules/PcNav'
import style from '../style/main.css'
import taskCreator from '../constructors/taskCreator'
import { useState } from 'react'
import { useEffect } from 'react'

let Today = ({userDataFromFirestore}) => {

    let [dataToRender, setDataToRender] = useState([])

    useEffect(() => {
        let renderData = () => {
            let date = new Date()
            let day = date.toISOString().slice(0, 10)
            let temp = []
            userDataFromFirestore.forEach((data)=>{
                if(data.date == day){
                    temp.push(data)
                }
                })
            setDataToRender(temp)
        }
        renderData()
    }, [userDataFromFirestore])

    return(
        <div className='main'>
            <MobileNav/>
            <PcNav/>
            <div className="main-container">
                <p className='page-indicator'>Today</p>
                <div className="tasks-container">
                    {dataToRender.map((data)=>taskCreator(data.title,data.description,data.date,data.priority,data.id))}
                </div>
            </div>
        </div>
    )
}

export default Today;