import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div >
<footer>
<div className="top_header" >
<section>
{/* <span><iframe title='map' src="//maps.google.com/maps?q=-35.4735,149.0124&z=15&output=embed" width={200} height={200} style={{border:'none', float:'left'}}></iframe></span> */}
<i className="fas fa-location-dot" style={{color:"#ffbe00",fontSize:"35px", float:'left'}}></i>
<span><br />123 Street, <br/> Canberra<br/>ACT,<br/> Australia, 0000</span>

</section>
<section>
<i className="fa fa-phone"></i>
<span><a href='tel:123-456-7890' style={{color:'#000'}}>(+61) 1234 1234</a></span>
</section>
<section>
<i className="fa fa-envelope"></i>
<span><a href = "mailto:abc@example.com?subject = Feedback&body = Message" style={{color:'#000'}}>fshop123@xyz.com </a></span>
</section>
</div>
<span className="border-shape"></span>
<div className="bottom_content">
<section style={{fontSize:'1.6rem'}}>
<Link to="#"><i className="fab fa-facebook-f"></i></Link>
<Link to="#"><i className="fab fa-instagram"></i></Link>
<Link to="#"><i className="fab fa-twitter"></i></Link>
<Link to="#"><i className="fab fa-telegram"></i></Link>
</section>
<section>
<div class="form-group">
  <Row>
    <Col >
    <input type="email" className="form-control" style={{width:'600px', fontSize:'1.0rem'}} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email to subscribe our news letter..." />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </Col>
    <Col md={2}>
    <button className='btn btn-outline-dark'>Subscribe</button>
    </Col>
  </Row>
  </div>
</section>
<section>
<Link to="/">Home</Link>
<Link to="/products">Products</Link>
<Link to="/cart">Cart</Link>
<Link to="/help">Help</Link>
<Link to="#">Member</Link>
<Link to="#">Contact Us</Link>
</section>
</div>
<div className="copyright">
  Create By: Danish Taneja @ August 2022
</div>
</footer>
    </div>
  )
}

export default Footer