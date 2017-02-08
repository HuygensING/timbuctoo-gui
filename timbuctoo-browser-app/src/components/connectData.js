import React, { PropTypes } from 'react'
import DisplayUploadData from'./displayUploadData'


const ConnectData = ({jsonldUpload, propertyList}) => {
    return(
        <div className="container-fluid">
            <h3 className="small-margin">Align your properties with existing ones:</h3>
            <div className='container-fluid'>
                {jsonldUpload.map ((triple,idx) =>(
                    <DisplayUploadData 
                        key = {idx}
                        triple={triple} 
                        propertyList={propertyList}
                    />
                    )
                )}
            </div>
        </div>
    )
}

export default ConnectData;