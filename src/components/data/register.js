import { useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import '../../css/register.css'

const Register = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const resetForm = () => {
        setEmail('')
        setPassword('')
        setUsername('')  
        setConfirmPassword('')     
    }

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        } else if(e.target.name === 'username') {
            setUsername(e.target.value)
        } else if(e.target.name === 'password') {
            setPassword(e.target.value)
        } else if(e.target.name === 'confirmPassword') {
            setConfirmPassword(e.target.value)
        } 
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            username, email, password
        }

         //validations
         const validationErrors = {}
         console.log(validationErrors)
         if(!data.username.trim()) {
            validationErrors.username = "username is required"
         }

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

         if(!confirmPassword.trim()) {
             validationErrors.confirmPassword = "password is required"
         } else if(data.password.length < 8){
             validationErrors.password = "password should be at least 8 char"
         }
         setErrors(validationErrors)

        if(password === confirmPassword && Object.keys(errors).length === 0) {
            const loader = async () => {
                try{
                    const response = await axios.post('http://localhost:4477/api/user/register', data)
                    console.log(response.data)
                    if(response.data?._id){
                        alert('successfully register')
                        resetForm()
                        navigate('/login')  
                    } else {
                        alert(response.data?.error)
                    }
                } catch(e) {
                    alert(e.message)
                }
            }
            loader()
        }
    }

    return (
        <div className="login-box">
            <div>
                <h4 className="text-center text-success">Register</h4>
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <FloatingLabel controlId="floatingUsername" label="Username" className="mt-1" >
                        <Form.Control type="text" 
                            placeholder="enter your username"
                            name="username"
                            defaultValue={username} 
                            onChange={handleChange}
                            required />
                    </FloatingLabel>
                    {errors.username ? <span className="text-danger">{ errors.username }</span> : null}
                    <FloatingLabel controlId="floatingEmail" label="Email" className="mt-1" >
                        <Form.Control type="text" 
                            placeholder="enter your email"
                            name="email"
                            defaultValue={email} 
                            onChange={handleChange}
                            required />
                    </FloatingLabel>
                    {errors.email ? <span className="text-danger">{errors.email}</span> : null}
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mt-1">
                        <Form.Control type="password" 
                            placeholder="enter your Password"
                            name="password"
                            defaultValue={password} 
                            onChange={handleChange}
                            required />
                    </FloatingLabel>
                    {errors.password ? <span className="text-danger">{errors.password}</span> : null}
                    <FloatingLabel controlId="floatingConfirmPassword" label="ConfirmPassword" className="mt-1">
                        <Form.Control type="password" 
                            placeholder="enter your Confirm Password"
                            name="confirmPassword"
                            defaultValue={confirmPassword} 
                            onChange={handleChange}
                            required />
                    </FloatingLabel>
                    {errors.confirmPassword ? <span className="text-danger">{errors.confirmPassword}</span> : null}
                    <div className="d-flex justify-content-center mt-3">
                        <Button variant="outline-info" type="submit" style={{width:"120px", marginLeft:"2px"}}>Submit</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register