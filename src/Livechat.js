import React from 'react';
import './index.css';
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';
import Gifwindow from './components/Gifwindow';

import Moment from 'react-moment';

import * as io from 'socket.io-client';


var translate = require('yandex-translate')('trnsl.1.1.20190524T231819Z.9cb1358a5530b78e.fff580f8aec77c924622c8c24e5963ed070950d5');
let displayer = null;


const Emoji = props => (
  <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
  >
      {props.symbol}
  </span>
);


class Livechat extends React.Component {
  socket = null;


  constructor() {
    super();
    this.state = {
      displayQuestions: false,
      authorId: '',
      sumCount: 'Name',
      bgColor: 'blue',
      bgColors: 'grey',
      valid: '',
      validEmo: '',
      textareaValue: '',
      translatemsg: '',   // PRZETŁUMACZONE WIADOMOŚCI
      messages: [
        // { text: string, authorId: number, data wysłania } <<<< ALBO TU DODAĆ translatetext: string
      ]
    };
  }


  componentWillMount() {
    this.socket = io.connect('https://socket-chat-server-zbqlbrimfj.now.sh', {
      transports: ['websocket'],
      reconnection: true
    });

    this.socket.on('chat message', message => {
      console.log('Send message -- server side', message);
      this.state.messages.push(message);
      this.setState({ messages: this.state.messages });

    });
  }


  sendMessage = () => {
    const text = this.refs.textarea.value.trim();
        if (text) {
      const message = { text, authorId: this.state.authorId,  };
      this.socket.emit('chat message', message);
      this.refs.textarea.value = '';
    }


    this.setState({
      textareaValue: ''
    })
  };


nickname() {
    this.setState({
      sumCount: this.refs.nickname.value.trim(),
      authorId: this.refs.nickname.value.trim(),

    })
  }

myFunction = () => {
  if(this.refs.nickname.value.trim() === ''){
    this.setState({
      valid: 'block',
        })
  }
    else {
this.nickname.bind(this);


this.setState({
  animate: '',
  none: 'hidden',
  authorId: this.refs.nickname.value.trim(),
  sumCount: this.refs.nickname.value.trim(),
    })
}
}


  handleEnterPress = event => {
    if (event.keyCode === 13) {
      
      this.sendMessage();


    }
  };


  handleEnterPressNick = event => {

    if(this.refs.nickname.value.trim() === ''){
      if (event.keyCode === 13) {

      this.setState({
        valid: 'block',
          })


        }
    }
      else {

    if (event.keyCode === 13) {
      this.sendMessage();
      
  this.nickname.bind(this);


  this.setState({
    animate: '',
    none: 'hidden',
    authorId: this.refs.nickname.value.trim(),
    sumCount: this.refs.nickname.value.trim(),
      })

    }
  }
  };


  displayQuestion = () => {
    console.log(this.state.displayQuestions);
    this.setState({
        displayQuestions: !this.state.displayQuestions
       
    })
}

windowCleaner = () => {
  this.setState({
      messages: []
     
  })
}





translateMessage = () => {


  translate.translate(this.refs.textarea.value, { to: 'pl' }, function(err, res) {
    
    console.log(res.text[0]);
    document.getElementById("demo").value = res.text[0];
    
    return res.text[0];
      });
  
}

handleOnChange(event) {
  this.setState({
    textareaValue: event.target.value
  })
}

handleOnSubmit(event) {
  event.preventDefault();

  this.setState({
    textareaValue: this.state.textareaValue + ''
  })
}


showEmoji = () => {
  this.setState({
    validEmo: 'visible',
      })
}

sendEmoji1 = () => {

  this.setState({
    textareaValue: this.state.textareaValue + '😀'
  })
}

sendEmoji2 = () => {

    this.setState({
      textareaValue: this.state.textareaValue + '🤣'
    })
}

sendEmoji3 = () => {

  this.setState({
    textareaValue: this.state.textareaValue + '😈'
  })
}

sendEmoji4 = () => {

  this.setState({
    textareaValue: this.state.textareaValue + '🤢'
  })
}
sendEmoji5 = () => {

  this.setState({
    textareaValue: this.state.textareaValue + '👩🏽‍🚀'
  })
}

sendEmoji6 = () => {

  this.setState({
    textareaValue: this.state.textareaValue + '🤳🏼'
  })
}

sendEmoji7 = () => {

  this.setState({
    textareaValue: this.state.textareaValue + '👩🏾‍🚒'
  })
}

sendEmoji8 = () => {

  this.setState({
    textareaValue: this.state.textareaValue + '👶🏿'
  })
}


