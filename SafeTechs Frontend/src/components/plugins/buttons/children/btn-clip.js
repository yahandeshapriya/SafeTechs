import React from 'react';
import { Link } from 'react-router-dom';
import '../btn.css';

const btn_colors = ['ct-primary', 'ct-alternate', 'ct-success', 'ct-warning', 'ct-danger '];
const btn_sizes = ['ct-btn-lg', 'ct-btn-sm'];

function BtnClip(props){
    let size = props.vals?props.vals.size:'';
    let color = props.vals?props.vals.color:'ct-primary';
    let title = props.vals?props.vals.title:'click here';
    let isLinked = props.redirect&&props.redirect=='link'?true:false;
    let redirect =  props.redirect?props.redirect.link:'';
    return (
        <>
            {
                isLinked?
                    <Link to={redirect}>
                        <div class="ct-clip-btn">
                            <input type="text" placeholder="Type Item, Brand etc."/>
                            <a href="#" className={`ct-btn-sm ${color} ${size}`}><i class="fas fa-search"></i></a>
                        </div>
                    </Link>
                    :
                    <div class="ct-clip-btn">
                        <input type="text" placeholder="Type Item, Brand etc."/>
                        <a href="#" className={`ct-btn-sm ${color} ${size}`}><i class="fas fa-search"></i></a>
                    </div>
            }
            
        </>
    );
}

export default BtnClip;