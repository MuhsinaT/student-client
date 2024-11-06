import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Landing() {
  return (
   <>

<div className="w-100 d-flex justify-content-center align-items-center" style={{height:'100vh',backgroundColor:'aliceblue'}}>

    <div className="w-75 p-5">
        <Row>

            <Col>
            <h2>Student Management</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime praesentium cupiditate natus nulla dolorum quo, inventore architecto sint esse atque repellat omnis beatae eveniet! Ratione, repudiandae ab. Quas, qui repellat.</p>
            <Link to='/auth' className='btn btn-primary'>Lets Go</Link>
            </Col>

            <Col>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/students-reading-books-illustration-download-in-svg-png-gif-file-formats--young-group-study-ladder-business-pack-illustrations-1634103.png" alt=""  className='img-fluid w-100' style={{height:'50vh'}} />
            </Col>
        </Row>
    </div>
</div>
   
   
   </>
  )
}

export default Landing
