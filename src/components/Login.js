import React,{useRef, useState,useEffect} from 'react'
import background from '../images/background2.jpg'
import {MdOutlineLightMode} from 'react-icons/md'
import {MdOutlineNightlight} from 'react-icons/md'
import Aos from 'aos';
import "aos/dist/aos.css"

const Login = ({loggedIn,SetLoggedIn,appjs,ApiData}) => {
  const [ldMode, setLdMode] = useState(true)
  const error = useRef() // 'name has to be longer than 3' error
  const login = useRef() // login name for localeStorage
  const headerImage = useRef() // for brightness setting

  useEffect(() => {
    let mode = localStorage.getItem('ldmode')
    if (mode ==='light'){
      appjs.current.style.backgroundColor= 'var(--cornsilk)'
      appjs.current.style.color='var(--kombu-green)'
      headerImage.current.style.filter='brightness(1)'
    } else if (mode ==='dark') {
      setLdMode(false)
      appjs.current.style.backgroundColor= 'darkslategray'
      appjs.current.style.color='var(--earth-yellow)'
      headerImage.current.style.filter='brightness(0.5)'
    }
    Aos.init({duration:1200});
  });
  const formHandler = (e) => {
    e.preventDefault()
    let usernameLength = login.current.value.length
    if (usernameLength < 3 || usernameLength > 20) error.current.style.display='block'
    else{
      let username = login.current.value
      console.log('Giriş Başarılı')
      localStorage.setItem('username',username )
      SetLoggedIn(true)
    }
  }
  let user = localStorage.getItem('username')

  let lightMode=<MdOutlineLightMode/>
  let darkMode=<MdOutlineNightlight/>

  const ldSwitcher = () => {
    setLdMode(!ldMode)
    if (ldMode === true) localStorage.setItem('ldmode','dark')
    else localStorage.setItem('ldmode','light')
  }
  return (
    <>
      <div className="img-container">
        <img ref={headerImage} src={background} alt='background'/>
        <div className="welcome">
          Hoşgeldin 
          {loggedIn &&
          <span style={{fontWeight:'600'}}> {user[0].toUpperCase()+ user.slice(1).toLowerCase()}</span>
          }
        </div>
        <div className='todo-app'>
          {ApiData.length==0 &&
            <span><i>To Do App</i></span>
          }
        </div>
        <div onClick={ldSwitcher} className="light-dark-mode">
          <span>{ldMode ? lightMode : darkMode }</span>
        </div>
      </div>
      {!(loggedIn) && 
      <div data-aos="fade-up" className="login">
        <div className="login-box">
          <div className="login-header">
            Lütfen Adınızı Giriniz
          </div>
          <form onSubmit={formHandler}>
            <div className="input-area">
              <input ref={login} type='text' placeholder='Adınız' />
              <div ref={error} className="login-error">
                Adınız en az 3 harf içermeli !
              </div>
            </div>
            <div className="input-button">
                <button type='submit'><i>giriş</i></button>
            </div>
          </form>
        </div>
      </div>
    }
    </>
  )
}

export default Login
