import React from 'react'
import { NavLink as Link } from './Link'
import MenuToggler from './MenuToggler'
import { links } from './links'


const Navbar = () => {
  const generateLinks = () => {
    const output = links.map((link, index) => (
      <Link
        to={ 
          link === 'Home' 
            ? '/' 
            : `/${link.toLowerCase()}`
        }
        id="link"
        key={ link + index }
        label={ link }
      />
    ))
    return output
  }
  
  return(
    <>
      <div id="navigation">
        { generateLinks() }
      </div>
      <MenuToggler/>
    </>
  )
}

export default Navbar