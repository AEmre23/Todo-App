import React, { useState, useEffect,useRef } from 'react' 
import '../src/styles/base.css'
import axios from 'axios';
// !Components
import Todo from './components/Todo';
import Login from './components/Login';

function App() {
  const appjs = useRef() // changing background color for dark/light mode
  const [ApiData,setApiData] = useState([]);
  const [loggedIn,SetLoggedIn] = useState(false)
  const apiEndPoint = 'https://63134156a8d3f673ffc74e08.mockapi.io/todo'

  useEffect(() => {
    const getAPI = async () => {
      const { data : response }  = await axios.get(apiEndPoint);
      setApiData(response);
    };
    getAPI();
    if (localStorage.getItem('username') != null ) SetLoggedIn(true)
  },[])

  return (
    <div ref={appjs} className="App">
    <Login 
      loggedIn={loggedIn}
      SetLoggedIn={SetLoggedIn}
      appjs={appjs}
      ApiData={ApiData}
    />
    {loggedIn && 
      <div className='content'>
        <div>
          <Todo 
            ApiData={ApiData}
            setApiData={setApiData}
          />
        </div>
      </div>
    }
    </div>
  );
}

export default App;
