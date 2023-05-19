import React from 'react';
import BtnDefault from './children/btn-default';
import './btn.css';
import BtnClip from './children/btn-clip';

const btn_colors = ['ct-primary', 'ct-alternate', 'ct-success', 'ct-warning', 'ct-danger '];
const btn_sizes = ['ct-btn-lg', 'ct-btn-sm'];

const default_val = {type:"default", title:"click here", color:btn_colors[0], size: ''};

function BtnSmart(props){

    let values = props.vals?props.vals:default_val;
    let redirect = props.redirect?props.redirect:null;

    let type = props.vals?props.vals.type:"default";

    return (
        <>
            {
                type=="default"?<BtnDefault vals={values} redirect={redirect}/>
                    :type=="clip"?<BtnClip vals={values} redirect={redirect}/>
                    :<BtnDefault vals={values} redirect={redirect}/>
            }

        </>
    );
}

export default BtnSmart;