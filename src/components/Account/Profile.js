import React, { useEffect, useState } from 'react'
import { Row , Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import Panel from './Panel';

const Profile = () => {
    const [udata, setUdata] = useState({});
    const ProfileView = async() =>{
        try{
            const res = await fetch('/profile',{
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            credentials:"include"
        })

        const data = await res.json();
        if(res.status === 200 && data){
            setUdata(data)
        }
        else if(res.status === 201  && data){
            setUdata(data)
        }
        else{
            const error = new Error(res.error) 
            throw error;
        }
    }
    catch(err){
        console.log(err)
    }
    }

    useEffect(()=>{
        ProfileView();
    },[])
  return (
    <div>
        <form method='GET'>
            <div style={{marginTop:'80px'}}>
                <Panel />
            </div>
                
            <div className="content" >
                <h1>Profile</h1>
                <Row style={{marginTop:'50px'}}>
                    <Col md={6}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <span style={{fontSize:'1.2rem', fontWeight:'bold'}}>Name:</span>&nbsp;<span  style={{fontSize:'1.2rem'}}>{udata.name}</span>
                            </ListGroupItem>
                            <ListGroupItem>
                                <span style={{fontSize:'1.2rem', fontWeight:'bold'}}>Email:</span>&nbsp;<span  style={{fontSize:'1.2rem'}}>{udata.email}</span>
                            </ListGroupItem>
                            <ListGroupItem>
                                <span style={{fontSize:'1.2rem', fontWeight:'bold'}}>Gender:</span>&nbsp;<span  style={{fontSize:'1.2rem'}}>{udata.gender}</span>
                            </ListGroupItem>
                            <ListGroupItem>
                                <span style={{fontSize:'1.2rem', fontWeight:'bold'}}>A Type:</span>&nbsp;<span  style={{fontSize:'1.2rem'}}>{udata.isAdmin === true ? <><span>Admin </span> <span className='dot'></span></> : udata.isAdmin===false ? <><span>Customer</span> <span className='dots'></span></> : <>    </>}</span>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                    {udata.gender === 'Men' ? <><img src='https://png.pngitem.com/pimgs/s/3-39388_businessperson-computer-icons-woman-business-woman-icon-png.png' alt={udata.name}  className={'img-thumbnail imr-rounded'}/> </> : udata.gender==='Women' ?<> <img src='https://png.pngitem.com/pimgs/s/110-1104775_user-woman-business-woman-png-icon-transparent-png.png' alt={udata.name} className={'img-thumbnail imr-rounded'} /> </>:<></>}
                    </Col>
                </Row>
            </div>
        </form>
    </div>
  )
}

export default Profile