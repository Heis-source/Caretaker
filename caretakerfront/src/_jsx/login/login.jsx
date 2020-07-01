import React, { Component } from "react";
import { Button, Form, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            biography: '',
            state: '',
            stateArray: [],
        };    
    }

    componentDidMount () {
        axios.get('http://localhost:9000/api/users/state')
            .then(response => {
                const stateArray = response.data;
                this.setState({ stateArray });
            })
            .catch(error => {
                console.log("error");
            })
    }

    inputChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            [name]: value
        })
        console.log(this.state.state)
    }

    getRegister = (email, password, biography, state) => {
        axios.post('http://localhost:9000/api/users', {
            email,
            password,
            biography,
            state,
        })
        .then(() => {
            alert("Todo ok!");
            //this.props.history.push('/login');
        })
        .catch(error => {
            alert("Something is wrong! Try again!");
        })
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        this.getRegister(this.state.email, this.state.password, this.state.biography, this.state.state);
    }

    render() {

        const stateList = this.state.stateArray
        const renderStates = stateList.map((item, i) => 
            <option key={item + i} value={item}>{item}</option>)

        return (
            <Container>
                <Row>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Email" onChange={this.inputChange} value={this.state.email} />
                            <Form.Text className="text-muted">
                            <Link to='/logon'>I have account. Redirect to LogOn page</Link>
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" onChange={this.inputChange} value={this.state.password} />
                        </Form.Group>
                        <Form.Group controlId="formBasicBiography">
                            <Form.Label>Biography</Form.Label>
                            <Form.Control name="biography" type="textarea" placeholder="Something about you..." onChange={this.inputChange} value={this.state.biography} />
                        </Form.Group>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>Select with three visible options</Form.Label>
                            <Form.Control as="select" name='state' onChange={this.inputChange} value={this.state.state}>
                                {renderStates}
                            </Form.Control>
                        </Form.Group>       
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Row>
            </Container>    
        );
    }
}