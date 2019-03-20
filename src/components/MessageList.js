import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'
import { a } from 'reactstrap'

class MessageList extends React.Component {

    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }

    componentDidUpdate() {
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight
        }
    }

    render() {
        if (this.props.roomId === '') {
            return (
                <div className="messages">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
            )
        }
        return (
            /*
            <React.Fragment>
                <div className="message-list">
                    <div className="room-info">
                        <div className="room-name">
                            <h2>{this.props.room.name} </h2>
                            <button className="btn-userlist">{this.props.room.users.length} user{this.props.room.userIds.length > 1 && "s"}</button>
                        </div>
                    </div>
                    {this.props.messages.map((message) => {
                        return (
                            <Message key={message.id} username={message.senderId} text={message.text} />
                        )
                    })}
                </div>
            </React.Fragment>
            */
                    
            <React.Fragment>
                
                <div className="messages">
                    <ul>
                        {this.props.messages.map((message) => {
                            const msg = message.senderId === this.props.username ? "sent" : "replies"
                            return (
                                <li key={message.id} className={msg}>
                                    <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                                    <p><span className="sender">{message.senderId}</span><br />{message.text}</p>
                                </li>
                            )

                        })}
                    </ul>
                </div>
            </React.Fragment>

        )
    }
}

export default MessageList