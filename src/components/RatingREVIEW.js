import React, { useEffect, useState } from 'react'
import {Row, Col} from 'react-bootstrap'
import { toast } from 'react-toastify';

const RatingREVIEW =(props) => {

const [data, setData] = useState({});
  useEffect(()=>{
      setData(props);  
  },[props])

  const mydata = data.name;
  const [Review, setReview] = useState({star:Number(), product:String(mydata), content:''})

  let name, value;
  const handleInput = (e) =>{
      name = e.target.name;
      value = e.target.value;

      setReview({...Review,[name]:value});
  }

  const PostReview = async(e) =>{
    e.preventDefault();
const { star,product, content} = Review;
if(star ==='' || product===mydata || content === ''){
   return toast.warning('Please fill the form properly....')
}

    const res = await fetch('/review', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({star:star, product:mydata, content:content})
    })

    const data = await res.json();

    if(res.status === 422 || !data){
        toast.error('Invalid Registration...')
    }
    else{
        toast.success('Registration Successfull...')
  
    }
}

  return (
    <div>
      <div>
       <Row>
       <Col sm={4} md={6} lg={6}>
          <div className='m-5' >
            <span>SUBMIT YOUR PRODUCT RATING</span><br />
              <select className='text-center' name='star' value={Review.star} onChange={handleInput}>
                <option>Select Ratings</option>
                <option value={0.5}>0.5</option>
                <option value={1}>1</option>
                <option value={1.5}>1.5</option>
                <option value={2}>2</option>
                <option value={2.5}>2.5</option>
                <option value={3}>3</option>
                <option value={3.5}>3.5</option>
                <option value={4}>4</option>
                <option value={4.5}>4.5</option>
                <option value={5}>5</option>
              </select>
          </div>          
          {/* <span style={{float:'right'}}>{data.name}</span> */}
          <input type='text' value={Review.product} name='product' onChange={handleInput}/>
          <div className='m-5'>
            <label className="form-label fs-4" htmlFor="textAreaExample">Message</label>
            <textarea className="form-control" id="textAreaExample" placeholder='Write a review for product...' name='content' value={Review.content} onChange={handleInput} rows="5"></textarea>
            <button className='m-2 btn btn-outline-dark' onClick={PostReview}>SUBMIT</button>
          </div>
        </Col>
        <Col sm={4} md={6} lg={6}>
          CONTENTS
        </Col>
       </Row>
      </div>
    </div>
  )
}

export default RatingREVIEW
