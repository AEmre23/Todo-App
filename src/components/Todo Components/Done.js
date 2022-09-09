import React from 'react'
import axios from 'axios';
import {HiOutlineThumbDown} from "react-icons/hi";

const Done = ({setApiData,ApiData,done,setLoading}) => {

  const apiEndPoint = 'https://63134156a8d3f673ffc74e08.mockapi.io/todo'

  const Fail = async (e) => {
    setLoading(true)
    let getID = e.target.getAttribute('id')
    let getContent = e.target.parentNode.firstChild.innerText
    const updated = { id:getID, content:getContent, isCompleted:false }
    await axios.put(apiEndPoint + '/' + getID, updated)
    const clone = [...ApiData]
    const index = clone.indexOf((ApiData.filter((p) => p.id == getID))[0])
    clone[index] = {...updated}
    setApiData(clone)
    setLoading(false)
  }

  const Deleter = async (item) => {
    setLoading(true)
    await axios.delete(apiEndPoint + '/' + item.id )
    setApiData(ApiData.filter((p) => p.id !== item.id))
    setLoading(false)
  }

  let doneCount=0 // Count the amount of completed todo's
  ApiData.forEach((element) => {
    if(element.isCompleted==true) doneCount++
  })

  return (
    <div ref={done} className="todo-done">
      <div className="done-header">
        DONE
      </div>
      {doneCount>0
        ? <div><u><i>Tamamlanmış {doneCount} işiniz var.</i></u></div>
        : <div><u>Tamamlanan işiniz yok.</u></div>
      }
      <div className='dones-wrapper'>
        { ApiData.map((item,index)  =>  item.isCompleted && 
        <div className='dones' key={index}>
          <div className='done-text'><s>{item.content}</s></div>
          <button className='delete-button' onClick={()=> Deleter(item)}>Sil</button>
          <HiOutlineThumbDown
            className='success-check fail'
            onClick={Fail}
            id={item.id}
          />
        </div>
        )}
      </div>
  </div>
  )
}

export default Done
