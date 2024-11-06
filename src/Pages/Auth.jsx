import React,{useState} from 'react'
import { Row,Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { userRegister,loginApi } from '../services/allApis'
import { useNavigate } from 'react-router-dom'

function Auth() {

  const navigate=useNavigate()
    const [state,setState]=useState(false)
    const changeState=()=>{
        setState(!state)
    }

    const [user,setUser]=useState({
        email:"",username:"",password:""
    })

    const handleRegister=async()=>{
        console.log(user)
        const {email,username,password}=user
        if(!email || !username || !password){
            toast.warning("Enter Valid Inputs")
        }
        else{
            const res=await userRegister(user)
            console.log(res)
            if(res.status==200){
                toast.success("Registration Successfull")
                changeState()
                setUser({
                    email:"",username:"",password:""  
                })
            }
            else{
                toast.error("Registration Failed!!")
            }
        }
    }


    const handleLogin=async()=>{
        const {email,password}=user
        if(!email || !password){
            toast.warning("Enter Valid Inputs")
        }
        else{
             const res= await loginApi({email,password})
             if(res.status==200){
                sessionStorage.setItem('token',res.data.token)
                sessionStorage.setItem('uname',res.data.username)
                toast.success("Login SuccessFull!!")
                setUser({
                    email:"",username:"",password:""  
                })
                navigate('/dash')
             }
             else{
                toast.error("Login Failed")
                console.log(res)
             }
        }
    }
  
  return (
    <>
    <div className="w-100 d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
        <div className="w-75 border shadow bg-light p-2">
            <Row>
                <Col>
                < img src="https://i.pinimg.com/736x/ba/4a/53/ba4a53041abbd43616ab714a77489340.jpg" className='img-fluid' alt="" />

                </Col>
                <Col className='d-flex flex-column justify-content-center'>
                {
                    state?
                    <h3>Registration</h3>
                    :
                    <h3>Login</h3>


                }
                <input type="email" placeholder=' Email' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}  name='email' className='form-control mb-3'/>

                {
                    state &&
                    <input type="text" placeholder='Username' value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} name='username' className='form-control mb-3'/>
                }

                <input type="password" placeholder='Password' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} name='password' className='form-control mb-3'/>
                
                <div className="d-flex justify-content-between">
                    {
                        state?
                        <button className="btn btn-success" onClick={handleRegister}>Register</button>
                        :
                        <button className='btn btn-info' onClick={handleLogin}>Login </button>

                    }
                    <button className="btn btn-link" onClick={changeState}>

                        {
                            state?
                            <span>already a user?</span>
                            :
                            <span>New User</span>
                        }
                        
                        </button>
                </div>


                
                </Col>
            </Row>
        </div>

    </div>
    
    </>
  )
}

export default Auth
