import React from 'react'
import Description from './Description'
import CityStuff from './CityStuff'
import { generateContainerStyle } from './styles'

const UpperContainer = () => {
  let style = generateContainerStyle()
  return (
      <div style={style}>
         <Description/>
         <CityStuff/>
      </div>
  )
}

export default UpperContainer