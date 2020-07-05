import React, { Component } from "react";
import States from '../../routing/state'
import { Link } from "react-router-dom";
import axios from 'axios';

export default class createAd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            username: '',
            description: '',
            where: true,
            sell: true,
            price: '',
            photo: '',
            provincia: 'Albacete',
            createdAt: new Date(),
        };
    }

    adsSaveData = (name, username, where, description, sell, price, photo, provincia, createdAt) => {
        axios.post('http://localhost:9000/api/ads', {
            name,
            username,
            where,
            description,
            sell,
            price,
            photo,
            provincia,
            createdAt,
        })
        .then(() => {
            console.log("OK")
        })
        .catch(() => {
            console.log("NO")
        })
    }
    
    onSubmit = (evt) => {
        evt.preventDefault();
        this.adsSaveData(this.state.name, this.state.username, this.state.where, this.state.description, this.state.sell, this.state.price, this.state.photo, this.state.provincia, this.state.createdAt);
        console.log(this.state.name, this.state.username, this.state.where, this.state.description, this.state.sell, this.state.price, this.state.photo, this.state.provincia, this.state.createdAt)
    }

    onChangeInput = (evt) => {
        let inputValue = evt.target.value;
        let inputName = evt.target.name;
        this.setState({ [inputName]: inputValue});
    }

    render() {
        return(
            <form onSubmit={this.onSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="name">Title</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={this.onChangeInput} value={this.state.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={this.onChangeInput} value={this.state.description} />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" className="form-control" id="price" name="price" onChange={this.onChangeInput} value={this.state.price} />
                </div>
                <div className="form-group">
                    <label htmlFor="where">Where</label>
                    <select onChange={this.onChangeInput} value={this.state.where} name="where" id="where" className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                        <option value="true">YourHouse</option>
                        <option value="false">MyHouse</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="sell">What do you need?</label>
                    <select onChange={this.onChangeInput} value={this.state.sell} name="sell" id="sell" className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                        <option value="true">Needed</option>
                        <option value="false">Offer</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <select onChange={this.onChangeInput} value={this.state.provincia} name="provincia" id="state" className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                        <States />
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input type="file" name='photo' className="form-control-file" id="photo" onChange={this.onChangeInput} value={this.state.photo} />
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        )
    }
}