import axios from "axios"
import { useContext } from "react"
import { Button, Carousel, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import { GalleryContext } from "../../App"

const Photo = (props) => {
    const {dispatch} = useContext(GalleryContext)
    const {photo} = props

    const handleDelete = (e, id, imgId) => {
        e.preventDefault()
        console.log(id)
        const data = {imgId}
        const loader = async () => {
            try{
                const response = await axios.put(`http://localhost:4477/api/delete-image/${id}`, data, {
                    headers: {
                        "authorization": localStorage.getItem("loginToken")
                    }
                })
                console.log(response.data)
                if(response.data?._id){
                    dispatch({type: "UPDATE", payload: response.data})
                    alert('successfully deleted image')
                    props.onHide()
                } else {
                    alert(response.data?.error)
                }
            } catch(e) {
                alert(e.message)
            }
        }
        loader()
    }

    const handlePhotoDelete = (e, id) => {
        e.preventDefault()
        console.log(id)
        const loader = async () => {
            try{
                const response = await axios.delete(`http://localhost:4477/api/delete-photo/${id}`, {
                    headers: {
                        "authorization": localStorage.getItem("loginToken")
                    }
                })
                console.log(response.data)
                if(response.data?._id){
                    dispatch({type:"DELETE_PHOTOS", payload:response.data?._id})
                    alert('successfully deleted photos')
                    props.onHide()
                } 
            } catch(e) {
                alert(e.message)
            }
        }
        loader()
    }

    const handleViews = (e,id,imgId) => {
        e.preventDefault()
        console.log(id,imgId)
        const views = 1

        const data= {imgId, views}

        const loader = async () => {
            try{
                const response = await axios.put(`http://localhost:4477/api/update-views/${id}`, data)
                if(response.data){
                    //alert('successfully updated views')
                    dispatch({type: "UPDATE_VIEWS", payload: response.data})
                } else {
                    alert(response.data?.error)
                }
            } catch(e) {
                alert(e.message)
            }
        }
        loader()
    }

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {photo.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark bg-gradient">
                    <div className="container-fluid d-flex justify-content-center">
                        <Carousel fade>
                            {photo.path?.map((ele) => {
                                return (
                                <Carousel.Item key={ele._id}>
                                    <img src={`http://localhost:4477/images/${ele.name}`} 
                                        alt="" 
                                        style={{height: "400px", maxWidth: "100%"}} 
                                        onClick={(e) => {handleViews(e, photo._id, ele._id)}}
                                    /> 
                                    <Carousel.Caption>
                                    <h4>Views-{ele.views}</h4>
                                    {localStorage.getItem("loginToken") && <Button variant="danger" onClick={(e) => {handleDelete(e, photo._id, ele._id)}} style={{marginRight:"4px"}}>Delete</Button>}
                                    {localStorage.getItem("loginToken") && <Button variant="danger" as={Link} to="/tag-photos" state={{id: photo._id, imgId:ele._id}}>Tag</Button>}
                                    </Carousel.Caption>
                                </Carousel.Item>)
                            })}  
                        </Carousel>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {localStorage.getItem("loginToken") && <Button variant="outline-primary" onClick={(e) => {handlePhotoDelete(e,photo._id)}}>Delete Photo</Button>}
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Photo