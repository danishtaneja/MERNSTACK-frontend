import React ,{ useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import {Link} from 'react-router-dom'
const Pallet = () => {

    const [pallet, setPallet]= useState({});



    const MyBarGraph = () =>{
        fetch('/my-order',{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
        },
        credentials:'include'
        })
        .then((res)=> {return res.json()})
        .then((resdata)=>{ setPallet(resdata)})
      }
    useEffect(()=>{
        MyBarGraph();
    },[])

    const [udata, setUdata] = useState({});
    const AuthUSER = async() =>{
        try{
            const res = await fetch('/authUSER',{
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
        AuthUSER();
    },[])
  
  return (
    <div>
        <form method='GET'>
            <Row style={{marginTop:'-180px', marginLeft:'60px', padding:'20px'}}>
            <Link to='/approved' className='text-decoration-none text-white'id='p_link'>   
            <Col md={3}>
                    <div className='p-3 mb-2 text-white' style={{marginTop:"200px", width:'200px', height:'100px', backgroundColor:'#228B22', boxShadow:'10px 0px 20px grey'}}>
                        <Row>
                            <Col>
                            <span className='m-2' style={{fontSize:'3rem'}}>{pallet[0]}</span>
                            </Col>
                            <Col>
                            <div className='bg-success' style={{fontSize:'1.2rem', float:'right',  width:'30px', height:'30px', lineHeight:'30px', textAlign:'center', borderRadius:'20px' ,boxShadow:'00px 0px 10px yellow'}}>
                                <i className="fa fa-check " />
                            </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='text-center m-2' style={{ height:'40px', lineHeight:'40px'}}>
                              <span style={{fontSize:'1.2rem'}}>Approved</span>
                            </Col>
                        </Row>
                    </div>
                </Col></Link>
                <Link to='/new' className='text-decoration-none text-white' id='p_link'>  <Col md={3}>
                <div className='p-3 mb-2 text-white' style={{marginTop:"200px", width:'200px', height:'100px', backgroundColor:'#ffc107', boxShadow:'10px 0px 20px grey'}}>
                        <Row>
                            <Col>
                            <span className='m-2' style={{fontSize:'3rem'}}>{pallet[1]}</span>
                            </Col>
                            <Col>
                            <div className='bg-warning' style={{fontSize:'1.2rem', float:'right',  width:'30px', height:'30px', lineHeight:'30px', textAlign:'center', borderRadius:'20px', boxShadow:'00px 0px 10px orangered'}}>
                                <i className="fas fa-clock-rotate-left" />
                            </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='text-center m-2' style={{ height:'40px', lineHeight:'40px'}}>
                                <span style={{fontSize:'1.2rem'}}>New Orders</span>
                            </Col>
                        </Row>
                    </div>
                </Col></Link>
                <Link to='/cancel' className='text-decoration-none text-white' id='p_link'> <Col md={3}>
                <div className='p-3 mb-2 text-white' style={{marginTop:"200px", width:'200px', height:'100px', backgroundColor:'#df4759', boxShadow:'10px 0px 20px grey'}}>
                        <Row>
                            <Col>
                            <span className='m-2' style={{fontSize:'3rem'}}>{pallet[2]}</span>
                            </Col>
                            <Col>
                            <div className='bg-danger' style={{fontSize:'1.2rem', float:'right',  width:'30px', height:'30px', lineHeight:'30px', textAlign:'center', borderRadius:'20px' ,boxShadow:'00px 0px 10px red'}}>
                                <i className="fas fa-clock-rotate-left" />
                            </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='text-center m-2' style={{ height:'40px', lineHeight:'40px'}}>
                                <span style={{fontSize:'1.2rem'}}>Cancel</span>
                            </Col>
                        </Row>
                    </div>
                </Col></Link>
                <Link to='/refund' className='text-decoration-none text-white' id='p_link'> <Col md={3}>
                <div className='p-3 mb-2 text-white bg-primary' style={{marginTop:"200px", width:'200px', height:'100px', boxShadow:'10px 0px 20px grey'}}>
                        <Row>
                            <Col>
                            <span className='m-2' style={{fontSize:'3rem'}}>{pallet[3]}</span>
                            </Col>
                            <Col>
                            <div className='bg-primary' style={{fontSize:'1.2rem', float:'right',  width:'30px', height:'30px', lineHeight:'30px', textAlign:'center', borderRadius:'20px' ,boxShadow:'00px 0px 10px blue'}}>
                                <i className="fas fa-clock-rotate-left" />
                            </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='text-center m-2' style={{height:'40px', lineHeight:'40px'}}>
                                <span style={{fontSize:'1.2rem'}}>Refunded</span>
                            </Col>
                        </Row>
                    </div>
                </Col></Link>
                {udata.isAdmin === true ? <><Link to='/new-users' className='text-decoration-none text-white' id='p_link'> <Col md={3}>
                <div className='p-3 mb-2 text-white bg-dark' style={{marginTop:"200px", width:'200px', height:'100px', boxShadow:'10px 0px 20px grey'}}>
                        <Row>
                            <Col>
                            <span className='m-2' style={{fontSize:'3rem'}}>{pallet[4]}</span>
                            </Col>
                            <Col>
                            <div className='bg-dark' style={{fontSize:'1.2rem', float:'right',  width:'30px', height:'30px', lineHeight:'30px', textAlign:'center', borderRadius:'20px' ,boxShadow:'00px 0px 10px white'}}>
                                <i className="fas fa-user-plus" />
                            </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='text-center m-2' style={{height:'40px', lineHeight:'40px'}}>
                                <span style={{fontSize:'1.2rem'}}>New Users</span>
                            </Col>
                        </Row>
                    </div>
                </Col></Link></> :<></>}
            </Row>
            
      </form>
    </div>
  )
}

export default Pallet
