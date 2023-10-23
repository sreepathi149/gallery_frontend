import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/data/nav';
import Login from './components/data/login';
import Home from './components/data/home';
import Register from './components/data/register';
import TagPhotos from './components/data/tag-photos';
import { createContext, useReducer } from 'react';


const reducer = (state, action) => {
  switch(action.type) {
    case "SET_USERS" : {
        return {...state, users: action.payload }
    }
    case "SET_PHOTOS" : {
        return {...state, photos: action.payload }
    }
    case "ADD_PHOTOS" : {
        return {...state, photos: [...state.photos, action.payload] }
    }
    case "UPDATE_TAGS" : {
      return {...state, photos: state.photos.map((photo) => {
        if(photo._id === action.payload._id) {
          return {...photo, ...action.payload}
        } else {
          return {...photo}
        }
      })}
    }
    case "UPDATE_VIEWS": {
      return {...state, photos: state.photos.map((photo) => {
        if(photo._id === action.payload._id) {
          return {...photo, ...action.payload}
        } else {
          return {...photo}
        }
      })}
    }
    case "UPDATE": {
      return {...state, photos: state.photos.map((photo) => {
        if(photo._id === action.payload._id) {
          return {...photo, ...action.payload}
        } else {
          return {...photo}
        }
      })}
    }
    case "DELETE_PHOTOS" : {
      return {...state, photos: state.photos.filter(photo => photo._id !== action.payload)}
    }
    default: {
      return {...state}
    }
  }
}

export const GalleryContext = createContext()

const App = () => {
  const [state, dispatch] = useReducer(reducer, {users:[], photos:[]})
  return (
    <div>
      <GalleryContext.Provider value={{state, dispatch}}>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tag-photos" element={<TagPhotos />} />
      </Routes>
      </GalleryContext.Provider>
    </div>
  );
}

export default App;
