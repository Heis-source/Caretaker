import React, { Component } from "react";
import makingURL from '../../routing/urlCrafter';
import { Button, Form, Container } from 'react-bootstrap';
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
        };
    }

    search = () => {
        axios.get('http://localhost:9000/api/ads')
        .then(response => {
            const data = response.data;
            this.setState({ data });
        })
    }
    
    onSubmit = (evt) => {
        evt.preventDefault();
        this.setState({ searched: true });
        //const finalURL = makingURL([this.state.name], [this.state.sell], [this.state.pricemin], [this.state.pricemax]);
        this.search();
    }

    onChangeInput = (evt) => {
        let inputValue = evt.target.value;
        let inputName = evt.target.name;
        this.setState({ [inputName]: inputValue});
    }

    render() {
        const { data } = this.state;
        const renderAds = data.map((d) =>
        <div classNameName="card mb-3" key={d._id}>
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
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Search by name" name='name' onChange={this.onChangeInput} value={this.state.name} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPrice">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="number" placeholder="Price Min" name='pricemin' onChange={this.onChangeInput} value={this.state.pricemin} />
                        <Form.Control type="number" placeholder="Price Max" name='pricemax' onChange={this.onChangeInput} value={this.state.pricemax} />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Control as="select" name='state' onChange={this.onChangeInput} value={this.state.state}>
                            <States />
                        </Form.Control>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Search
                    </Button>
                </Form>
                {renderAds}           
            </Container>        
        );
    }
}
