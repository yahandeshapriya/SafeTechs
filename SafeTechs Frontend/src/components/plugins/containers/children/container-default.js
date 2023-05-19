import React from 'react'
import BtnSmart from '../../buttons/btn-smart';
import '../container.css'

const ContainerDefault = (props) => {
    const title = props.vals.title?props.vals.title:"No Title Available";
    const subtitle = props.vals.subtitle?props.vals.subtitle:"";
    const content = props.vals.content.paragraphs?props.vals.content.paragraphs:[];
    const points = props.vals.content.points?props.vals.content.points:[];

    const id = props.vals.content.title?props.vals.content.title:null;

    // Image Settings
    const image = props.vals.items.image?props.vals.items.image:null;

    // Video Settings
    const video = props.vals.items.video?props.vals.items.video:null;

    // Button Settings
    const buttons = props.vals.items.buttons?props.vals.items.buttons:null;

    // Other Settings

    const isDark = props.vals.style.color==="ct-primary"?true:false;
    const isLeft = props.vals.style.left?true:false;


    console.log(content);
    return (
        <>
                {
                    isLeft?
                        <>
                            <div className={`ct-row-content ${isDark?"ct-cont-secondary":""} text-left`} id={id}>
                                <div className="ct-col">
                                    <div>
                                        <h1 className={`ct-font-sp ${isDark?"ct-font-secondary":"ct-font-primary"}`}>{title}</h1>
                                        <h5 className={`ct-font-lg ${isDark?"ct-font-secondary":"ct-font-primary"}`}>{subtitle}</h5>
                                        <div className="hr-spacer"></div>

                                        {/* <p className={`${isDark?"ct-font-secondary":"ct-font-primary"}`}>
                                            {content}                   
                                        </p> */}

                                        {
                                                content.length?
                                                    <>
                                                        {
                                                            content.map(element => <p className={`${isDark?"ct-font-secondary":"ct-font-primary"}`}>{element}</p>)
                                                        }
                                                    </>
                                                    :<>
                                                        <p className={`${isDark?"ct-font-secondary":"ct-font-primary"}`}>{content}</p>
                                                    </>
                                        } 
                                        
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>

                                        {
                                            buttons.length>0?
                                                buttons.map(element => <BtnSmart vals={element}/>)
                                                :<></>
                                        }

                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                    </div>

                                    <div className="container-img">

                                    

                                    </div>

                                </div>

                                <div className="hr-spacer"></div>
                                <div className="hr-spacer"></div>
                            </div>
                            <div className="hr-spacer ct-cont-highlight2"></div>
                        </>
                        :
                        <>
                            <div className={`ct-row-content ${isDark?"ct-cont-secondary":""} text-left`} id={id}>
                                <div className="ct-col">
                                    <div className="container-img">

                                    </div>

                                    <div>
                                        <h1 className={`ct-font-sp ${isDark?"ct-font-secondary":"ct-font-primary"}`}>{title}</h1>
                                        <h5 className={`ct-font-lg ${isDark?"ct-font-secondary":"ct-font-primary"}`}>{subtitle}</h5>
                                        <div className="hr-spacer"></div>

                                        {/* <p className={`${isDark?"ct-font-secondary":"ct-font-primary"}`}>
                                            {content}                   
                                        </p> */}

                                        {
                                                content.length?
                                                    <>
                                                        {
                                                            content.map(element => <p className={`${isDark?"ct-font-secondary":"ct-font-primary"}`}>{element}</p>)
                                                        }
                                                    </>
                                                    :<>
                                                        <p className={`${isDark?"ct-font-secondary":"ct-font-primary"}`}>{content}</p>
                                                    </>
                                        } 
                                        
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>

                                        {
                                            buttons.length>0?
                                            buttons.map(element => <BtnSmart vals={element}/>)
                                            :<></>
                                        }

                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                        <div className="hr-spacer"></div>
                                    </div>
                                </div>

                                

                                

                                <div className="hr-spacer"></div>
                                <div className="hr-spacer"></div>
                                
                            </div>
                            <div className="hr-spacer ct-cont-highlight2"></div>
                        </>
                }

                

        </>
    );
}

export default ContainerDefault;