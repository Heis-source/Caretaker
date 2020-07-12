import React, { Component } from "react";
import '../../_css/register.css';
import { Link } from "react-router-dom";
import axios from 'axios';

export default class resetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            msgFromServer: '',
        };    
    }

    async componentDidMount() {
        axios.get('http://localhost:9000/api/users/reset' , {
            params: { 
                resetPasswordToken: this.props.match.params.token,
            }
       })
       .then(response => {
           if (response.data.message === 'password reset link a-ok') {
               this.setState({
                   email: response.data.email,
               })
           }
       })
    }

    updatePassword = (email, password) => {
        // eslint-disable-next-line no-undef
        axios.post('http://localhost:9000/api/users/updatePassword' , {
            email,
            password
       })
        .then(response => {
            this.setState({
                msgFromServer: response.data.message,
            })
        })
        .catch(error => {
            console.log(error)
            this.setState({
                msgFromServer: 'generic error',
            })
        })
    } 

    onSubmit = (evt) => {
        evt.preventDefault();
        this.updatePassword(this.state.email, this.state.password);
    }

    inputChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            [name]: value
        })
    }     

    render() {
        return (
            <div className='form-container rounded mx-auto d-block'>
                {this.state.msgFromServer === 'password updated' && (
                    <div className="alert alert-success" role="alert">
                        Password has been updated. <Link to='/logon'>Log on </Link> again.
                    </div>
                )}
                {this.state.msgFromServer === 'generic error' && (
                    <div className="alert alert-danger" role="alert">
                        Error! For some reason we cant update for password. Please try again and if persists contanct with a Caretaker admin
                    </div>
                )}
                <div className="card border-dark mb-3 border-card">
                    <div className="card-header">Change your password</div>
                    <div className="card-body text-dark">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="password">New Password</label>
                                <input type="password" className="form-control" id="password" name="password" onChange={this.inputChange} value={this.state.password} />
                            </div>
                            <button type="submit" className="btn btn-danger">Change password</button>
                        </form>
                    </div>
                </div> 
            </div>
        );
    }
}
