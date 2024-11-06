import React from 'react'
import { useState ,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addStudentApi } from '../services/allApis';
import { useContext } from 'react';
import { addResponseContext } from '../contextApi/Context';

function Add() {
    const [show, setShow] = useState(false);

    const handleClose = () =>{ 
        setShow(false);
        setStudent({
            name:"",batch:"",phone:"",image:""
        })

    }
    const handleShow = () => setShow(true);

    const [student,setStudent]=useState({
        name:"",batch:"",phone:"",image:""
    })

    const [preview,setPreview]=useState("")
   
    const {addResponse,setAddResponse}=useContext(addResponseContext)


    useEffect(()=>{
        if(student.image){
            setPreview(URL.createObjectURL(student.image))
        }
        else{
            setPreview("")
        }

    },[student.image])

    const handleAdd=async()=>{
        console.log(student)
        const {name,phone,batch,image}=student
        if(!name || !phone || !batch || !image){
            // console.log("Name:", name, "Batch:", batch, "Phone:", phone, "Image:", image);
            toast.warning("Enter Valid Inputs")
        }
        else{
            const fd=new FormData()
            fd.append("name",name)
            fd.append("batch",batch)
            fd.append("phone",phone)
            fd.append("image",image)

            const header={
                "Content-Type":'multipart/form-data',
                "Authorization":`Token ${sessionStorage.getItem('token')}`
            }

            const res=await addStudentApi(fd,header)
            console.log(res)
            if(res.status==200){
                toast.success("Student Added")
                handleClose()
                setAddResponse(res)
            }
            else{
                toast.error("Adding Failed!!")
            }


        }

    }
    return (
        <>

            <div className="button mt-4 ms-2 ">
                <button className="btn btn-primary" onClick={handleShow}>Add Students +</button>

            </div>

            <Modal
                className='modal-xl'
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Student Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col sm={6}>
                        <label>
                            <input type="file" style={{visibility:'hidden'}} onChange={(e)=>setStudent({...student,image:e.target.files[0]})} />
                            <img src={preview?preview:"https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"} 
                             className="img-fluid" alt="" srcset="" />
                        </label>

                        </Col>
                        <Col sm={6} className='d-flex flex-column justify-content-center'>
                        <input type="text" placeholder='Enter Name' onChange={(e)=>setStudent({...student,name:e.target.value})} name='name' className='form-control mb-2' />
                        <input type="number" placeholder='Enter phone Number' onChange={(e)=>setStudent({...student,phone:e.target.value})} name='phone' className='form-control mb-2' />
                        <input type="text" placeholder='Enter Class' onChange={(e)=>setStudent({...student,batch:e.target.value})} name='name' className='form-control mb-2' />




                        
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>Save</Button>
                </Modal.Footer>
            </Modal>



        </>
    )
}

export default Add
