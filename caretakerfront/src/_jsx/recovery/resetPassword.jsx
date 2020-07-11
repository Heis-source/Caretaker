import React, { Component } from "react";
import '../../_css/register.css';
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

    componentDidMount() {
        axios.get('http://localhost:9000/api/users/reset' , {
            params: { 
                resetPasswordToken: this.props.match.params.token,
            }
       })
       .then(response => {
           console.log(response)
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
            if (response.data.message === 'password updated') {
                this.props.history.push('/login');
            }
        })
        .catch(error => {
            console.log(error.data)
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
