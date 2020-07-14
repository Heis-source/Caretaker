import React, { Component } from "react";
import axios from 'axios'
import '../../_css/ads.css';
import { Link } from "react-router-dom";

export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            user: [],
        }
    }

    componentDidMount = () => {
        this.search(this.props.match.params.id);
    }   
    
    search = (id) => {
        // eslint-disable-next-line no-undef
        axios.get('http://localhost:9000/api/ads/' + id)
        .then(response => {
            const data = response.data.result;
            this.setState({ data });
            this.searchUserInfo(this.state.data.username)
        })
        .catch(error => {

        })
    }

    searchUserInfo = (username) => {
        axios.post('http://localhost:9000/api/users/usernameAds' , {
            username
        })
        .then(response => {
            const user = response.data.result;
            if (user) {
               this.setState({ user });
            }
        })
        .catch(error => {
            
        })
    }

    render() {
        console.log(this.state);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-md-6">
                        <div className="mb-2">
                            <img className="w-100" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
                        </div>
                        <div className="mb-2 d-flex">
                        <h4 className="font-weight-normal"><Link to={`/details/${this.state.user.username}`}>{this.state.user.username}</Link></h4>
                        <div className="social d-flex ml-auto">
                            <p className="pr-2 font-weight-normal">Share: </p>
                            <a href="#" className="text-muted mr-1">
                            <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-muted mr-1">
                            <i className="fab fa-twitter"></i>
                            </a>
                        </div>
                        </div>
                        <div className="mb-2">
                            <ul className="list-unstyled">
                                <li className="media">
                                    <span className="w-25 text-black font-weight-normal">What:</span>
                                    <label className="media-body">{this.state.data.name}</label>
                                </li>
                                <li className="media">
                                    <span className="w-25 text-black font-weight-normal">Need or Offer?: </span>
                                    {this.state.data.sell === true && (
                                        <label className="media-body">Wanted</label>
                                    )}
                                    {this.state.data.sell === false &&  (
                                        <label className="media-body">Offering</label>
                                    )}
                                </li>
                                <li className="media">
                                    <span className="w-25 text-black font-weight-normal">Donde: </span>
                                    <label className="media-body">{this.state.data.where}</label>
                                </li>
                                <li className="media">
                                    <span className="w-25 text-black font-weight-normal">Price: </span>
                                    <label className="media-body">{this.state.data.price} $/hour</label>
                                </li>
                                <li className="media">
                                    <span className="w-25 text-black font-weight-normal">Location: </span>
                                    <label className="media-body">{this.state.data.provincia}</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-6 pl-xl-3">
                        <h5 className="font-weight-normal">Description</h5>
                        <p>Along with your plans, you should consider developing an action orientation that will keep you motivated to move forward at all times. This requires a little self-discipline, but is a crucial component to achievement of any kind. Before starting any new activity, ask yourself if that activity will move you closer to your goals. If the answer is no, you may want to reconsider doing it at that time.</p>
                        <div className="my-2 bg-light p-2">
                            <p className="font-italic mb-0">The price is something not necessarily defined as financial. It could be time, effort, sacrifice, money or perhaps, something else.</p>
                        </div>
                        <ul className="list list-unstyled mb-3">
                            <li className="text-secondary font-weight-normal mb-1">
                                <span className="ti-arrow-right pr-1 text-primary"></span>
                                Commitment is something that comes from understanding that!
                            </li>
                            <li className="text-secondary font-weight-normal mb-1">
                                <span className="ti-arrow-right pr-1 text-primary"></span>
                                Its price and then having the willingness to pay that price.
                            </li>
                            <li className="text-secondary font-weight-normal mb-1">
                                <span className="ti-arrow-right pr-1 text-primary"></span>
                                Out after the fact that the price was too high.
                            </li>
                            <li className="text-secondary font-weight-normal mb-1">
                                <span className="ti-arrow-right pr-1 text-primary"></span>
                                This is important because nobody wants to put significant.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}