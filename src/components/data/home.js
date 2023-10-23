import { Tab, Tabs } from "react-bootstrap"
import PhotoForm from "./photo-form"
import Gallery from "./gallery"

const Home = () => {
    return (
        <div className="container-fluid">
            <div className="mt-3">
                <Tabs defaultActiveKey="gallery" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="gallery" title='Gallery'>
                        <Gallery />
                    </Tab>
                    {localStorage.getItem('loginToken') && <Tab eventKey="addPhoto" title='Photo'>
                        <PhotoForm />
                    </Tab>}
                </Tabs>
            </div>
        </div>
    )
}

export default Home