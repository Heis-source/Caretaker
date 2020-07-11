import React, { Component } from "react";
import States from '../../routing/state'
import axios from 'axios';

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            ads: [],
        };
    }

    componentDidMount = () => {
        const token = localStorage.getItem('token');
        this.logOn(token);
    }

    logOn = (token) => {
        axios.post('http://localhost:9000/api/users/session' , {
            token
        })
        .then(response => {
            const user = response.data.result;
            this.setState({ user });
        })
        .catch(() => {
            console.log("no OK")
        })
    }
    
    onSubmit = (evt) => {
        evt.preventDefault();
    }

    onChangeInput = (evt) => {
        let inputValue = evt.target.value;
        let inputName = evt.target.name;
        this.setState({ [inputName]: inputValue});
    }

    changeRenders = (evt) => {
        evt.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div className="card border-dark mb-2">
                    <div className="card-header text-right mb-3">
                        <button type="button" className="btn btn-link">Edit</button>
                    </div>
                    <form>
                        <div className="form-group offset-md-2 col-md-8">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="photo">Avatar</span>
                                </div>
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="photo" name="photo" />
                                    <label className="custom-file-label" htfor="inputGroupFile01">Choose file</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group offset-md-2 col-md-8">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" >Email</span>
                                </div>
                            <input type="email" readOnly className="form-control" id="email" name="email" value={this.state.user.email} />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Username</span>
                                </div>
                            <input type="text" className="form-control" id="username" name="username" value={this.state.user.username} />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Password</span>
                                </div>
                            <input type="password" className="form-control" id="password" name="password" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Biography</span>
                                </div>
                                <textarea className="form-control" aria-label="With textarea" value={this.state.user.biography}></textarea>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">State</label>
                                </div>
                                <select className="custom-select" id="states" name="states">
                                    <States />
                                </select>                            
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}