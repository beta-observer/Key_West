import React, { useState, useEffect } from 'react'
import Navigation from './navigation'
import Container from '../../../../styles/header/navbar'
import Menu from './Menu'
import { MenuOpenedContext } from '../../../../helpers/contexts'


const Navbar = ({ withLogo = false, bgColor = false }) => {
  const [ opened, setOpened ] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(opened){
        if (event.target.id === 'menu-bar') return 
        setOpened(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [ opened ])

  return(
    <MenuOpenedContext.Provider value={{ opened, setOpened }}>
      <Container bgColor={ bgColor }>
        <div id="image-label">
          { withLogo &&
            <img 
              alt="Key West Seal"
              src="https://upload.wikimedia.org/wikipedia/commons/2/24/Seal_of_Key_West%2C_Florida.png"
              className="logo-image"
            />
          }
          <h2 className="logo-label">Key West Florida</h2>
        </div>
        <Navigation/>
        <Menu/>
      </Container>
    </MenuOpenedContext.Provider>
  )
}

export default Navbar