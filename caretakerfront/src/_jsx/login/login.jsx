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
            photo: '',
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
    }

    getRegister = (email, password, username, biography, photo, state) => {
        const fd = new FormData();
        fd.append('email', email);
        fd.append('password', password);
        fd.append('username', username);
        fd.append('biography', biography);
        fd.append('photo', photo);
        fd.append('state', state);
        axios({
            method: 'POST',
            url: 'http://localhost:9000/api/users',
            data: fd,
        })
        .then(() => {
            this.props.history.push('/login');
            alert("Todo ok!");
        })
        .catch(error => {
            alert("Something is wrong! Try again!");
        })
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        const imgaux = document.getElementById('photo').files[0];
        this.getRegister(this.state.email, this.state.password, this.state.username, this.state.biography, imgaux, this.state.state);
    }

    render() {
        return (
            <div className='form-container rounded mx-auto d-block'>
                <div className="card border-dark mb-3 border-card">
                    <div className="card-header">Creating a new user</div>
                    <div className="card-body text-dark">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="photo">Avatar</label>
                                <input type="file" className="form-control-file" id="photo" name="photo" />
                            </div>
                            <div class="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={this.inputChange} value={this.state.email}/>
                                <Link to="/login"><small id="emailHelp" class="form-text text-muted">I dont remember my own password!</small></Link>
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