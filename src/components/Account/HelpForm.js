import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import {Row, Col} from 'react-bootstrap'
import HelpReq from './HelpReq';
// import HelpRequest from './HelpRequest';

const HelpForm = () => {
    const navigate = useNavigate();
    

    const [user, setUser] = useState({purpose:'', message:''});

    let name, value;
    const handleInput = (e) =>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user,[name]:value});
    }

    const HelpPOST = async(e) =>{
        e.preventDefault();
    const { purpose, message} = user;
    if(purpose ==='' || message===''){
       return toast.warning('Please fill the form properly....')
    }

        const res = await fetch('/help', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({purpose:purpose, message:message})
        })

        const data = await res.json();

        if(res.status === 422 || !data){
            toast.error('Request is Unable to Send...')
        }
        else{
            toast.success('Request sent...')
            navigate('/dashboard')
        }
}
  return (
    <div>
         <div className='body'>
        <div className="container">
            <h3 className='m-5'>Help And Support</h3>
            
      <Row>
        <Col>
        <div className='row' style={{marginLeft:'30px'}} >
        <div className="col-sm-8 col-md-12 col-lg-8" >
      <form method='POST'>
        <div className="form-group">
            <label className="form-control-label">PURPOSE</label>
            <input type="text" className="form-control" name='purpose' value={user.purpose} onChange={handleInput}/>
        </div>
        <div className="form-group">
            <label className="form-control-label">YOUR MESSAGE</label>
            <textarea type="email" className="form-control" name='message' rows={5} cols={32} value={user.message} onChange={handleInput} />
        </div>
         <div className="col-lg-6 login-btm login-button">
            <button type="submit" className="btn btn-outline-primary" onClick={HelpPOST}>Send Request</button>
        </div>
      </form>
      </div>
      </div>
      </Col>
      <div style={{marginLeft:'-111px', marginTop:'130px'}}>
        <HelpReq />
        </div>
      </Row>
      </div>
      </div>
    </div>
  )
}

export default HelpForm
