import React from 'react'
import { weather } from './refs/links'
import { useFetch, useSpinnerSuspense } from '../Helpers/Hooks'
import { SSS } from '../MainSection/styles'
import { Chapter, TextArea, PS } from '../Helpers/DesignAssistants'
import Spinner from '../MainSection/Spinner'
import { defineIcon, extractWeather, WeatherData } from './WeatherContent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { months, days } from '../Helpers/Time'

export default React.memo(() => {
    const [ response, loading, error ] = useFetch(weather.url, weather.headers, extractWeather, 'Weather')
    const [ spin ] = useSpinnerSuspense(7)
    
    let output

    if (response !== null && !error.hasError ){
        output = 
        <>
          <div style={SSS()}>
            <Chapter additionalStyle={{textAlign: 'left', marginTop: '10vh'}}>Current weather in Key West</Chapter>
            <TextArea additionalStyle={{textAlign: 'left', fontWeight: '600'}}>{defineDay()}</TextArea>
          </div>
          <div style={Object.assign({}, SSS(), {backgroundColor: '#9999ee', boxShadow: '0 0 10px'})}>
            <Weather data={JSON.parse(response[0].replace(/[$]/g,','))}/>
          </div>
        </>
    }
    else if(error.hasError) output = <Spinner spinner={false} message={error.message}/>
    else if (spin) output = <Spinner/>
    else output = <></>
    
    return output
})

const defineDay = _ => {
  let today = new Date()
  return `${days[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}`
}

const Weather = ({data}) => {
  let icon = defineIcon(data.weather, true)
  return ( 
    <>
      <Chapter additionalStyle={{color: '#111', margin: '2% 0', paddingTop: '1%'}}>
        <span>
          {`${data.temperature}  `}
        </span>
        {data.weather.toUpperCase()}
      </Chapter>
      <FontAwesomeIcon icon={icon.icon} style={icon.style}/>
      <WeatherData data={Object.keys(data).map((key) => [key, data[key]])}/>
    </>
  )
}
