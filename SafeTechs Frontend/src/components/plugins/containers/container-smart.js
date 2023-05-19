import React from 'react';
import BtnSmart from '../buttons/btn-smart';
import ContainerDefault from './children/container-default';
import './container.css';

const btn_colors = ['ct-primary', 'ct-alternate', 'ct-success', 'ct-warning', 'ct-danger '];
const sample_container = {
    title: "No Title",
    subtitle: "",
    style: {
        left: true,
        color: 'ct-primary',
        columns: 2
    },
    content: {
        paragraphs: [
            "No Content"
        ],
        points: [

        ],

    },
    items: {
        image: null,
        video: null,
        buttons: [
            {type:"default", title:"click here", color:btn_colors[0], size: ''}
        ]
    }
}

export const ContainerSmart = (
    props
) => {
    const vals = props.model?props.model:sample_container;
    const type = props.model?props.model.type:"default";

    // Image Settings


    // Button Settings


    // Other Settings

    // console.log(props.content[0].title);


    return (
        <>

            {
                type==="default"?<ContainerDefault vals={vals}/>
                    :<ContainerDefault vals={vals}/>

            }

        </>
    );

}
