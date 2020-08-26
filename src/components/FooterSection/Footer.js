import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { AdminLogedinContext } from '../pages/contexts'
import { Link } from "react-router-dom"
import { serverKey, serverUrl } from '../MainSection/refs/key'
 
export default _ => {
  return (
    <div id="footer">
      <h2 className="AboveFooter">Key West 2020</h2>
      <div className="FooterContainer">
        <div className="FooterContent">
          <SocialMedias/>
          <div className="ContactDeveloper">
            <h1 className="Contact">Contact developer</h1>
            <p>Email: <span id="DeveloperEmail"></span></p>
          </div>
        </div>
        <div className="FooterContent">
          <AdminLogin/>
        </div>
      </div>
    </div>
  )
}

const AdminLogin = _ => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [warning, setWarning] = useState('')
  const [loading, setLoading] = useState(false)

  const setInputs = (name, value) => {
    name === 'username'? setUsername(value) : setPassword(value)
  }

  const removeInputs = _ => {
    Array.from(document.getElementsByClassName('SigninLabel'))
      .forEach(item => item.value = '')
  }

  const sendDataToServer = (username, password, cb) => {
    setLoading(true)
    fetch(`${serverUrl}/authorization`, {method: 'POST', headers : {
      'authorization' : serverKey, 
      'content-type' : 'application/json'
    }, body : `{ "username": "${username}", "password": "${password}"}`})
      .then(res => res.json())
      .then(res => {
        if(res.Authentication === "succeded") {
          setWarning('')
          if(window.location.pathname !== '/settings') window.location.pathname = '/settings'
          window.sessionStorage.setItem('auth', 'true')
          cb()
        } else {
          setWarning(<Warning text={`Invalid credentials`} handleClick={() => setWarning('')}/>)
          removeInputs()
        }
        setPassword('')
        setUsername('')
        setLoading(false)
      })
      .catch(() => {
        removeInputs()
        setLoading(false)
      })
  }

  const makeAuthorization = (event, cb) => {
    event.preventDefault()
    if(username === '' || password === '') 
      setWarning(<Warning text={`Input your${username=== ''? 'username' : 'password'}`} handleClick={() => setWarning('')}/>)
    else {
      setWarning('')
      sendDataToServer(username, password, cb)
    }
  }

  const logOut = cb => {
    setPassword('')
    setUsername('')
    window.sessionStorage.setItem('auth', 'false')
    cb()
  }

  return (
    <AdminLogedinContext.Consumer>
      {value => 
        <>
          {!value.value && 
            <>
              <h2 className="Contact">Log in as an admin:</h2>
              <h2>{warning}</h2>
              <form>
                <Label text="Username: " type="text" name="username" manageInput={setInputs}/>
                <Label text="Password: " type="password" name="password" manageInput={setInputs}/>
                <button className="LoginButton" onClick={(event) => makeAuthorization(event, value.method)}>
                  {loading ? 'processing...' : 'Log in'}
                </button>
              </form>
            </>} 
            { value.value && 
            <div>
              <h2 className="Contact">You are currently logged in as Admin</h2>
              {window.location.pathname !== '/settings' && 
                <Link to="/settings">
                  <h4 className="ContentManagerLink">Go to content manager</h4>
                </Link>
              }
              <button className="LoginButton" onClick={() => logOut(value.method)}>Log out</button>
            </div>
          }
        </>
      }
    </AdminLogedinContext.Consumer>
  )
} 

const Label = ({text, manageInput, type, name}) => {
  const changeInput = event => {
    manageInput(event.target.name, event.target.value)
  }

  return (
    <label className="Label">
      <h3 className="FormLabel">{text}</h3>
      <input type={type} name={name} onChange={changeInput} className="SigninLabel"/>
    </label>
  )
}

const Warning = ({text, handleClick}) => {
  return (
    <span className="LoginError" onClick={handleClick}>{text}
      <FontAwesomeIcon className="LoginErrorIcon" icon={faTimesCircle}/>
    </span>
  )
}

const SocialMedias = _ => {
  let links = ['https://www.facebook.com', 'https://www.twitter.com', 'https://www.instagram.com', 'https://www.youtube.com/']
  let icons = [faFacebook, faTwitter, faInstagram, faYoutube]
  let content = links.map((link, index) => <Icon link={link} icon={icons[index]} key={index}/>)
  return (
    <>
      <h2 className="Contact">Connect with us</h2>
      <div className="SocialMediaSection">
        {content}
      </div>
    </>
  )
}

const Icon = ({link, icon}) => {
  return (
    <a className="SocialMediaIcon" href={link} target="_blank">
      <FontAwesomeIcon icon={icon}/>
    </a>
  )
}