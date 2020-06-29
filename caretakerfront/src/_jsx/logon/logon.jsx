import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Container, Row } from 'react-bootstrap';
import axios from 'axios';

export default class Logon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        };    
    }

    inputChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            [name]: value
        })
    }
    

    logOn = (email, password) => {
        // eslint-disable-next-line no-undef
        axios.post('http://localhost:9000/api/users/logon' , {
            email,
            password,
        })
        .then(() => {
            console.log("Hola")
        })
        .catch(() => {
            this.props.history.push('/register');
        })
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        this.logOn(this.state.email, this.state.password);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Email" onChange={this.inputChange} value={this.state.email} />
                            <Form.Text className="text-muted">
                            <Link to="/login">I dont have account. Want to Sign in.</Link>
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" onChange={this.inputChange} value={this.state.password} />
                        </Form.Group>           
                        <Button variant="primary" type="submit">
                            Go in
                        </Button>
                    </Form>
                </Row>
            </Container>   
        );
    }
}
