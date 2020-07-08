import React from 'react'
import {logoImageStyle} from './styles'

class LogoImage extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <img src={this.props.url} style={logoImageStyle} width="65vw" height='auto'/>
            </div>
        )
    }
}

export default LogoImage