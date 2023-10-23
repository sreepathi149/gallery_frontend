import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useContext, useState } from "react"
import "../../css/photo.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { GalleryContext } from "../../App"

const PhotoForm = () => {
    const navigate = useNavigate()
    const {dispatch} = useContext(GalleryContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState([])
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        if(e.target.name === "title") {
            setTitle(e.target.value)
        } else if(e.target.name === "description"){
            setDescription(e.target.value)
        } else if(e.target.name === "category") {
            setCategory(e.target.value)
        } else if(e.target.name === "images") {
            setImages([...images, ...e.target.files])
        }
    }

    const resetForm = () => {
        setTitle("")
        setDescription("")
        setCategory("")
        setImages([])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        images.map(file => formData.append("path", file))
        formData.append("title", title)
        formData.append("description", description)
        formData.append("category", category)

        //validations
        const validationErrors = {}
        if(!title.trim()) {
           validationErrors.title = "title is required"
        }

        if(!description.trim()) {
            validationErrors.description = "description is required"
        } 

        if(!category.trim()) {
            validationErrors.category = "category is required"
        } 

        if(!images.length === 0) {
            validationErrors.images = "images is required"
        }
        setErrors(validationErrors)
        console.log(validationErrors)

        if(Object.keys(errors).length === 0) {
            const loader = async () => {
                try{
                    const response = await axios.post('http://localhost:4477/api/create-photo', formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "authorization": localStorage.getItem("loginToken")
                        }
                    })
                    console.log(response.data) 
                    if(response.data?._id) {
                        dispatch({type: "ADD_PHOTOS", payload: response.data})
                        alert('successfully created photo')
                        resetForm()
                        navigate('/')  
                    }
                } catch(e) {
                    alert(e.message)
                }
            }
            loader()
        }   
    }

    return (
        <div className="photo-box">
            <div>
                <h4 className="text-center text-success">Add Photos</h4>
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <FloatingLabel controlId="floatingTitle" label="Title" className="mt-3" style={{width: "250px"}}>
                        <Form.Control type="text" 
                            placeholder="enter your title"
                            name="title"
                            defaultValue={title} 
                            onChange={handleChange}
                            />
                    </FloatingLabel>
                        {errors.title ? <span className="text text-danger"> {errors.title} </span> : null}
                    <FloatingLabel controlId="floatingDescription" label="Description" className="mt-2" style={{width: "250px"}}>
                        <Form.Control type="text" 
                            placeholder="enter your description"
                            name="description"
                            defaultValue={description} 
                            onChange={handleChange}
                            required />
                    </FloatingLabel>
                    {errors.description ? <span className="text text-danger"> {errors.description} </span> : null}
                    <FloatingLabel controlId="floatingCategory" label="Category" className="mt-2 mb-2" style={{width: "250px"}}>
                        <Form.Control type="text" 
                            placeholder="enter your category"
                            name="category"
                            defaultValue={category} 
                            onChange={handleChange}
                            required />
                    </FloatingLabel>
                    {errors.category ? <span className="text text-danger"> {errors.category} </span> : null}
                    <Form.Control style={{width: "250px"}}
                        type="file" 
                        name="images"
                        defaultValue={images} 
                        onChange={handleChange}
                        multiple
                        required />
                        {errors.images ? <span className="text text-danger"> {errors.images} </span> : null}
                    <div className="d-flex justify-content-center mt-3">
                        <Button variant="outline-info" type="submit" style={{width:"120px", marginLeft:"2px"}}>Submit</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default PhotoForm