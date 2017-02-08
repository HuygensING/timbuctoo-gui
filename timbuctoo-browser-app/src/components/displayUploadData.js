import React, { PropTypes } from 'react'
// const property_list = ['value1','value2','value3']

const Triple =({triple,propertyList}) =>{
    return(
        <div>
            <div className={"row text-left"}>
                <div className="col-md-6"><p>{triple[1]}</p></div>
                <div className="col-md-4">
                    <select name="select">
                        <option selected>Select a property</option> 
                        {propertyList.map((property) =>(
                            <option value={property}>{property}</option> 
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
} 

export default Triple;