import React, { PropTypes } from "react"


const PropValue = ({onClick, subject_uri, property, object, provenance, selected, property_uri, object_uri, onButtonClick, hasExpandButton, button_type,hasLink, hasLink_button,extraLinkClick}) => { 
	
	return(
		<div className={"row text-left"} onClick={onClick} title ={selected} style={{overflow:'hidden', color:  selected ?"white":"black", backgroundColor: selected ? "#269075" : "white" ,minHeight: 33}}>
			<div id="subject_uri" title={subject_uri} style={{display : "none"}}></div>
			<div className="col-md-2" id="property_uri" title={property_uri} style={{overflow:'hidden'}}><p>{property}</p></div>
			<div className="col-md-7"  title={object_uri} style={{overflow:'hidden'}}><p>{object} {hasLink ? <button type="button" className="btn btn-link btn-sm"><i onClick={extraLinkClick} className ={hasLink_button} style={{color:"#269075"}}></i></button> : null}</p></div>
			<div className="col-md-2" style={{overflow:'hidden'}}> <p>{provenance}</p></div>
			<div className="col-md-1">
				{hasExpandButton ? <button type="button" className="btn btn-link btn-sm"><i onClick={onButtonClick} className={button_type} style={{color:"#269075"}}></i></button> : null}
			</div>
		</div>
)}

PropValue.propTypes = {
    onCLick: PropTypes.func,
	object: PropTypes.string.isRequired,
	property: PropTypes.string.isRequired,
	provenance: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired
}

export default PropValue
