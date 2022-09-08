import React, { useEffect, useState } from 'react'
import { Link, useParams} from 'react-router-dom'
import {Row, Col, ListGroup, ListGroupItem, Card, Badge} from 'react-bootstrap'
import Ratings from './Ratings';
import {toast} from 'react-toastify'
import { useDipatchCart } from '../Context/CartContext';
// import RatingREVIEW from './RatingREVIEW';

const ViewProduct = () => {
    const param = useParams();
    const {_id} = param; 
    const [mydata, setMydata] = useState({})
    const getData = async() =>{
      await fetch(`/product/${_id}`)
      .then((res)=> {return res.json()})
      .then((resdata)=>{
        setMydata(resdata)
      })
    }
  
    useEffect(()=>{
      getData(_id);
    })
    const dispatch = useDipatchCart()
  const addtocart = (item) =>{
    dispatch({type:'ADD_ITEM',item});
  }
  

  return (
    <div>
<p style={{marginTop:'90px', marginBottom:'20px', fontWeight:'bold',fontVariant:'flush', fontSize:'2.4rem', textAlign:'center'}}> <Link to='/products' className='mx-5' style={{float:'left', textDecoration:'none', color:'#000'}} ><span><i className='fas fa-angle-left'/><span className="mx-1"style={{fontSize:'2rem'}}>Back</span></span></Link> {mydata.name}</p>
      <Row>
        <Col md={5}>
          <div style={{textAlign:'center', marginTop:'60px'}}>
          <img src={mydata.image} className='img-fluid img-thumbnail' style={{width:'350px', height:'450px'}} alt={mydata.name}/>
          </div>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <p  style={{fontSize:'1.8rem', marginTop:'90px'}}>{mydata.name}</p>
            </ListGroupItem>
            <ListGroupItem>
              <div style={{textAlign:'left'}}>
                <Ratings rating={mydata.rating} numReviews={mydata.numReviews} />
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div style={{fontSize:'1.4rem',textAlign:'left'}}>
              <span style={{fontSize:'1.2rem', fontWeight:'bold'}}>Price:</span>&nbsp;${mydata.price}
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div style={{textAlign:'left'}}>
                <span style={{fontSize:'1.2rem', fontWeight:'bold'}}>Description: </span><br />{mydata.description}
              </div>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card style={{marginTop:'100px'}}>
            <Card.Body >
            <ListGroup variant='flush'>
            <ListGroupItem>
              <Row>
                <Col style={{fontWeight:'bolder'}}>Price:
                </Col>
                <Col>${mydata.price}
                </Col>
              </Row>
              </ListGroupItem>
              <ListGroupItem>
              <Row>
                <Col style={{fontWeight:'bolder'}}>Status:
                </Col>
                <Col>{mydata.count >= 5 ? (<Badge bg='success' text='white'>In Stock</Badge>): mydata.count >=1 ? (<Badge bg="warning" text='white'>Low In Stock </Badge>): mydata.count === 0 ? (<Badge bg="danger" text='white'>Out of Stock</Badge>):(<Badge bg="danger" text='white'>Out of Stock</Badge>) }</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
            <Row>
                <Col style={{fontWeight:'bolder'}}>Gender:
                </Col>
                <Col> {mydata.gender}
                </Col>
              </Row>
              </ListGroupItem>
            {mydata.count >=1 ?
            <ListGroupItem className='visible'>
            <Row >
                <Col style={{fontWeight:'bolder'}}>Available
                </Col>
                <Col>{mydata.count}</Col>
              </Row>
              </ListGroupItem>: <ListGroupItem className='visible'>
            <Row >
                <Col style={{fontWeight:'bolder'}}>Not Available
                </Col>
                <Col>{mydata.count}</Col>
              </Row>
              </ListGroupItem>}
            <ListGroupItem>
            {mydata.count === 0  ? <><div style={{textAlign:'center'}}><button className='btn btn-outline-dark disabled btn-rounded' onClick={()=>toast(<span style={{fontWeight:'bolder'}}>{mydata.name} currently out of Stock</span>)}>Out of Stock &nbsp;<i className='fas fa-bag-shopping'/> </button></div></> : <> <div style={{textAlign:'center'}}><button className='btn btn-outline-dark btn-rounded' onClick={()=>{toast(`${mydata.name} addedd to Cart...`); addtocart(mydata);}} >Add to Cart &nbsp;<i className='fas fa-bag-shopping'/> </button></div></> }
            </ListGroupItem>
          </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <RatingREVIEW  name={mydata.name}/> */}
    </div>
  )
}

export default ViewProduct
