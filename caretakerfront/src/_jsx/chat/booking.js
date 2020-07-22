import React, { Component } from "react";
import '../../_css/register.css';
import axios from 'axios';

export default class ChatRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            socketId: [],
            urlSocket: 'http://127.0.0.1:9000/'
        }
    }
    
    componentDidMount() {
    
    }
    


    
}