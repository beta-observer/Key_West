import React, { useRef} from 'react'
import { Chapter, TextArea } from '../Helpers/DesignAssistants'
import { Width } from '../pages/contexts'
import Slider from '../Slider/ReadySlider'
import Chart from './KeyWestPopulation'
import { useManageSectionSwitching } from '../Helpers/Hooks'
import LowerNavigation from './NavArrows'

export default React.memo(({data}) => {
  const [changeActiveElement, refs, current, nextPrev] = useManageSectionSwitching()

  return (
    <div className="MainSectionContainer TableSection">
      <Chapter additionalStyle={{textAlign: 'left', marginLeft: '2%'}}>About</Chapter>
      <div className="tab">
      {data.links.map((link, index) => {
          const newRef = useRef(null);
          refs.push(newRef);
          return <button className="tabLinks" ref={newRef} id={index} onClick={changeActiveElement} key={index}>{link}</button>
        })}
      </div>
      <div className="aboutContent">
        {current === 0 ? <AboutKeyWest about={data}/> : <AboutWebsite about={data}/>}
        <LowerNavigation current={current} content={['About Key West', 'About Website']} handleClick={nextPrev}/>
      </div>
    </div>
  )
})

const AboutWebsite = React.memo(({about}) => {
  return (
    <>
      {about.website.text.map((item, index) => 
        <div className="paragraph" key={index+'div'}>
          <Chapter key={index+'c'}>{item.chapter}</Chapter>
          <TextArea key={index+'t'} additionalStyle={{textAlign: 'left'}}>{item.paragraph}</TextArea>
        </div>
      )}
    </>
  )
})

const AboutKeyWest = React.memo(({about}) => {
  let slider = {
    height:  Width() > 800? '60vh' : '40vh', 
    width:  Width() > 800? '90%' : '100%', 
    marginLeft: Width() > 800? '5%' : '0%', 
    marginTop: '4vh', 
    marginBottom: '7vh',
    background: 'linear-gradient(#aaf, #eee)', 
    borderRadius: 'none', 
    boxShadow: '0 0 10px',
    padding: Width() > 800? '2% 0' : '0'
  }
  const { images, descriptions, urls, colors } = about.keyWest.slider
  return (
    <>
      {about.keyWest.text.map((item, index) => 
        <>
          <Chapter key={index+'c'}>{item.chapter}</Chapter>
          <TextArea key={index+'t'} additionalStyle={{textAlign: 'left'}}>{item.paragraph}</TextArea>
        </>
      )}
      {Width() > 800 && <Chart/>}
      <Chapter additionalStyle={{textAlign: 'left', marginTop: '10vh', marginLeft: '8%'}}>A little gallery</Chapter>
      <Slider images={images} info={descriptions.map((item, index) => <h2 key={index}>{item}</h2>)} url={urls} sliderStyle={slider} color={colors}/>
    </>
  )
})