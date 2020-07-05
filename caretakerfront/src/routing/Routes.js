import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Login from "../_jsx/login/login";
import Logon from "../_jsx/logon/logon";
import Ads from "../_jsx/ads/ads";
import CreateAd from "../_jsx/ads/createAd"

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
    render() {
        return (
            <Router>
                <Navbar className="menu" collapseOnSelect expand="lg">
                    <StyledLink to="/">KeepAds</StyledLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto"></Nav>
                        <Nav>
                            <StyledLink to="/ads">Ads</StyledLink>
                            <StyledLink to="/login">Register</StyledLink>
                            <StyledLink to="/logon">Sign in</StyledLink>
                            <StyledLink to ="/account">My Account</StyledLink>                                
                            <Redirect from="/" to='/ads' />
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/logon" component={Logon} />
                        <Route path="/ads" component={Ads} />
                        <Route path="/createAd" component={CreateAd} />
                    </Switch>    
            </Router>
        );
    }
}