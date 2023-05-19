import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../card.css'

function CardProfile (props) {
    const title = props.model.title?props.model.title:"No Title";
    const uname = props.model.username?props.model.username:"unidentified";
    const content = props.model.content?props.model.content: "Approved member of this service and verfied by Psycologists Union of Sri Lanka";//<i class="fas fa-info-circle"></i>
    const icon = props.model.icon?props.model.icon:"fas fa-info-circle";
    const role =  props.model.profession?props.model.profession:"Not Mentioned";
    const url = props.model.url? props.model.url: "/profile?username="+uname+"&userrole=Expert"; 

    const category = props.model.category?props.model.category:"Not Mentioned";

    

    const theme = "";


    useEffect(() => {
        const getInfo = async () => {
            // setRateData(await expert_service.getRateExpert(uname));
        }
        getInfo();
    }, [])

    return (
        <>
                    <div className="ct-card-special ct-card-profile">
                        <Link to={url}><div className="ct-profile-im"><i class="fas fa-user-md"></i></div></Link>
                        <div className="ct-cardsp-body text-center">
                            <h4 className="ct-font-secondary">{title}</h4>
                            <small className="ct-simple-tag">{role}</small><br></br>
                            <p className="ct-font-secondary">{content}</p>

                            <div className="hr-spacer"></div>

                            <small className="ct-font-secondary">Specialized For </small> <span className="ct-simple-tag">{category}</span> 

                            <div className="hr-spacer"></div>

                            <br></br>

                        </div>
                    </div>
        </>
    );
}

export default CardProfile;