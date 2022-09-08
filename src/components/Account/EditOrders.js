import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap'
import { toast } from 'react-toastify';

const EditOrders = () => {
    const param = useParams();
    const {_id} = param; 
    const [mydata, setMydata] = useState({})
    const getData = async() =>{
      await fetch(`/edit/${_id}`)
      .then((res)=> {return res.json()})
      .then((resdata)=>{
        // console.log(resdata)
        setMydata(resdata)
      })
    }
  
    useEffect(()=>{
      getData(_id);
    })

    const [user, setUser] = useState({status:'', Comment:''});
    const navigate = useNavigate();

    let name, value;
    const handleInput = (e) =>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user,[name]:value});
    }

    const UpdateOrder = async(e) =>{
        e.preventDefault();
    const { status, Comment } = user;
    if(status === ''){
       return toast.warning('Please fill the form properly....')
    }
        const res = await fetch(`/edit/${_id}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:"include",
            body:JSON.stringify({status:status, Comment:Comment})
        })

         await res.json();
         navigate('/dashboard')
}
  return (
    <div>
        <h3 style={{marginTop:'100px', marginLeft:'50px'}}>Edit Order here...</h3>
      <Row>
          <Col md={5}>
          <form  method='POST'>
          <ListGroup variant='flush'>
            <Row>
                <Col>
            <ListGroupItem>
            <div className="form-outline">
                <label className="form-label" htmlFor="form9Example1">Name</label>
                <input type="text" id="form9Example1" value={mydata.name} className="form-control input-custom" />
              </div>
            <div className="form-outline">
                <label className="form-label" htmlFor="form9Example6">Phone</label>
                <input type="text" id="form9Example6" value={mydata.phone} className="form-control input-custom" />
              </div>
            <div className="form-outline">
              <label className="form-label" htmlFor="typeEmail">Email</label>
                <input type="email" id="typeEmail" value={mydata.email} className="form-control input-custom" />
              </div>
            </ListGroupItem>
            </Col>
            <Col>

            <ListGroupItem>
            <div className="form-outline">
                <label className="form-label" htmlFor="form9Example6">Address</label>
                <input type="text" id="form9Example6" value={mydata.Address} className="form-control input-custom"/>
              </div>
            <div className="form-outline">
                <label className="form-label" htmlFor="form9Example3">Country</label>
                <input type="text" id="form9Example3" value={mydata.Country} className="form-control input-custom" />
              </div>
              <div className="form-outline">
                <label className="form-label" htmlFor="form9Example4">Zip</label>
                <input type="text" id="form9Example4" value={mydata.zip} className="form-control input-custom" />
              </div>
            </ListGroupItem>
            </Col>
            </Row>
            <ListGroupItem>
            <div className="form-group">
              <label htmlFor="sel1">Update Status</label>
                <select className="form-control w-25" id="sel1" name='status' value={user.status} 
                onChange={handleInput} >
                  <option value={''}>----</option>
                  <option value={'Approved'}>Approved</option>
                  <option value={'Pending'}>Pending</option>
                  <option value={'Cancel'}>Cancel</option>
                  <option value={'Refund'}>Refund</option>
                </select>
            </div>
            </ListGroupItem>
            <ListGroupItem>
            <div className="form-group">
              <label htmlFor='comments'>Comments</label><br />
              <textarea type={'text'}  name='Comment' value={user.Comment} rows={5} cols={30} onChange={handleInput}></textarea>
            </div>
            </ListGroupItem>

            </ListGroup>
          <div className="float-end ">
            <button type="submit" id='btn' className="btn btn-outline-dark btn-rounded" onClick={UpdateOrder}>Update Order</button>
          </div>
      </form>
          </Col>
          <Col md={5} style={{margin:'100px'}}>
          <ListGroup variant='flush'>
            <ListGroupItem>
            <div style={{fontSize:'1.4rem',textAlign:'left'}}>
              <span style={{fontSize:'1.2rem', fontWeight:'bold'}}>Total Items:</span> {mydata.Items}
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div style={{fontSize:'1.4rem',textAlign:'left'}}>
              <span style={{fontSize:'1.2rem', fontWeight:'bold'}}>Price:</span>&nbsp;${mydata.price}
              </div>
            </ListGroupItem>
            {/* <ListGroupItem>
              <div style={{fontSize:'1.4rem',textAlign:'left'}}>
              <span style={{fontSize:'1.2rem', fontWeight:'bold'}}>Products:</span><br/>{mydata.products}
              </div>
            </ListGroupItem> */}
            <ListGroupItem>
              <div style={{fontSize:'1.4rem',textAlign:'left'}}>
              <span style={{fontSize:'1.2rem', fontWeight:'bold'}}>Status:</span> {mydata.status}
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div style={{fontSize:'1.4rem',textAlign:'left'}}>
              <span style={{fontSize:'1.2rem', fontWeight:'bold'}}>Comment:</span> {mydata.Comment}
              </div>
            </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
    </div>
  )
}

export default EditOrders
