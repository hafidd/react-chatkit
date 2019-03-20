import React from 'react'

class RoomList extends React.Component {
    render() {
        const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id)
        return (
            /*
            <div className="rooms-list">
                <ul>
                    <h3>Your rooms:</h3>
                    {orderedRooms.map(room => {
                        const active = this.props.roomId === room.id ? "active" : ""
                        return (
                            <li key={room.id} className={"room" + active}>
                                <a onClick={() => { this.props.subscribeToRoom(room.id) }} href="#"># {room.name}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
            */
            <div id="contacts">
                <ul>
                    {orderedRooms.map(room => {
                        const active = this.props.roomId === room.id ? "active" : ""
                        return (
                            <li className={"contact" + active} key={room.id}>
                                <div className="wrap">
                                    <span className="contact-status online"></span>
                                    <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                                    <div className="meta">
                                        <p onClick={() => { this.props.subscribeToRoom(room.id) }} className="name">{room.name}</p>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList