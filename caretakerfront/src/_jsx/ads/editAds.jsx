import React, { Component } from "react";
import States from '../../routing/state'
import { Link } from "react-router-dom";
import axios from 'axios';

export default class createAd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            _id: this.props.match.params.id,
            name: '',
            where: true,
            description: '',
            sell: true,
            price: '',
            photo: '',
            provincia: '',
            updateAt: new Date(),
            msgFromServer: '',
        };
    }

    componentDidMount = () => {
        this.search(this.props.match.params.id);
        const token = localStorage.getItem('token');
        axios.post('http://localhost:9000/api/users/session' , {
            token
        })
        .then(response => {
            const user = response.data.result;
            this.setState({ user });
        })
        .catch(() => {
            this.props.history.push('/ads');
        })
    }

    search = (id) => {
        axios.get('http://localhost:9000/api/ads/edit/' + id)
        .then(response => {
            const data = response.data.result;
            this.setState({ _id: data._id, name: data.name, where: data.where, description: data.description, sell: data.sell, photo: data.photo, price: data.price, provincia: data.provincia});
        })
    }

    adsSaveData = (_id, name, username, where, description, sell, price, photo, provincia, updateAt) => {
        const fd = new FormData();
        fd.append('_id', _id);
        fd.append('name', name);
        fd.append('username', username);
        fd.append('where', where);
        fd.append('description', description);
        fd.append('sell', sell);
        fd.append('price', price);
        fd.append('photo', photo);
        fd.append('provincia', provincia);
        fd.append('updateAt', updateAt);
        axios({
            method: 'post',
            url: 'http://localhost:9000/api/ads/updateAd',
            data: fd,
        })
        .then(response => {
            
        })
        .catch(() => {
            this.setState({ msgFromServer: 'ad edit error' })
        })
    }
    
    onSubmit = (evt) => {
        evt.preventDefault();
        let imgaux = document.getElementById('photo').files[`${this.state.photo}`];
        console.log(imgaux)
        this.adsSaveData(this.state._id, this.state.name, this.state.user.username, this.state.where, this.state.description, this.state.sell, this.state.price, imgaux, this.state.provincia, this.state.updateAt);
    }

    onChangeInput = (evt) => {
        let inputValue = evt.target.value;
        let inputName = evt.target.name;
        this.setState({ [inputName]: inputValue});
    }

    render() {
        return(
            <div className="container">
                {this.state.msgFromServer === 'ad edit error' && (
                    <div className="alert alert-danger" role="alert">
                        Something is wrong on edit! Try again or contact with Caretaker admin!
                    </div>
                )}
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
                        <select onChange={this.onChangeInput} value={this.state.where} name="where" id="where" className="custom-select mr-sm-2">
                            <option value="true">YourHouse</option>
                            <option value="false">MyHouse</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="sell">What do you need?</label>
                        <select onChange={this.onChangeInput} value={this.state.sell} name="sell" id="sell" className="custom-select mr-sm-2">
                            <option value="true">Needed</option>
                            <option value="false">Offer</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <select onChange={this.onChangeInput} value={this.state.provincia} name="provincia" id="state" className="custom-select mr-sm-2">
                            <States />
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo">Photo</label>
                        <input type="file" name='photo' className="form-control-file" id="photo" />
                    </div>
                    <button type="submit" className="btn btn-primary">Edit</button>
                    <Link to={`/details/${this.state._id}`}><button className="btn btn-danger">Back</button></Link>
                </form>
            </div>
        )
    }
}