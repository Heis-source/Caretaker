import React, { Component } from "react";
import axios from 'axios'
import '../../_css/ads.css';
import { Link } from "react-router-dom";

export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            ads: [],
            user: [],
            comment: [],
            msgFromServerData: '',
            msgFromServerAds: '',
            msgFromServerUser: '',
            userForComments: '',
            comment: '',
            ad_Id: '',
        }
    }

    componentDidMount = () => {
        this.search(this.props.match.params.id);
    }   
    
    search = (id) => {
        axios.get('http://localhost:9000/api/ads/' + id)
        .then(response => {
            const data = response.data.result;
            this.setState({ data });
            this.searchUserInfo(this.state.data.username)
            this.searchAdsInfo(this.state.data.username)
            this.whoIam();
        })
    }

    whoIam = () => {
        const token = localStorage.getItem('token');
        axios.post('http://localhost:9000/api/users/session' , {
            token
        })
        .then(response => {
            const comment = response.data.result;
            this.setState({ comment })
            
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
    }

    searchAdsInfo = (username) => {
        axios.get('http://localhost:9000/api/ads/?username='+ username +'&limit=4')
        .then(response => {
            const ads = response.data;
            if (ads) {
               this.setState({ ads, msgFromServerAds: 'no ads found' });
            }

            axios.get('http://localhost:9000/api/comment/search?ad_Id=' + this.state.data.ad_Id + "&limit=4")
            .then(response => {
                console.log(response.data)
            })

        })
        .catch(error => {
            this.setState({
                msgFromServerAds: 'no ads found',
            })
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
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/api/comment/add' , {
            username: this.state.userForComments,
            comment: this.state.comment,
            ad_Id: this.state.data._id,
        })
    }

    inputChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            [name]: value
        })
    }

    render() {
        const { ads } = this.state;
        const renderAds = ads.map((d) =>
        <div className="col-md-3 col-sm-6 mb-4" key={d._id} >
            <Link to={`/details/${d._id}`}>
                <img className="img-fluid" src="http://placehold.it/500x300" alt="" />
                <small>{d.name}</small>
            </Link>
        </div>
        )
        return (
            <div className="container">
                <h1 className="my-4">{this.state.data.name}
                    <small> by: <Link to={`/profile/${this.state.user.username}`}>{this.state.user.username}</Link></small>
                </h1>
                <div className="row">
                    <div className="col-md-8">
                        <img className="img-fluid" src="http://placehold.it/750x500" alt="" />
                    </div>
                    <div className="col-md-4">
                        <h3 className="my-3">Description</h3>
                            <p>{this.state.data.description}</p>
                        <h3 className="my-3">Some details</h3>
                        <ul>
                            {this.state.data.where === true && (
                                <li>In your House</li>
                            )}
                            {this.state.data.where === false && (
                                <li>In my House</li>
                            )}
                            {this.state.data.sell === true && (
                                <li>Offering</li>
                            )}
                            {this.state.data.sell === false && (
                                <li>Wanted</li>
                            )}
                            <li>{this.state.data.provincia}</li>
                            <li>{this.state.data.price} $/hour</li>
                        </ul>
                    </div>
                </div>
                <h5 className="my-3">Review</h5>
                <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">List group item heading</h5>
                            <small>3 days ago</small>
                        </div>
                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                        <small>Donec id elit non mi porta.</small>
                    </a>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="comment"></label>
                            <textarea className="form-control" placeholder='Send some review' id="comment" name="comment" rows="3" onChange={this.inputChange}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Send review</button>
                    </form>                                     
                </div>
                <h3 className="my-4">Related Ads</h3>
                <div className="row">
                    {renderAds}
                </div>
            </div>
        )
    }
}