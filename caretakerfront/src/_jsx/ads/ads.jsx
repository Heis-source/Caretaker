import React, { Component } from "react";
import makingURL from '../../routing/urlCrafter';
import States from '../../routing/state'
import '../../_css/ads.css';
import { Link } from "react-router-dom";
import axios from 'axios'

export default class Ads extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            name: '',
            sell: '',
            pricemin: 0,
            pricemax: 0,
            state: '',
            limit: '',
            loggedIn: false,
        };
    }

    componentDidMount = () => {
        const token = localStorage.getItem('token');
        axios.post('http://localhost:9000/api/users/session' , {
            token
        })
    }

    search = () => {
        axios.get('http://localhost:9000/api/ads')
        .then(response => {
            const data = response.data;
            this.setState({ data });
            this.setState({ limit: data.length });
        })
    }
    
    onSubmit = (evt) => {
        evt.preventDefault();
        const finalURL = makingURL([this.state.name], [this.state.sell], [this.state.pricemin], [this.state.pricemax], [this.state.state]);
        this.search(finalURL);
    }

    onChangeInput = (evt) => {
        let inputValue = evt.target.value;
        let inputName = evt.target.name;
        this.setState({ [inputName]: inputValue});
    }

    render() {
        const { data } = this.state;
        const renderAds = data.map((d) =>
            <div className="product mx-auto" key={d._id}>
                <div className="img-container">
                    <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?dpr=1&auto=compress,format&fit=crop&w=1400&h=&q=80&cs=tinysrgb&crop=" />
                </div>
                <div className="product-info">
                    <div className="product-content">
                        <h1>{d.name}</h1>
                        <p>{d.description}</p>
                        <ul>
                            {d.where === true && (
                                <li>In your house</li>
                            )}
                            {d.where === false && (
                                <li>In my house</li>
                            )}
                            {d.sell === true && (
                                <li>Wanted</li>
                            )}
                            {d.sell === false && (
                                <li>Offering</li>
                            )}
                            <li>Location: {d.provincia}</li>
                        </ul>
                        <div className="buttons">
                            <Link to={`details/${d._id}`} className="button buy">See more</Link>
                            <Link to={`buy/${d._id}`} className="button add">Book this!</Link>
                            <span className="button" id="price">{d.price} €/hour</span>
                        </div>
                    </div>
                </div>
            </div>
        )
        return (
            <div className="container">
                <div className='rounded mx-auto d-block'>
                    <div className="card bg-light mb-3 styled-card" >
                        <div className="card-header">Filters! Filters!</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Name</span>
                                    </div>
                                    <input type="text" name='name' onChange={this.onChangeInput} value={this.state.name} placeholder='Name...' className="form-control" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Price</span>
                                    </div>
                                    <input type="number" name='pricemin' onChange={this.onChangeInput} className="form-control" placeholder="Min" aria-describedby="basic-addon1" />
                                    <input type="number" name='pricemax' onChange={this.onChangeInput} className="form-control" placeholder="Max" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">State</span>
                                    </div>
                                    <select name='state' onChange={this.onChangeInput} value={this.state.state} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                        <States />
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Sell or buy?</span>
                                    </div>
                                    <select onChange={this.onChangeInput} value={this.state.sell} name="sell" className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                        <option value='null'>All</option>
                                        <option value='true'>Wanted</option>
                                        <option value='false'>Offer</option>
                                    </select>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary button-send">Filter</button>
                                    {this.state.loggedIn === true && (
                                        <Link to={`/createAd`} className="btn btn-success">Create Ad</Link>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
                {renderAds}
                
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">1</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">2</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">3</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul> 
            </div>
        );
    }
}