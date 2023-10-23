import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import Photo from './photo'
import { GalleryContext } from '../../App'
const { Form, FloatingLabel, Card, Row, Col } = require("react-bootstrap")

const Gallery = () => {
    const {state, dispatch} = useContext(GalleryContext)
    const photos = state.photos
    const [data, setData] = useState('')
    const [photoObj, setPhotoObj] = useState({})
    const [modalShow, setModalShow] = useState(false)

    useEffect(() =>{
        const loader = async () => {
            try {
                const response = await axios.get('http://localhost:4477/api/get-photos')
                if(response.data?.length > 0) {
                    dispatch({type: "SET_PHOTOS", payload: response.data})
                }
            } catch(e) {
                alert(e.message)
            }
        }
        loader()
    }, [dispatch])

    const handleChange = (e) => {
        setData(e.target.value)
    }
    
    const handleImage = (e, obj) => {
        setModalShow(true)
        setPhotoObj(obj)
    }

    const filteredPhotos = () => {
        const result = photos.filter((photo) => {
            return photo.title?.toLowerCase().includes(data) || photo.description?.toLowerCase().includes(data) || photo.category?.toLowerCase().includes(data)
        })
        return result
    }

    const photosData = filteredPhotos()

    return (
        <div>
            <Photo
                show={modalShow}
                onHide={() => setModalShow(false)}
                photo={photoObj}
            />
            <Form autoComplete='off'>
                <FloatingLabel controlId="floatingUsername" label="Search" className="mt-1">
                    <Form.Control type="text" 
                        placeholder="Search"
                        name="data"
                        defaultValue={data} 
                        onChange={handleChange}
                        />
                </FloatingLabel>
            </Form>
            <Row className="mt-3">
                {photosData.map((photo) => {
                    return photo.path.map((ele) => {
                        return (
                            <Col xs="auto" style={{margin: "2px"}} key={ele._id}>
                                <Card style={{width: "11rem", height:"9rem"}} className="bg-light bd-gradient">
                                    <Card.Body><img src={`http://localhost:4477/images/${ele.name}`} 
                                        alt="" 
                                        onClick={(e) => {handleImage(e, photo)}} 
                                        style={{width: "9rem", height:"7rem"}} 
                                    /></Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                })}
            </Row>
        </div>
    )
}

export default Gallery