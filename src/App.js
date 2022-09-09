import React, { useState, useEffect,useRef } from 'react' 
import '../src/styles/base.css'
import axios from 'axios';
import loadingGIF from '../src/images/Book.gif'
// !Components
import Todo from './components/Todo';
import Login from './components/Login';
import { HiMenuAlt3 } from 'react-icons/hi';

function App() {
  const appjs = useRef() // changing background color for dark/light mode

  const [ApiData,setApiData] = useState([]);
  const [loggedIn,SetLoggedIn] = useState(false)
  const [loading,setLoading] = useState(true)
  const apiEndPoint = 'https://63134156a8d3f673ffc74e08.mockapi.io/todo'

  useEffect(() => {
    const getAPI = async () => {
      const { data : response }  = await axios.get(apiEndPoint);
      setApiData(response);
      setLoading(false);
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
    {loading &&  
    <div className="loading">
      <img src={loadingGIF} alt='loader' />
      <div>Yükleniyor...</div> 
    </div>
    }
    {loggedIn && 
      <div className='content'>
        <div>
          <Todo 
            ApiData={ApiData}
            setApiData={setApiData}
            setLoading={setLoading}
          />       
        </div>
      </div>
    }
    </div>
  );
}

export default App;
