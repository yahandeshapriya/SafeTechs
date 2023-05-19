import React from 'react';
import '../card.css';

function CardItem(props){
    const title = props.model?props.model.title:"NO TITLE";
    const subtitle = props.model?props.model.subtitle:"NO TITLE";
    const content = props.model?props.model.content:"NO DESCRIPTION";
    const buttons = props.model.items[0].buttons?props.model.items[0].buttons:[];
    const price = props.model?props.model.price:0;
    const discount = props.model?props.model.discount:"NO DISCOUNT";
    const image = props.model.image;
    const url = props.model.url;
    return (
        <div className="ct-card-item">
             <div className="ct-card-side">
                 <img src="http://pngimg.com/uploads/triangle/triangle_PNG44.png" alt="IMG" />
             </div>
             <div className="ct-card-side">
                 <div className="ct-card-head">
                     <h4 className="ct-font-lg">ITEM NAME</h4>
                     <small>Tag Line</small>
                     <div className="hr-spacer"></div>
                     <div className="hr-spacer"></div>
                 </div>
                 <div className="ct-card-body">
                     <p>A group of high school misfits who cant stay out of trouble are given an assignment in their broadcasting class in order to graduate. 
                         all hell breaks loose. late nights and crazy antics are a thing of the past for these friends. well, maybe not. for Stephen, Kevin and 
                         Ryan, making the transition to stoner slackers to high school grads can be tricky, since they don't take anyone or anything seriously.</p>
                    <div className="text-center">
                        <h4 className="ct-font-lg">Rs.25/=</h4>
                        <button className="btn ct-btn ct-success">Buy</button>
                        <button className="btn ct-btn ct-primary">More</button>
                    </div>
                 </div>
             </div>
        </div>
    );
}

export default CardItem;
