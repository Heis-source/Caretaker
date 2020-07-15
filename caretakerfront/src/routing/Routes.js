import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Login from "../_jsx/login/login";
import Logon from "../_jsx/logon/logon";
import Ads from "../_jsx/ads/ads";
import CreateAd from "../_jsx/ads/createAd"
import Details from "../_jsx/ads/details"
import Profile from "../_jsx/profile/profile"
import RememberPassword from "../_jsx/recovery/rememberPassword"
import ResetPassword from "../_jsx/recovery/resetPassword"
import axios from 'axios';


const StyledLink = styled(Link)`
    color: palevioletred;
	font-size: 1.25em;
	margin: .5em;
    
    :hover{
        text-decoration: none;
        color: #FFEAD0;
    }
`;

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            loggedIn: true,
        };
    }

    componentDidMount() {
        const now = new Date().getTime();
        const token = localStorage.getItem('token');

        if (now-token > 24*60*60*1000) {
            localStorage.clear()
        } else {
            axios.post('http://localhost:9000/api/users/session' , {
                token
            })
            .then(response => {
                const user = response.data.result;
                if (!user) {
                    this.setState({ loggedIn: true });               
                }
            })
            .catch(error => {
                this.setState({ loggedIn: false }); 
            })
        }
    }

    render() {
        return (
            <Router>       
                <Navbar className="menu" collapseOnSelect expand="lg">
                    <StyledLink to="/">Caretaker</StyledLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto"></Nav>
                            <Nav>
                                <StyledLink to="/">Ads</StyledLink>
                                <StyledLink to="/login">Register</StyledLink>
                                <StyledLink to="/logon">Sign in</StyledLink>
                                <StyledLink to ="/profile">My Account</StyledLink>
                            </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/logon" component={Logon} />
                    <Route path="/createAd" component={CreateAd} />
                    <Route path="/rememberPassword" component={RememberPassword} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/reset/:token" component={ResetPassword} />
                    <Route path="/details/:id" component={Details} />
                    <Route path="/" component={Ads} />
                </Switch>    
            </Router>
        );
    };
 }
