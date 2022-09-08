import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap'
import { toast } from 'react-toastify';

const EditProducts = () => {
    const param = useParams();
    const {_id} = param; 
    const [mydata, setMydata] = useState({})
    const getData = async() =>{
      await fetch(`/eprod/${_id}`)
      .then((res)=> {return res.json()})
      .then((resdata)=>{
        // console.log(resdata)
        setMydata(resdata)
      })
    }
  
    useEffect(()=>{
      getData(_id);
    })

    const [user, setUser] = useState({name:String(''), category:String(''), price:Number(), count:Number(), image:String(''), brand:String(''), gender:String(''), description:String('')});
    const navigate = useNavigate();

    let name, value;
    const handleInput = (e) =>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user,[name]:value});
    }
    const UpdateProduct = async(e) =>{
        e.preventDefault();
            const {name ,category ,price ,count ,image ,brand ,gender ,description} = user;
            
            if(!name || !category || !image ||  !price || !count || !brand || !gender || !description){
              return toast.warning('Please fill up the details....')
            }
            else{
                const res = await fetch(`/eprod/${_id}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:"include",
            body:JSON.stringify({name:name, category:category, price:price, count:count, image:image, brand:brand, gender:gender,description:description})
            })

            const data = await res.json();
            
             if(res.status === 422 || !data){
                toast.error('Error Adding Product..')
            }
            else{
                toast.success('Product Updated Successfull...')
                navigate('/allproduct')
            }

            }
            

    }
  return (
    <div>
        <h3 style={{marginTop:'100px', marginLeft:'50px'}}>Edit Product here...</h3>
        <div style={{float:'left', margin:'50px',}}>
            <form method='POST'>
        <Row>
            <Col md={4}>
                <div className="form-group">
                    <label className="form-control-label" htmlFor='Product Name'>Product NAME</label>
                    <input type="text" placeholder='For Ex: Puma Shoes' className="form-control" name='name' value={user.name}  onChange={handleInput}/>
                </div>  
                <div className="form-group">
            <label className="form-control-label" htmlFor='Product Brand'>Product BRAND</label>
            <input type="text" placeholder='For Ex: PUMA or NIKE or ADDIDAS' className="form-control" name='brand' value={user.brand}  onChange={handleInput} />
        </div>
                </Col>
                <Col md={4}>
                <div className="form-group">
            <label className="form-control-label" htmlFor='Product Price'>Product Price</label>
            <input type="text" placeholder='$199.00' className="form-control" name='price' value={user.price}  onChange={handleInput} />
        </div>
        <div className="form-group">
            <label className="form-control-label" htmlFor='Product Total'>Product TOTAL NO OF PRODUCTS</label>
            <input type="text" placeholder='For Ex: 1 or 10' className="form-control" name='count' value={user.count}  onChange={handleInput}/>
        </div>
                </Col>
                <Col md={3}>
                <div className='form-group'>
              <label className="form-control-label"  htmlFor="sel1">Product GENDER</label>
                <select className="form-control w-50" id="sel1" name='gender' value={user.gender} 
                onChange={handleInput} >
                  <option >----</option>
                  <option value={'Men'}>Men</option>
                  <option value={'Women'}>Women</option>
                </select>
            </div>
                <div className='form-group'>
              <label className="form-control-label"  htmlFor="sel1">Product CATEGORY</label>
                <select className="form-control w-50" id="sel1"name='category' value={user.category}  onChange={handleInput} >
                  <option >----</option>
                  <option value={'T-shirt'}>T-shirt</option>
                  <option value={'Shoes'}>Shoes</option>
                  <option value={'Jacket'}>Jacket</option>
                  <option value={'Pants'}>Pants</option>
                  <option value={'Jeans'}>Jeans</option>
                  <option value={'Trouser'}>Trouser</option>
                  <option value={'Hoodie'}>Hoodie</option>
                </select>
            </div>
                </Col>
                <Col>
                </Col>
                <div className='w-50'>
            <div className="form-group" htmlFor="Product Image">
            <label className="form-control-label">Product IMAGE URL</label>
            <input type="text" className="form-control" name='image' value={user.image}  onChange={handleInput} />
        </div>

        <div className="form-group">
            <label className="form-control-label" htmlFor='Product Description'>Product DESCRIPTION</label>
            <textarea type="text" className="form-control" name='description' rows={4} cols={12} value={user.description}  onChange={handleInput} />
        </div>
        
        <button type="submit" id='btn' className="btn btn-outline-dark btn-rounded" onClick={UpdateProduct}>Update Order</button>
        </div>
        <div >
           
          </div>
            </Row>
            </form>
            </div>
            <div >
            <h3 >Product Details</h3>
                <Row>
                    <Col>
                        <ListGroup variant='flush'>
                        <ListGroupItem>
                            <Row>
                                <Col><img src={mydata.image} alt={mydata.name} className='img-thumbnail img-rounded w-25'/></Col>
                            </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                            <Row>
                                <Col style={{fontWeight:'bolder'}}>Name:</Col>
                                <Col> {mydata.name}</Col>
                            </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                            <Row>
                                <Col style={{fontWeight:'bolder'}}>Brand:</Col>
                                <Col> {mydata.brand}</Col>
                            </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                            <Row>
                                <Col style={{fontWeight:'bolder'}}>Price:</Col>
                                <Col>${mydata.price}</Col>
                            </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                            <Row>
                                <Col style={{fontWeight:'bolder'}}>Stock:</Col>
                                <Col> {mydata.count}</Col>
                            </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                            <Row>
                                <Col style={{fontWeight:'bolder'}}>Gender:</Col>
                                <Col> {mydata.gender}</Col>
                            </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                            <Row>
                                <Col style={{fontWeight:'bolder'}}>Category:</Col>
                                <Col> {mydata.category}</Col>
                            </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                            <Row>
                                <Col style={{fontWeight:'bolder'}}>Description:</Col>
                                <Col> {mydata.description}</Col>
                            </Row>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </div>
    </div>
  )
}

export default EditProducts
