import React, { PropTypes } from "react"

const UrlForm = ({onSampleClick, value, isFetching, errorText,closeErrorDiv }) => {
  return (
    isFetching ?
      <div>
          {errorText ? 
          <div style={{ backgroundColor: '#FFCCCC', height: '35px' }} className="container">
            <div className='text-right' style={{ height: '5px' }}><button type="button" className="btn btn-link btn-sm"><i style={{ color: '#808080' }} onClick={this.props.closeErrorDiv} className="glyphicon glyphicon-remove"></i></button> </div>
            <div className="container" style={{ color: '#808080' }}><h6>URL not working.</h6></div>
          </div>
          :
            null
        }
        <div style={{ zIndex: 3, width: '100%', height: '100%', position: 'absolute', left: '50%', top: '50%' }}><i className="fa fa-spinner fa-spin fa-5x"></i></div>
        <form className="form" style={{ opacity: 0.5, position: 'relative' }}>
          <div className="form-group row ">
            <label>Resource URL: <input className="form-control col-md-12" type="text" id="input_url" defaultValue={value}></input></label>
          </div>
          <div className="form-group row">
            <button className="btn btn-default" onClick={onSampleClick}> Submit </button>
          </div>
        </form>
      </div> :
      <div>
        {errorText ? 
          <div style={{ backgroundColor: '#FFCCCC', height: '35px' }} className="container">
            <div className='text-right' style={{ height: '5px' }}><button type="button" className="btn btn-link btn-sm"><i style={{ color: '#808080' }} onClick={closeErrorDiv} className="glyphicon glyphicon-remove"></i></button> </div>
            <div className="container" style={{ color: '#808080' }}><h6>The URL you typed is not valid. Please try again.</h6></div>
          </div>
          :
            null
        }
        <form className="form" >
          <div className="form-group row ">
            <label>Resource URL: <input className="form-control col-md-12" type="text" id="input_url" ></input></label>
          </div>
          <div className="form-group row">
            <button className="btn btn-default" onClick={onSampleClick}> Submit </button>
          </div>
        </form>
      </div>
  )
}


export default UrlForm;