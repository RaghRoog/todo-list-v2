import MobileNav from '../modules/MobileNav'
import PcNav from '../modules/PcNav'
import style from '../style/main.css'
import taskCreator from '../constructors/taskCreator'
import { useState } from 'react'
import { useEffect } from 'react'
import moment from 'moment';

let ThisWeek = ({userDataFromFirestore}) => {
    
    let [dataToRender, setDataToRender] = useState([])
    useEffect(() => {
        let renderData = () => {
            var weeknumber = moment("2022-09-04", "YYYYMMDD").isoWeek();
            let temp = []
            userDataFromFirestore.forEach((data)=>{
                let week = moment(data.date, "YYYYMMDD").isoWeek();
                if(week === weeknumber){
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
                <p className='page-indicator'>This week</p>
                <div className="tasks-container">
                    {dataToRender.map((data)=>taskCreator(data.title,data.description,data.date,data.priority,data.id))}
                </div>
            </div>
        </div>
    )
}

export default ThisWeek;