import {Row,Col} from 'react-bootstrap';
import Product from '../components/product';
import Loader from '../components/loader';
import Message from '../components/message';
import { useGetProductsQuery } from '../slices/productApiSlice';

const HomeScreen = () =>{

    const{data,isLoading,error}= useGetProductsQuery();
    const products = data?.data?.products;
    return(
        <>
        {isLoading?(
            <Loader/>
        ): error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ):(
            <>
            <h1>Home</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
                
            </Row>
            </>
        )}

        
        </>
    )
}

export default HomeScreen