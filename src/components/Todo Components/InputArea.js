import React,{useRef,useEffect} from 'react'
import axios from 'axios';
import {BiErrorAlt} from 'react-icons/bi'
import Aos from 'aos';
import "aos/dist/aos.css"

const InputArea = ({ApiData,setApiData,submitArea}) => {
  const apiEndPoint = 'https://63134156a8d3f673ffc74e08.mockapi.io/todo'

  useEffect(() => {
    Aos.init({duration:1200});
  }, []);
  const todoError = useRef(); // to do submit cant be lower than 3 letter
  const addCont = useRef(); // getting the input value with ref

  const AddwithEnter = async (e) => {
    if(e.key === 'Enter') {
      if (addCont.current.value.length<3) todoError.current.style.opacity='1'
        else {
        const newData = { id: ApiData.length+1, content: addCont.current.value, isCompleted:false}
        await axios.post(apiEndPoint, newData);
        setApiData([...ApiData, newData])
        addCont.current.value=''
        todoError.current.style.opacity='0'
      }
    }
  }
  const Adder = async (e) => {
    if (addCont.current.value.length<3) todoError.current.style.opacity='1'
    else {
    const newData = { id: ApiData.length+1, content: addCont.current.value, isCompleted:false}
    await axios.post(apiEndPoint, newData);
    setApiData([...ApiData, newData])
    addCont.current.value=''
    todoError.current.style.opacity='0'
    }
  }
  return (
      <div data-aos="zoom-out-up" ref={submitArea} className="todo-submit">
        <div className="submit-wrapper">
          <div className="submit-header">
            what <span style={{fontWeight:'600',fontSize:'32px'}}>TO DO ?</span>
          </div>
          <div className="submit-input">
            <input onKeyDown={AddwithEnter} placeholder='Ne Yapacaksın?' type='text' ref={addCont} />
          </div>
          <div className="submit-button">
            <button onClick={Adder} ><i>ekle</i></button>
          </div>
          <div ref={todoError} className="todoError">
            <div className='svg'><BiErrorAlt /></div>
            <div>En az 3 karakter içermeli </div>
          </div>
        </div>
      </div>
  )
}

export default InputArea
