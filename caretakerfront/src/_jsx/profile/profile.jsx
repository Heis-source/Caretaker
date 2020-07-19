import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../_css/profile.css';
import axios from 'axios';

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            ads: [],
            commentForUsers: [],
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
            this.loadAds(this.state.user.username);
        })
        .catch(error => {
            console.log(error);
        })
    }

    loadAds = () => {
        axios.post('http://localhost:9000/api/ads/getAds' , {
            username: this.state.user.username,
        })
        .then(response => {
            const ads = response.data.result;
            this.setState({ ads });
        })
        .catch(error => {
            console.log(error);
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
        document.getElementById("photo").setAttribute("disabled", false);
        document.getElementById("password").setAttribute("disabled", false);
        document.getElementById("biography").setAttribute("disabled", false);
        document.getElementById("states").setAttribute("disabled", false);
    }

    render() {
        const { ads } = this.state
        const renderAds = ads.map((c) =>
            <Link to={`/details/${c._id}`} key={c._id}>
                <div className="card">
                    <img className="card-img-top" src="..." alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{c.name}</h5>
                        <p className="card-text">{c.description}</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Location: {c.provincia}</small>
                    </div>
                </div>
            </Link>    
        )
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-md-6">
                        <div className="mb-2">
                            <img className="w-100" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
                        </div>
                        <div className="mb-2 d-flex">
                            <h4 className="font-weight-normal">{this.state.user.username}</h4>
                            <div className="social d-flex ml-auto">
                                <p className="pr-2 font-weight-normal">Follow on:</p>
                                <a href="#" className="text-muted mr-1">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="text-muted mr-1">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="text-muted mr-1">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" className="text-muted">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                        <div className="mb-2">
                            <ul className="list-unstyled">
                                <li className="media">
                                    <span className="w-25 text-black font-weight-normal">Email: </span>
                                    {this.state.user.showemail === true && (
                                        <label className="media-body">{this.state.user.email}</label>
                                    )}
                                    {this.state.user.showemail === false && (
                                        <label className="media-body">**************</label>
                                    )}
                                </li>
                                <li className="media">
                                    <span className="w-25 text-black font-weight-normal">Location:</span>
                                    <label className="media-body">{this.state.user.state}</label>
                                </li>
                                <li className="media">
                                    <span className="w-25 text-black font-weight-normal">Rating: </span>
                                    <label className="media-body">{this.state.user.rating}/5</label>
                                </li>                                
                                <li className="media">
                                    <div className="btn-group btn-block" role="group">
                                        <button type="button" className="btn btn-success active">Chat with {this.state.user.username}</button>
                                        <button type="button" className="btn btn-warning active">Report</button>
                                    </div>
                                </li>
                                <li className="media">
                                <Link to="/delete" className="btn btn-danger btn-block delete-btn active">Delete account {this.state.user.username}</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-6 pl-xl-3">
                        <h4 className="font-weight-normal">Some information about me</h4>
                        <p>{this.state.user.biography}</p>
                        <h4 className="my-3">Opinions about {this.state.user.username}</h4>
                        <div className="list-group">
                            <a href="#" className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <h6 className="mb-1 text-center">We dont have any review to show</h6>
                                </div>
                            </a>
                        </div>
                        <h4 className="my-3">My Ads</h4>
                        <div className="card-group">
                            {renderAds}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}