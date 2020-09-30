import React, { Component } from 'react';
import { Client } from '@stomp/stompjs';
import {InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Card} from 'primereact/card';

class ChatApp extends Component {

  state = {
    test: [],
    isLoggedInn: false,
    name: null,
    displayFooter: false,
    items: [],
    list: [],
    time: [],

  }

  componentDidMount() {
    console.log('Component did mount');
    // The compat mode syntax is totally different, converting to v5 syntax
    // Client is imported from '@stomp/stompjs'
    this.client = new Client();

    this.client.configure({
      brokerURL: 'ws://localhost:8080/gs-guide-websocket',
      onConnect: () => {
        console.log('Connected');

        this.client.subscribe('/topic/greetings', message => {
          this.setState({ test: [...this.state.test, JSON.parse(message.body).content] }); 
          this.setState({ time: [new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()] });
          console.log(this.state.time);

        });
      },
    });
  }



  clickHandler = () => {
   
    if (this.state.isLoggedInn) {

      this.client.publish({ destination: '/app/hello', body: JSON.stringify({ 'msg': this.state.value, 'name': this.state.name }) }); 
    }

    console.log('onConnect');

  }


    clickHandlerr = () => {
   
    if (this.state.isLoggedInn) {

      this.client.publish({ destination: '/app/hello', body: JSON.stringify({ 'msg': this.state.value, 'name': this.state.name }) }); 
    }

    console.log('onConnect');

  }

  clickDisconnect = () => {
    this.setState({ isLoggedInn: false });
    this.client.deactivate();
  }

   wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}




  clickConnect = () => {
    this.client.activate();
    this.setState({ isLoggedInn: true });
    this.setState({ name: this.state.value });
    
  }

  renderFooter(name) {
    return (
      <div>
        <InputText placeholder="Enter your message" id="in" onChange={(e) => this.setState({ value: e.target.value }) } style={{ marginRight: '.25em' }}/>
        <Button className="p-button-secondary" onClick={this.clickHandler} label="Send" iconPos="right" style={{ marginRight: '.25em' }}/>
        <Button className="p-button-secondary" onClick={this.clickDisconnect} label="Disconnect" iconPos="right" style={{ marginRight: '.25em' }}/>
      </div>
    );
  }

  render() {
    return (


      <div className="p-grid p-align-center vertical-container" style={{height: "50vh"}}>
   
          <Card title="Simple Chat Bot App" style={{ textAlign: 'center', width: "35vw" }} >

            <p>
              <InputText placeholder="Enter your username" id="in" onChange={(e) => this.setState({ value: e.target.value }) } style={{ marginRight: '.25em' }}/>
              <Button className="p-button-secondary" onClick={this.clickConnect} label="Connect" iconPos="right" style={{ marginRight: '.25em' }}/>
            </p>

          </Card>


          <Dialog header="Chat Room" visible={this.state.isLoggedInn} onShow={this.clickHandlerr} footer={this.renderFooter('displayFooter') } style={{ width: '50vw' }} closable={false}>
            <Card style={{ minHeight: '35vw', marginBottom: '.25em' }}>




              {this.state.test.map(item =>
                (<div>
                  <p style={{ textAlign: 'left' }}><Button label="Chat Bot:" className="p-button-rounded" /></p>
                  <Card key={item}>{item}</Card>
                  
                

                </div>))

              }
                {this.state.time.map(item =>
                    (
                      <p style={{ textAlign: 'right' }}>{item}</p>
                    ))

                  }




            </Card>

          </Dialog>





        
      </div>




    );
  }
}

export default ChatApp;