import React from 'react';
import { Link } from 'react-router-dom';
import '../btn.css';

const btn_colors = ['ct-primary', 'ct-alternate', 'ct-success', 'ct-warning', 'ct-danger '];
const btn_sizes = ['ct-btn-lg', 'ct-btn-sm'];

function BtnUser(props){
    let size = props.vals?props.vals.size:'';
    let color = props.vals?props.vals.color:'ct-primary';
    let title = props.vals?props.vals.title:'click here';
    let isLinked = props.redirect&&props.redirect=='link'?true:false;
    let redirect =  props.redirect?props.redirect.link:'';
    return (
        <>
            {
                isLinked?<Link to={redirect}><button className={`btn ct-btn  ${color} ${size}`}>{title}</button></Link>
                    :<button className={`btn ct-btn  ${color} ${size}`}>{title}</button>
            }
            
        </>
    );
}

export default BtnUser;