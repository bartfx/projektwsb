import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Livechat from './Livechat';
import './index.css';
import './bootstrap.min.css';
import logo from './logo.svg';
import close from './close.svg';

function Example() {
  const [showButton, setShowButton] = React.useState(true);
  const [showMessage, setShowMessage] = React.useState(false);
  return (
    
    
    <container >

      {showButton && (
        <button
          onClick={() => setShowMessage(true)}
          className="circle"
        >
<img src={logo} alt="logo" width="80px" />

          </button>
        )}
        <CSSTransition
          in={showMessage}
          timeout={300}
          classNames="alert"
   unmountOnExit
          onEnter={() => setShowButton(false)}
          onExited={() => setShowButton(true)}
        >


        
<alert onClose={() => setShowMessage(false)}>

<button className="btnlive" onClick={() => setShowMessage(false)}><img src={close} alt="close" width="21px" height="21px"/></button>

<Livechat></Livechat>

          </alert>
 

        </CSSTransition>
     
      </container>
     
    );
  }
  
  export default Example;