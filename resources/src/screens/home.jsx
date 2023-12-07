import {Row,Col} from 'react-bootstrap'
import Product from '../components/product'

const HomeScreen = () =>{
    return(
        <>
        <h1>Home</h1>
        <Row>
            <Col sm={12} md={6} lg={4} xl={3}>
                <Product />
            </Col>
        </Row>
        </>
    )
}

export default HomeScreen