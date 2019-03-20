import React, { Component } from 'react';
//import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './Chat.css';

import MessageList from './components/MessageList'
import RoomList from './components/RoomList'
import SendMessageForm from './components/SendMessageForm'
import NewRoomForm from './components/NewRoomForm'

import Profile from './components/Profile'

import Chatkit from '@pusher/chatkit-client'
import { tokenUrl, instanceLocator } from './config'

class App extends Component {
  constructor() {
    super()
    this.state = {
      username: 'pretkam',
      roomId: '',
      room: [],
      onlineCount: 0,
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      onlineUsers: []
    }
  }

  componentDidMount() {
    this.connect("pretkam")
  }

  connect(user) {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: user,
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect({

    })
      .then(currentUser => {
        this.currentUser = currentUser
        console.log(currentUser.rooms[0]);
        this.getRooms()
      })
  }

  getRooms = () => {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
      .catch(err => console.log('err room'))
  }

  subscribeToRoom = (id) => {
    this.setState({
      messages: [],
      onlineCount: 0
    })
    this.currentUser.subscribeToRoom({
      roomId: id,
      hooks: {
        onMessage: message => {
          this.setState({ messages: [...this.state.messages, message] })
        },
        onPresenceChanged: (state, user) => {
          console.log(`User ${user.name} is ${state.current}`)
        }
      }
    })
      .then(room => {
        this.setState({
          roomId: room.id,
          room: room
        })
        // users      
        room.users.map(user => {
          user.presence.state === 'online' && (
            this.setState({
              onlineCount: this.state.onlineCount + 1
            })
          )
        })
        console.log(this.state.onlineCount)
        this.getRooms()
      })
  }

  handleInUser = user => {
    console.log(user)
  }

  handleOutUser = user => {
    console.log(user)
  }

  sendMessage = (text) => {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
  }

  createRoom = (name) => {
    this.currentUser.createRoom({
      name
    })
      .then(room => this.subscribeToRoom(room.id))
      .catch(err => console.log("err create room ", err))
  }

  submitUser = (e) => {
    e.preventDefault()
    this.connect(this.state.username)
  }
  changeUser = (e) => {
    this.setState({ username: e.target.value })
  }

  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("closebtn").style.display = "block";
  }

  closeNav() {
    document.getElementById("mySidebar").style.width = "60px";
    document.getElementById("main").style.marginLeft = "60px";
    document.getElementById("closebtn").style.display = "none";
  }

  render() {
    return (
      /*
      <div className="app">
        <form onSubmit={this.submitUser}>
          <input type="text" name="username" onChange={this.changeUser} value={this.state.username} />
          <button>LOGIN</button>
        </form>
        <RoomList
            rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
            subscribeToRoom={this.subscribeToRoom}
            roomId={this.state.roomId}
          />
        <NewRoomForm createRoom={this.createRoom} />
        <SendMessageForm sendMessage={this.sendMessage} disabled={!this.state.roomId} />
        </div>
        <MessageList
            messages={this.state.messages}
            roomId={this.state.roomId}
            room={this.state.room}
            username={this.state.username}
          />

          <SendMessageForm sendMessage={this.sendMessage} disabled={!this.state.roomId} />  
          
        */
      /*
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 left">
            <div className="row">
              <div className="col-12">
                <div className="profil-left">
                  aasf
                </div>
              </div>
              <div className="col-12">
                search
              </div>
              <div className="col-12">
                chat list
              </div>
            </div>
          </div>
          <div className="col-9 right">
            <div className="row">
              <div className="col-12">
                <div className="profil-right">
                  keterangan group
                </div>
              </div>
              <div className="col-12">
                CHAT
              </div>
              <div className="col-12">
                Form
              </div>
            </div>
          </div>
        </div>
      </div>
      */

      <div className="container-fluid">
        <div id="mySidebar" className="sidebar">
          <div className="row">
            <div className="col-12">
              <div className="profil-left">
                <button className="btn btn-default" id="closebtn" onClick={this.closeNav}>X</button>
              </div>
            </div>
            <div className="col-12">
              search
              </div>
            <div className="col-12">
              chat list
              </div>
          </div>
        </div>
        <div id="main">
          <button className="btn btn-default" onClick={this.openNav}>☰ Toggle Sidebar</button>
          <h2>Collapsed Sidebar</h2>
          <p>Click on the hamburger menu/bar icon to open the sidebar, and push this content to the right.</p>
        </div>
      </div>
    );
  }
}

export default App;
