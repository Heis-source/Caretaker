import React, { Component } from "react";
import makingURL from '../../routing/urlCrafter';
import States from '../../routing/state'
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
        };
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
        console.log(finalURL)
    }

    onChangeInput = (evt) => {
        let inputValue = evt.target.value;
        let inputName = evt.target.name;
        this.setState({ [inputName]: inputValue});
    }

    render() {
        const { data } = this.state;
        const renderAds = data.map((d) =>
            <div className="col-lg-4 col-sm-6 mb-4" key={d._id}>
                <div className="card h-100">
                    <a href="#">
                        <img className="card-img-top" src="http://placehold.it/700x400" alt="" />
                    </a>
                    <div className="card-body">
                        <h4 className="card-title">
                            <a href="#">{d.name}</a>
                        </h4>
                        <p className="card-text">{d.description}</p>
                        {d.sell === false && (
                            <p className="card-text">Offering</p>
                        )}
                        {d.sell === true && (
                            <p className="card-text">Wanted</p>
                        )}
                        <p className="card-text"><em>Price: {d.price} €</em></p>
                        <p className="card-text">State: {d.provincia}</p>
                    </div>
                    <Link to={`/details/${d._id}`}><button className="btn btn-primary">I want to see more</button></Link>
                </div>
            </div>
        )
        return (
            <div className="container">
                <div className='container-sm rounded mx-auto d-block'>
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
                                <div className="col-auto my-1">
                                    <button type="submit" className="btn btn-primary button-send">Filter</button>
                                    <Link to={`/login`}><button className="btn btn-danger">Go back</button></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="jumbotron">
                    <h1 className="display-6">Create your own advertisement!</h1>
                    <hr className="my-6" />
                    <p>Take care of others' pets when they can't or let them help you!</p>
                    <Link to="/createAd"><button className="btn btn-success">Create Ad</button></Link>
                </div>
                <div className="row">
                    {renderAds}
                </div>
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