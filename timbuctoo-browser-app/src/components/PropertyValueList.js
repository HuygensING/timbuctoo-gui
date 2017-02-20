import React, { PropTypes } from 'react'
import PropValueIntermezzo from './PropValueIntermezzo'

const PropValueList = ({ propValues , onValueClick, expandClick, extraLinkClick}) => {
	return(
	
	<div className='container-fluid' id='form-result'>
		<div className='row text-left'>
			<div className='col-md-2'><h2>Property</h2></div>
			<div className='col-md-7'><h2>Object</h2></div>
			<div className='col-md-2'><h2>Provenance</h2></div>
			<div className='col-md-1'><h2></h2></div>
		</div>		
			
		{Object.values(propValues).map ((propValue, idx) => 
			(<PropValueIntermezzo 
				key = {idx}
				propertyList = {propValue.list}
				isExpanded = {propValue.isExpanded}
				onValueClick = {onValueClick}
				expandClick = {expandClick}
				extraLinkClick = {extraLinkClick}
			/>)
		)}
	</div>	
	
)};
	
// PropValueList.propTypes={
// 	propValues:PropTypes.arrayOf(PropTypes.shape({
// 	onCLick: PropTypes.func,
// 	object: PropTypes.string.isRequired,
// 	property: PropTypes.string.isRequired,
// 	provenance: PropTypes.string.isRequired,
// 	selected: PropTypes.bool.isRequired
// 	}).isRequired).isRequired
// }

export default PropValueList