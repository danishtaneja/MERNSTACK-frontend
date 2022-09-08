import React, {useState} from 'react'
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateProduct = () => {
    const [product, setProduct] = useState({name:String(''), category:String(''), price:Number(), count:Number(), image:String(''), brand:String(''), gender:String(''), description:String('')});

    const navigate = useNavigate();
    let name, value;
    const handleInput = (e) =>{
        name = e.target.name;
        value= e.target.value;

        setProduct({...product,[name]:value});
    }
    const ADDPRODUCT = async(e) =>{
        e.preventDefault();
            const {name ,category ,price ,count ,image ,brand ,gender ,description} = product;
            
            if(!name || !category || !image ||  !price || !count || !brand || !gender || !description){
              return toast.warning('Please fill up the details....')
            }
            else{
                const res = await fetch('/addproduct', {
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
               toast.success('Product Addedd Successfully...')
               navigate('/allproduct')
           }

            }
    }
  return (
    <div>
        <div className="content" style={{marginLeft:'-10px'}}>
            <h3>Add New Product..</h3>
        <div className="login-form">
        <form method='POST'>
            <Row>
                <Col md={4}>
                <div className="form-group">
                    <label className="form-control-label" htmlFor='Product Name'>Product NAME</label>
                    <input type="text" placeholder='For Ex: Puma Shoes' className="form-control" name='name' value={product.name}  onChange={handleInput}/>
                </div>  
                <div className="form-group">
            <label className="form-control-label" htmlFor='Product Brand'>Product BRAND</label>
            <input type="text" placeholder='For Ex: PUMA or NIKE or ADDIDAS' className="form-control" name='brand' value={product.brand}  onChange={handleInput} />
        </div>
                </Col>
                <Col>
                <div className="form-group">
            <label className="form-control-label" htmlFor='Product Price'>Product Price</label>
            <input type="text" placeholder='$199.00' className="form-control" name='price' value={product.price}  onChange={handleInput} />
        </div>
        <div className="form-group">
            <label className="form-control-label" htmlFor='Product Total'>Product TOTAL NO OF PRODUCTS</label>
            <input type="text" placeholder='For Ex: 1 or 10' className="form-control" name='count' value={product.count}  onChange={handleInput}/>
        </div>
                </Col>
                <Col md={4}>
                <div className='form-group'>
              <label className="form-control-label"  htmlFor="sel1">Product GENDER</label>
                <select className="form-control w-25" id="sel1" name='gender' value={product.gender} 
                onChange={handleInput} >
                  <option >----</option>
                  <option value={'Men'}>Men</option>
                  <option value={'Women'}>Women</option>
                </select>
            </div>
                <div className='form-group'>
              <label className="form-control-label"  htmlFor="sel1">Product CATEGORY</label>
                <select className="form-control w-25" id="sel1"name='category' value={product.category}  onChange={handleInput} >
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
            </Row>
            <div className="form-group" htmlFor="Product Image">
            <label className="form-control-label">Product IMAGE URL</label>
            <input type="text" className="form-control" name='image' value={product.image}  onChange={handleInput} />
        </div>

        <div className="form-group">
            <label className="form-control-label" htmlFor='Product Description'>Product DESCRIPTION</label>
            <input type="text" className="form-control" name='description' value={product.description}  onChange={handleInput} />
        </div>
        <div>
            <button className='btn btn-outline-dark' onClick={ADDPRODUCT}>ADD NEW PRODUCT</button>
        </div>
        </form>
        </div>
        </div>
        </div>

  )
}

export default CreateProduct