import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import {Row, Col} from 'react-bootstrap'
// import HelpRequest from './HelpRequest';

const Helps = () => {
    const navigate = useNavigate();
    

    const [user, setUser] = useState({name:'', email:'',purpose:'', message:''});

    let name, value;
    const handleInput = (e) =>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user,[name]:value});
    }

    const HelpPOST = async(e) =>{
        e.preventDefault();
    const { name, email, purpose, message} = user;
    if(name ==='' || email === '' || purpose ==='' || message===''){
       return toast.warning('Please fill the form properly....')
    }

        const res = await fetch('/help-guest', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:name,email:email,purpose:purpose, message:message})
        })

        const data = await res.json();

        if(res.status === 422 || !data){
            toast.error('Request is Unable to Send...')
        }
        else{
            toast.success('Request sent...')
            navigate('/contact')
        }
}
  return (
    <div>
         <div className='body'>
        <div className="container" style={{marginTop:'99px'}}>
            <h3 className=''>Help And Support</h3>
      <Row>
        <Col md={8}>
        <div className='row'>
        <div className="col-sm-8 col-md-8 col-lg-8" >
      <form method='POST'>
      <div className="form-group">
            <label className="form-control-label">Name</label>
            <input type="text" className="form-control" name='name' value={user.name} onChange={handleInput}/>
        </div>
        <div className="form-group">
            <label className="form-control-label">Email</label>
            <input type="text" className="form-control" name='email' value={user.email} onChange={handleInput}/>
        </div>
        <div className="form-group">
            <label className="form-control-label">PURPOSE</label>
            <input type="text" className="form-control" name='purpose' value={user.purpose} onChange={handleInput}/>
        </div>
        <div className="form-group">
            <label className="form-control-label">YOUR MESSAGE</label>
            <textarea type="email" className="form-control" name='message' rows={5} value={user.message} onChange={handleInput} />
        </div>
         <div className="col-lg-6 login-btm login-button">
            <button type="submit" className="btn btn-outline-primary" onClick={HelpPOST}>Send Request</button>
        </div>
      </form>
      </div>
      </div>
      </Col>
      <Col md={4}>
        <div>
            <img src='https://thumbs.dreamstime.com/b/help-support-cloud-banner-text-hanging-d-rendered-123562276.jpg' alt='Help and Support' style={{float:'left', width:'400px', height:'400px', backgroundColor:'transparent'}} />
        </div>
        </Col>
      </Row>
      </div>
      </div>
    </div>
  )
}

export default Helps
