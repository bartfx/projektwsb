import React from 'react';
import Example from './Example';
import './index.css';
import arrow from'./arrow.png';

class App extends React.Component{

    render(){
        return(
            
          <div className="container">
              <h2 className="elevator">Message your customers in real time. Translate messages and use emojis.</h2>
              <img src={arrow} alt="arrow" className="rotate30"></img>
            <Example/>
            </div>

        )
    }
}

export default App;