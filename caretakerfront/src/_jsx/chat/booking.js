import React, { Component } from "react";
import '../../_css/register.css';
import axios from 'axios';

export default class RememberPasswords extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            msgFromServer: '',
        };    
    }

    sendEmail = (email) => {
        axios.post('http://localhost:9000/api/users/passwordForgot' , {
            email,
       })
        .then(response => {
            if (response.data === 'Email is not in database') {
                this.setState({
                    msgFromServer: ''
                })
            } else if (response.data === 'Recovery email sent') {
                this.setState({
                    msgFromServer: 'Email was send',
                })
            }
        }) 
        .catch(error => {
            this.setState({
                msgFromServer: ''
            })
        })
    }   

    inputChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        this.sendEmail(this.state.email);   
    }

    render() {
        return (
            <div className='form-container rounded mx-auto d-block'>
                {this.state.msgFromServer === 'Email was send' && (
                    <div className="alert alert-success" role="alert">
                        Password recovery was sent to {this.state.email}. Please check your inbox.
                    </div>
                )}
                <div className="card border-dark mb-3 border-card">
                    <div className="card-header">Recover your password</div>
                    <div className="card-body text-dark">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="text" className="form-control" id="email" name="email" onChange={this.inputChange} value={this.state.email} />
                            </div>
                            <button type="submit" className="btn btn-primary">Send recovery email</button>
                        </form>
                    </div>
                </div> 
            </div>
        );
    }
}
