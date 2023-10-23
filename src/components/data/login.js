import { useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import '../../css/login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const resetForm = () => {
        setEmail('')
        setPassword('')       
    }

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        } else if(e.target.name === 'password') {
            setPassword(e.target.value)
        } 
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            email, password
        }
        
        //validations
        const validationErrors = {}
        if(!data.email.trim()) {
            validationErrors.email = "email is required"
        } else if(!/\S+@\S+\.\S+/.test(data.email)){
            validationErrors.email = "email is not valid"
        }
        if(!data.password.trim()) {
            validationErrors.password = "password is required"
        } else if(data.password.length < 8){
            validationErrors.password = "password should be at least 8 char"
        }
        setErrors(validationErrors)

        if(Object.keys(errors).length === 0) {
            const loader = async () => {
                try{
                    const response = await axios.post('http://localhost:4477/api/user/login', data)
                    console.log(response.data) 
                    if(response.data?.token) {
                        localStorage.setItem('loginToken', response.data?.token)
                        alert('successfully logged in')
                        resetForm()
                        navigate('/')  
                    } else {
                        alert(response.data?.error)
                    }
                } catch(e) {
                    alert(e.message)
                }
            }
            loader()
        } else {
            alert("please fill all the fields properly")
        }
    }

    return (
        <div className="login-box">
            <div>
                <h4 className="text-center text-success fs-2">Login</h4>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingEmail" label="Email" className="mt-3" >
                        <Form.Control type="text" 
                            placeholder="enter your email"
                            name="email"
                            defaultValue={email} 
                            onChange={handleChange}
                            required />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mt-1">
                        <Form.Control type="password" 
                            placeholder="enter your Password"
                            name="password"
                            defaultValue={password} 
                            onChange={handleChange}
                            required />
                    </FloatingLabel>
                    <div className="d-flex justify-content-center mt-3">
                        <Button variant="outline-info" type="submit" style={{width:"120px", marginLeft:"2px"}}>Submit</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login