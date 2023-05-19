import React from 'react';
import './card.css';
import CardDefault from './children/card-default';
import CardItem from './children/card-item';
import CardProfile from './children/card-profile';

const card_colors = ['ct-primary', 'ct-alternate', 'ct-success', 'ct-warning', 'ct-danger '];

const card_sizes = ['ct-btn-lg', 'ct-btn-sm'];

const card_mode = ['ct-btn', 'ct-clip-btn'];

const default_val = {type:"default", title:"Sample Card", color:card_colors[0], content:'No Content available', items: [{buttons : [{type:"default", title:"click here", color:card_colors[0], size: ''}]}]};

export const CardSmart = (props) => {

    const info = props.model?props.model:default_val;
    const type = props.model?props.model.type:"default";

    
    
    return (
        <>
            {
                type==='item'?<CardItem model={info} />
                    :type==='profile'?<CardProfile model={info}/>
                    :<CardDefault model={info} />
            }
            {/* <div className="ct-card-item">
                <div className="ct-card-side">
                    <img src="https://www.freeiconspng.com/uploads/add-item-icon-orange-1.png" alt="IMG" />
                </div>
                <div className="ct-card-side">
                    <div className="ct-card-head">
                        <h4 className="ct-font-lg">{name}</h4>
                        <small>Tag Line</small>
                        <div className="hr-spacer"></div>
                        <div className="hr-spacer"></div>
                    </div>
                    <div className="ct-card-body">
                        <p>{info}</p>
                        <div className="text-center">
                            <h4 className="ct-font-lg">Rs.{price}/=</h4><span>{discount}</span>
                            <button className="btn ct-btn ct-success">Buy</button>
                            <button className="btn ct-btn ct-primary">More</button>
                        </div>
                    </div>
                </div>
            </div> */}
            
        </>
    );


}