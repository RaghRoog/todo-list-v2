import MobileNav from '../modules/MobileNav'
import PcNav from '../modules/PcNav'
import style from '../style/main.css'
import taskCreator from '../constructors/taskCreator'
import { useState } from 'react'
import { useEffect } from 'react'

let ThisMonth = ({userDataFromFirestore}) => {
   
    let [dataToRender, setDataToRender] = useState([])
    useEffect(() => {
        let renderData = () => {
            let date = new Date()
            let month = date.toISOString().slice(5, 7)
            let temp = []
            userDataFromFirestore.forEach((data)=>{
                if(data.date.slice(5, 7) == month){
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
                <p className='page-indicator'>This month</p>
                <div className="tasks-container">
                    {dataToRender.map((data)=>taskCreator(data.title,data.description,data.date,data.priority,data.id))}
                </div>
            </div>
        </div>
    )
}

export default ThisMonth;