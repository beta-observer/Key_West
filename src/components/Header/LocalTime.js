import React from 'react'
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { divStyle, item, iconStyle } from './styles'

class LocalTime extends React.Component {
    constructor(props) {
        super(props);
        this.getTime = this.getTime.bind(this)
        this.state = {date: this.getTime()}
      }
    
      componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }
    
      componentWillUnmount() {
        clearInterval(this.timerID);
      }

      tick() {
        this.setState({
          date: this.getTime()
        });
      }

      getTime = () => {
        let date = new Date();
        let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        return new Date(utc + (3600000*(-4)))
      }
    
      render() {
        return (
          <ul style={divStyle}>
            <li><FontAwesomeIcon style={iconStyle} icon={faClock} /></li>
            <li><h3 style={item}> {this.state.date.toLocaleTimeString()} </h3></li>
          </ul>
        )
    }
}

export default LocalTime