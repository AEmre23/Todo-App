import React,{useRef,useEffect}  from 'react'
import InputArea from './Todo Components/InputArea';
import InProgress from './Todo Components/InProgress';
import Done from './Todo Components/Done'

const Todo = ({ApiData,setApiData}) => {
  const submitArea = useRef(); // for width setting
  const inProgress = useRef(); // for display setting
  const done = useRef(); // for display setting

  useEffect(() => {
    if(ApiData.length === 0){
      inProgress.current.style.display='none'
      done.current.style.display='none'
      //submitArea.current.style.width= '100%'
      submitArea.current.style.height='calc(100vh - 160px)'
    }
    else {
      inProgress.current.style.display='flex'
      done.current.style.display='flex'
      submitArea.current.style.width='30.5%'
      submitArea.current.style.height='auto'
    }
  });

  return (
    <div className="todo-wrapper">
      <InputArea 
        ApiData={ApiData}
        setApiData={setApiData}
        submitArea={submitArea}
      />
      <InProgress 
        ApiData={ApiData}
        setApiData={setApiData}
        inProgress={inProgress}
      />
      <Done 
        ApiData={ApiData}
        setApiData={setApiData}
        done={done}
      />
    </div>
  )
}

export default Todo
