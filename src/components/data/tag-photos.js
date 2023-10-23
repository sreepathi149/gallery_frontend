import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import jwtDecode from "jwt-decode"
import { GalleryContext } from "../../App";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";


const TagPhotos = () => {
    const navigate = useNavigate()
    const {state: data} = useLocation()
    const {state, dispatch} = useContext(GalleryContext)
    const users = state.users
    const [selected, setSelected] = useState([])
    const tokenData = jwtDecode(localStorage.getItem('loginToken'))

    const options = users.map((user) => {
        return user._id === tokenData.id ? {label: user.username, value: user._id, disabled: true} : {label: user.username, value: user._id}
    })

    useEffect(() => {
        const loader = async () => {
            try {
                const response = await axios.get("http://localhost:4477/api/users",{
                    headers: {
                        "authorization": localStorage.getItem("loginToken")
                    }
                })
                if(response.data?.length > 0) {
                    dispatch({type: "SET_USERS", payload: response.data})
                }
            } catch(e) {
                alert(e.message)
            }
        }
        loader()
    }, [dispatch])
    
    const handleClick = (e) => {
        e.preventDefault()
        const formData = {tags: selected, imgId: data.imgId}
        const loader = async () => {
            try {
                const response = await axios.put(`http://localhost:4477/api/update-tags/${data.id}`, formData, {
                    headers: {
                        "authorization": localStorage.getItem("loginToken")
                    }
                })
                console.log(response.data)
                if(response.data) {
                    dispatch({type: "UPDATE_TAGS", payload: response.data})
                    alert('successfully tagged users')
                    setSelected([])
                    navigate('/')
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
        <div className="container mt-3">
            <div className="d-flex justify-content-center mt-3">
                <h1>Tag Photos</h1>
            </div>
            <div className="">
                <pre>{JSON.stringify(selected)}</pre>
                <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                />
            </div>
            <div className="d-flex justify-content-center mt-3">
                <Button variant="outline-info" onClick={handleClick} type="submit"> Tag photo </Button>
            </div>
        </div>
    )
}

export default TagPhotos