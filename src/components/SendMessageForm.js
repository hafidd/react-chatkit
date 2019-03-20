import React from 'react'

class SendMessageForm extends React.Component {
    constructor() {
        super()
        this.state = {
            message: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })
    }

    render() {
        return (
            <div class="message-input">
                <div class="wrap">
                    <form onSubmit={this.handleSubmit} className="send-message-form">
                        <input
                            onChange={this.handleChange}
                            value={this.state.message}
                            placeholder="Write your message..."
                            disabled={this.props.disabled}
                            type="text" />
                        <i class="fa fa-paperclip attachment" aria-hidden="true"></i>
                        <button class="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </form>
                </div>
            </div>
        )
    }
}

export default SendMessageForm;