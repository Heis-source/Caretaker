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

    render() {
        return (
            <div className="container">
                <div className="card-header">Welcome {this.state.user.username}</div>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlFile1">Example file input</label>
                        <input type="file" className="form-control-file" />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" id="email" name="email" value={this.state.user.email} />
                        </div>
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" name="password" id="password" />
                        </div>
                        <label htmlFor="biography" className="col-sm-2">Biography</label>
                        <div className="col-sm-10">
                            <textarea type="text" name="biography" id="biography" value={this.state.user.biography} />
                        </div>
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                            <input type="text" name="username" id="username"/>
                        </div>
                        <label htmlFor="state" className="col-sm-2 col-form-label">State</label>
                        <div className="col-sm-10">
                            <select name='state' value={this.state.user.state} className="custom-select mr-sm-2">
                                <States />
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}