import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import axios from 'axios';
import {HiOutlineThumbUp} from "react-icons/hi";


const InProgress = ({ApiData,setApiData,inProgress,setLoading}) => {
  const apiEndPoint = 'https://63134156a8d3f673ffc74e08.mockapi.io/todo'

  const UpdateWEnter = async (e) => {
    if (e.key === 'Enter') {
      let getID = e.target.getAttribute('id')
      let newContent = e.target.value
      if (newContent.length<3) window.alert('En az 3 karakter gir!')
        else{
        setLoading(true)
        const updated = { id: getID, content:newContent, isCompleted:false }
        await axios.put(apiEndPoint + '/' + getID, updated)

        const clone = [...ApiData]
        const index = clone.indexOf((ApiData.filter((p) => p.id == getID))[0])
        clone[index] = {...updated}
        setApiData(clone)
        setLoading(false)
        e.target.value = ''
        e.target.previousElementSibling.style.visibility='hidden'
        e.target.style.visibility = 'hidden'
        e.target.nextElementSibling.classList.remove('toggle')
        }
    }
  }

  const Update = async (e) => {
    let getID = e.target.nextElementSibling.getAttribute('id')
    let newContent = e.target.nextElementSibling.value
    if (newContent.length<3) window.alert('En az 3 karakter gir!')
      else{
      setLoading(true)
      const updated = { id: getID, content:newContent, isCompleted:false }
      await axios.put(apiEndPoint + '/' + getID, updated)
      const clone = [...ApiData]
      const index = clone.indexOf((ApiData.filter((p) => p.id == getID))[0])
      clone[index] = {...updated}
      setApiData(clone)
      setLoading(false)
      e.target.nextElementSibling.value = ''
      e.target.nextElementSibling.style.visibility='hidden'
      e.target.style.visibility = 'hidden'
      e.target.nextElementSibling.nextElementSibling.classList.remove('toggle')
      }
  }

  const Successful = async (e) => {
    e.preventDefault()
    setLoading(true)
    let getID = e.target.getAttribute('id')
    let getContent = e.target.parentNode.firstChild.innerText
    const updated = { id:getID, content:getContent, isCompleted:true  }
    await axios.put(apiEndPoint + '/' + getID, updated)
    const clone = [...ApiData]
    const index = clone.indexOf((ApiData.filter((p) => p.id == getID))[0])
    clone[index] = {...updated}
    setApiData(clone)
    setLoading(false)
  }
  const editOpener = (e) => {
    if (e.currentTarget.previousElementSibling.style.visibility=='hidden'){
      e.currentTarget.classList.add('toggle')
    } else{
      e.currentTarget.classList.remove('toggle')
    }
    
    let prevClass = e.currentTarget.previousElementSibling
    let prev2Class = prevClass.previousElementSibling

    let visibilitySwitcher = prevClass.style.visibility == 'hidden' 
    ? prevClass.style.visibility = 'visible' 
    : prevClass.style.visibility = 'hidden' 
    prevClass = visibilitySwitcher
    let switcher2 = prev2Class.style.visibility == 'hidden'
    ? prev2Class.style.visibility = 'visible'
    : prev2Class.style.visibility = 'hidden'
    prev2Class = switcher2
    e.currentTarget.previousElementSibling.focus()
  }

  const Deleter = async (x) => {
    setLoading(true)
    await axios.delete(apiEndPoint + '/' + x.id )
    setApiData(ApiData.filter((p) => p.id !== x.id))
    setLoading(false)
  }

  let progressCount=0 // Count the amount of uncompleted todo's
  ApiData.forEach((element) => {
    if(element.isCompleted==false) progressCount++
  })

  return (
    <div ref={inProgress} className="todo-inprogress">
      <div className="inprogress-header">
        TO DO's
      </div>
      {progressCount>0 
      ? <div><u><i>Yapılacak {progressCount} işiniz var.</i></u></div>
      : <div><u>Tüm işlerinizi tamamladınız. Tebrikler!</u></div>
      }
      <div className='todo-s-wrapper' >
      {ApiData.map((x,index)=> !(x.isCompleted) &&
        <div key={index} className='todo-s' >
          <div className='todo-text'>
            {x.content}
          </div>
          <button onClick={Update} className='update-button' >Düzenle</button>
          <input onKeyDown={UpdateWEnter} className='update-input' placeholder={x.content} type='text' id={x.id}/>
          <FaRegEdit
            className='edit-button'
            onClick={editOpener} 
          />
          <button className='delete-button' onClick={()=> Deleter(x)}>Sil</button>
          <HiOutlineThumbUp
            className='success-check'
            onClick={Successful}
            id={x.id}
          />
        </div>
      )}
      </div>
    </div>
  )
}

export default InProgress
