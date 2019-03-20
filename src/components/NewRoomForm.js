import React from 'react'

class NewRoomForm extends React.Component {
    constructor() {
        super()
        this.state = {
            roomName: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            roomName: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.createRoom(this.state.roomName)
        this.setState({ roomName: '' })
    }

    render() {
        return (
            <div className="new-room-form">
                <form onSubmit={this.handleSubmit} className="new-room-form" >
                    <input
                        onChange={this.handleChange}
                        value={this.state.roomName}
                        placeholder="New Room"
                        type="text" />
                    <button id="create-room-btn">+</button>
                </form>
            </div>
        )
    }
}

export default NewRoomForm;