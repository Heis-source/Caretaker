import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../_css/register.css';
import axios from 'axios';

export default class Logon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        };    
    }

    inputChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            [name]: value
        })
    }

    logOn = (email, password) => {
        // eslint-disable-next-line no-undef
        axios.post('http://localhost:9000/api/users/logon' , {
            email,
            password,
        })
        .then(response => {
            this.props.history.push('/ads');
            localStorage.setItem('token', response.data.token)
            const now = new Date().getTime();
            localStorage.setItem('setupTime', now);
        })
        .catch(() => {
            this.props.history.push('/login');
        })
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        this.logOn(this.state.email, this.state.password);   
    }

    render() {
        return (
            <div className='form-container rounded mx-auto d-block'>
                <div className="card border-dark mb-3 border-card">
                    <div className="card-header">Log In</div>
                    <div className="card-body text-dark">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="text" className="form-control" id="email" name="email" onChange={this.inputChange} value={this.state.email} />
                                <Link to='/login'><small>I dont have account, go to register.</small></Link>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name="password" onChange={this.inputChange} value={this.state.pass} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div> 
            </div>
        );
    }
}
