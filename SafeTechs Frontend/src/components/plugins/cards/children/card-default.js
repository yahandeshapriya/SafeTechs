import React from 'react';
import BtnSmart from '../../buttons/btn-smart';
import '../card.css';

function CardDefault(props) {
    
    const title = props.model?props.model.title:"NO TITLE";
    const subtitle = props.model?props.model.subtitle:"NO TITLE";
    const content = props.model?props.model.content:"NO DESCRIPTION";
    const buttons = props.model.items[0].buttons?props.model.items[0].buttons:[];
    // const price = props.model?props.model.price:0;
    // const discount = props.model?props.model.discount:"NO DISCOUNT";
    // const image = props.model.image;
    // const url = props.settings.url;
    return (
        <div className="ct-card">
            <div className="ct-card-head">
                <h4>{title}</h4>
                <small>{subtitle}</small>
                <hr></hr>

            </div>
            <div className="ct-card-body">
                <p>{content}</p>
                <div className="text-center">
                    {
                        buttons.length>0?buttons.map(element=><BtnSmart vals={element}/>):<></>
                    }
                    {/* <button className="btn ct-btn ct-alternate">{card_btn_cap}</button> */}
                </div>
            </div>

        </div>
    );
}

export default CardDefault;