  render() {
 
const ROOT_CSS = css({
        height: 340,
        width: 290
      });

     
      if ( this.state.displayQuestions ) {
        displayer = (
        <div>

             <Gifwindow displayQuestions={this.state.displayQuestions}/>
         
        </div>
        )
   }


    return (
<section className="wrapper">
  <div className="chat">
    <div className="nickwrap" style={{visibility:this.state.none}}>
      <div className="chathead">
        Hello 👋! Please fill out the form below to start chatting.
      </div>
        <input type="text"
        ref="nickname"
        className="nicktextarea"
        onKeyUp={this.handleEnterPressNick}
        placeholder="* Name"
        maxlength="20"
        minlength="1"
        rows="1"
        wrap="off"
        required
        />
    <div  className="invalid-feedback" style={{display:this.state.valid}}>Please provide a valid name.</div>
      <button type="submit" onClick={this.myFunction} className="nickw" style={{ visibility:this.state.none}}>Start Chat</button>


</div>

          <header>Welcome to Chat!</header>
          <section>
          <ScrollToBottom className={ ROOT_CSS }>
            {this.state.messages.map(message => (
              <div key={message.id} className="message">
               
               <span className="authormsg">{ message.authorId } : {' '}</span>
                {message.authorId === this.state.authorId ? (
                  <span className="homemsg">{message.text}</span>
                ) : ( message.text ) }
                <div className="msgTime"><Moment unix format="HH:mm DD/MM/YYYY">{message.timestamp/1000}</Moment></div>
              </div>
              
            ))}
            </ScrollToBottom>
          </section>
          <footer>
            <div className="sendarea">
          <form onSubmit={(event) => this.handleOnSubmit(event)}>
            <textarea
              id="demo"
              ref="textarea"
              className="textarea"
              onKeyUp={this.handleEnterPress}
              value={this.state.value}
              placeholder="Type and press [enter]"
              value={this.state.textareaValue}
            onChange={(event) => this.handleOnChange(event)}
            />
        </form>
        <button onClick={this.sendMessage} className="sendBtn">Send</button>
        </div>

  <div>
<button onClick={this.windowCleaner} className="buttons">Clean</button>
<button onClick={this.showEmoji} className="buttons">Emoji</button>
<button onClick={this.translateMessage} className="buttonst">Translate to PL</button>
</div>
            <div className="emojis" style={{visibility:this.state.validEmo}}>
      <div className="oneEmoji" onClick={this.sendEmoji1}><Emoji symbol="😀"  /></div>
      <div className="oneEmoji" onClick={this.sendEmoji2}><Emoji symbol="🤣"  /></div>
      <div className="oneEmoji" onClick={this.sendEmoji3}><Emoji symbol="😈"  /></div>
      <div className="oneEmoji" onClick={this.sendEmoji4}><Emoji symbol="🤢"  /></div>
      <div className="oneEmoji" onClick={this.sendEmoji5}><Emoji symbol="👩🏽‍🚀"  /></div>
      <div className="oneEmoji" onClick={this.sendEmoji6}><Emoji symbol="🤳🏾"  /></div>
      <div className="oneEmoji" onClick={this.sendEmoji7}><Emoji symbol="👩🏾‍🚒"  /></div>
      <div className="oneEmoji" onClick={this.sendEmoji8}><Emoji symbol="👶🏿"  /></div>
      </div>
            <div className="yandexfoot">Translate powered by <img src="https://pictures.s3.yandex.net/ya.svg" alt="yandex" width="30px"></img></div>
          </footer>
          
        </div>
      </section>

    );
  }
}

export default Livechat;



