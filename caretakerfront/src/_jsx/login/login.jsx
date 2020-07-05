import React, { Component } from "react";
import { Link } from "react-router-dom";
import States from '../../routing/state'
import '../../_css/register.css';

import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            username: '',
            biography: '',
            state: '',
            stateArray: [],
        };    
    }

    componentDidMount () {
        axios.get('http://localhost:9000/api/users/state')
            .then(response => {
                const stateArray = response.data;
                this.setState({ stateArray });
            })
            .catch(error => {
                console.log("error");
            })
    }

    inputChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            [name]: value
        })
        console.log(this.state.state)
    }

    getRegister = (email, password, username, biography, state) => {
        axios.post('http://localhost:9000/api/users', {
            email,
            password,
            username,
            biography,
            state,
        })
        .then(() => {
            alert("Todo ok!");
            this.props.history.push('/login');
        })
        .catch(error => {
            alert("Something is wrong! Try again!");
        })
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        this.getRegister(this.state.email, this.state.password, this.state.biography, this.state.state);
    }

    render() {
        return (
            <div className='form-container rounded mx-auto d-block'>
                <div className="card border-dark mb-3 border-card">
                    <div className="card-header">Creating a new user</div>
                    <div className="card-body text-dark">
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={this.inputChange} value={this.state.email}/>
                                <Link to="/login"><small id="emailHelp" class="form-text text-muted">i dont remember</small></Link>
                            </div>
                            <div class="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" class="form-control" id="password" name="password" onChange={this.inputChange} value={this.state.password} />
                            </div>
                            <div class="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" class="form-control" id="username" name="username" onChange={this.inputChange} value={this.state.username} />
                            </div>
                            <div class="form-group">
                                <label htmlFor="biography">Biography</label>
                                <input type="text" class="form-control" id="biography" name="biography" onChange={this.inputChange} value={this.state.biography} />
                            </div>
                            <div class="form-group">
                                <label htmlFor="state">State</label>
                                <select class="form-control" id="state" name="state" onChange={this.inputChange} value={this.state.state}>
                                    <States />
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div> 
            </div>
        );
    }
}