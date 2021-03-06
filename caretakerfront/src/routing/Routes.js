import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Login from "../_jsx/login/login";
import Logon from "../_jsx/logon/logon";
import Ads from "../_jsx/ads/ads";
import CreateAd from "../_jsx/ads/createAd"
import EditAd from "../_jsx/ads/editAds"
import Details from "../_jsx/ads/details"
import Profile from "../_jsx/profile/profile"
import RememberPassword from "../_jsx/recovery/rememberPassword"
import ResetPassword from "../_jsx/recovery/resetPassword"
import Delete from "../_jsx/delete/delete"
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
            loggedIn: false,
            token: '',
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token') 
        const now = new Date().getTime();
        if (now-token > 24*60*60*1000) {
            localStorage.clear()
        } else {
            this.logOn(token)
        }
    }

    logOn(token) {
        axios.post('http://localhost:9000/api/users/session' , {
            token
        })
        .then(response => {
            const user = response.data.result;
            if (user) {
                this.setState({ user, loggedIn: true });
            }
        })
    }

    handleLogout = () => {
        localStorage.clear();
    }

    render() {
        const renderNavBar = <Navbar className="menu" collapseOnSelect expand="lg">
            <StyledLink to="/">Caretaker</StyledLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                        <StyledLink to="/">Ads</StyledLink>
                        {this.state.loggedIn === false && (
                            <StyledLink to="/login">Register</StyledLink>
                        )}
                        {this.state.loggedIn === false && (
                            <StyledLink to="/logon">Sign in</StyledLink>
                        )}
                        {this.state.loggedIn === true && (
                            <StyledLink to="/profile">Welcome {this.state.user.username}</StyledLink>
                        )}
                        {this.state.loggedIn === true && (
                            <StyledLink to="/logout" onClick={this.handleLogout}>Logout</StyledLink>
                        )}
                    </Nav>
            </Navbar.Collapse>
        </Navbar>
        return (
            <Router>
                {renderNavBar}
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/delete" component={Delete} />
                    <Route path="/logon" component={Logon} />
                    <Route path="/createAd" component={CreateAd} />
                    <Route path="/rememberPassword" component={RememberPassword} />
                    <Route path="/profile/:username" component={Profile} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/reset/:token" component={ResetPassword} />
                    <Route path="/details/:id" component={Details} />
                    <Route path="/edit/:id" component={EditAd} />
                    <Route path="/" component={Ads} />
                </Switch>    
            </Router>
        );
    };
 }
