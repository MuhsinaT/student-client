import React from 'react'
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import base_url from '../services/base_url';
import { updateStudentApi } from '../services/allApis';
import { toast } from 'react-toastify';
import { editResponseContext } from '../contextApi/Context';
import { useContext } from 'react';

function Edit({student}) {
    const [show, setShow] = useState(false);
    const [detail,setDetail]=useState({...student})
    const [preview,setPreview]=useState("")

    const {setEditResponse}=useContext(editResponseContext)

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    useEffect(()=>{
        if(detail.image.type){
            setPreview(URL.createObjectURL(detail.image))
        }else{
            setPreview("")
        }
    },[detail.image])

    const handleEdit=async()=>{
        console.log(detail)
        const {name,phone,batch,image}=detail
        if(!name || !phone || !batch || !image){
            toast.warning("Invalid input")
        }
        else{
            if(image.type){
                const fd=new FormData()
                fd.append('name',name)
                fd.append('phone',phone)
                fd.append('batch',batch),
                fd.append('image',image)

                const header={
                    'Content-Type':'multipart/form-data',
                    'Authorization':`Token ${sessionStorage.getItem('token')}`


                }
                const res=await updateStudentApi(student._id,fd,header)
                if(res.status==200){
                    toast.success("Student Details Updated")
                    setEditResponse(res)
                    handleClose()
                    setDetail({...res.data})
                }
                else{
                    toast.error("Updation Failed !!!")
                    console.log(res)
                }
            }

            else{
                const header={
                    'Content-Type':'application/json',
                    'Authorization':`Token ${sessionStorage.getItem('token')}`


                }
                const res=await updateStudentApi(student._id,detail,header)
                if(res.status==200){
                    toast.success("Student Details Updated")
                    setEditResponse(res)
                    handleClose()
                    setDetail({...res.data})

                }
                else{
                    toast.error("Updation Failed !!!")
                    console.log(res)
                }

            }
        }
    }
    return (
        <>
            <button className="btn" onClick={handleShow}>
                <i className="fa-regular fa-pen-to-square" style={{ color: "#527dc7", }} />
            </button>




            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className='modal-xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Student Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col sm={6}>
                            <label>
                                <input type="file" style={{ visibility: 'hidden' }} onChange={(e)=>setDetail({...detail,image:e.target.files[0]})} />
                                <img src={preview?preview:`${base_url}/uploads/${student.image}`}
                                className="img-fluid" alt="" srcset="" />
                            </label>

                        </Col>
                        <Col sm={6} className='d-flex flex-column justify-content-center'>
                            <input type="text" placeholder='Enter Name'  onChange={(e)=>setDetail({...detail,name:e.target.value})} defaultValue={student?.name} name='name' className='form-control mb-2' />
                            <input type="number" placeholder='Enter phone Number' onChange={(e)=>setDetail({...detail,phone:e.target.value})} defaultValue={student?.phone} name='phone' className='form-control mb-2' />
                            <input type="text" placeholder='Enter Class' name='name'  onChange={(e)=>setDetail({...detail,batch:e.target.value})} defaultValue={student?.batch} className='form-control mb-2' />

                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>Save</Button>
                </Modal.Footer>
            </Modal>



        </>
    )
}

export default Edit
