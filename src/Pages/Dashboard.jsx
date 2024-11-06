import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Add from '../Component/Add';
import Edit from '../Component/Edit';
import { useEffect } from 'react';
import { getStudentApi } from '../services/allApis';
import { useContext } from 'react';
import { addResponseContext ,editResponseContext} from '../contextApi/Context';
import { deleteStudentApi } from '../services/allApis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



function Dashboard() {
  const [student,setStudent]=useState([])
  const [searchKey,setSearchKey]=useState("")
  console.log(searchKey)
  const {addResponse,setAddResponse}=useContext(addResponseContext)
  const {editResponse}=useContext(editResponseContext)

  const nav=useNavigate()


  useEffect(()=>{
    getData()

  },[addResponse,searchKey,editResponse])


  const getData=async()=>{
    const header={
      "Content-Type":"application/json",
      "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    const res=await  getStudentApi(header,searchKey)
    console.log(res)

    if(res.status==200){
      setStudent(res.data)
      
    }

  }

  const handleDelete=async(id)=>{
   const header={
    "Content-Type":"application/json",
    "Authorization":`Token ${sessionStorage.getItem('token')}`
   }

   const res=await deleteStudentApi(id,header)
   if(res.status==200){
    toast.success("Student Details Removed")
    getData()
   }
   else{
    toast.error("Something Went Wrong")
    console.log(res)
   }
  }
    
  const logOut=()=>{
    sessionStorage.clear()
    nav('/auth')
  }
  return (
   <>

<Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home" >
          <i className="fa-solid fa-graduation-cap fa-xl" style={{color: "#ec465f",}} />             
             Student Mangement          
            </Navbar.Brand>

            <button className='btn btn-danger' onClick={logOut}>LogOut</button>
        </Container>
      </Navbar>
      <div className="p-3">
        <div className='d-flex justify-content-between'>
        <Add/>
        <div >
          <input type="text" placeholder='Search By name' onChange={(e)=>setSearchKey(e.target.value)} className='form-control' />
        </div>

        </div>

      {
        student.length>0?

        <table className="table table-bordered mt-4">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Phone</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
          {
            student.map((item,index)=>(
              <tr>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.batch}</td>
                <td>{item.phone}</td>
                <td>
                    <Edit student={item}/>
                    <button className="btn" onClick={()=>handleDelete(item._id)}>
                    <i className="fa-solid fa-trash" style={{color: "#d21466",}} />
                    </button>
                </td>
            </tr>

            ))
          }
            
        </tbody>
      </table>
      :
      <h3>No Students Added Yet</h3>
      }


      </div>

       

   
   
   </>
  )
}

export default Dashboard
