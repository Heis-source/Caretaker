import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Login from "../_jsx/login/login";
import Logon from "../_jsx/logon/logon";
import Ads from "../_jsx/ads/ads";
import CreateAd from "../_jsx/ads/createAd"
import Profile from "../_jsx/profile/profile"
import RememberPassword from "../_jsx/recovery/rememberPassword"
import ResetPassword from "../_jsx/recovery/resetPassword"

const StyledLink = styled(Link)`
    color: palevioletred;
	font-size: 1.25em;
	margin: .5em;
    
    :hover{
        text-decoration: none;
        color: #FFEAD0;
    }
`;

localStorage.getItem('token');


export default class Home extends Component {
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
                        <Route path="/" component={Ads} />
                    </Switch>    
            </Router>
        );
    }
}