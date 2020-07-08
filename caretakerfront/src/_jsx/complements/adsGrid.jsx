import React, { Component } from "react";
import makingURL from '../../routing/urlCrafter';
import States from '../../routing/state'
import { Link } from "react-router-dom";
import axios from 'axios';

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
        };
    }

    search = () => {
        axios.get('http://localhost:9000/api/ads')
        .then(response => {
            const data = response.data;
            this.setState({ data });
        })
    }
    
    render() {
        const { data } = this.state;
        const renderAds = data.map((d) =>
        <div className="card mb-5" key={d._id}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={d.photo} className="card-img" alt={d.name} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{d.name}</h5>
                        <p className="card-text">{d.description}</p>
                        <p className="card-text">Price: <span>{d.price}</span></p>
                        <p className="card-text">Tags: <span>{d.tags}</span></p>
                        <p className="card-text">Type: <span>{d.type}</span></p>
                    </div>
                    <div className="col-auto my-1">
                        <Link to={`/details/${d._id}`}><button className="btn btn-primary">I want to see more</button></Link>
                        <Link to={`/edit/${d._id}`}><button className="btn btn-warning">Edit</button></Link>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}