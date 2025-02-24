import {Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Product = ({ product }) =>{
    return(
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/view/${product._id}`}>
                <Card.Img src={product.image || logo} variant='top' />
            </Link>
            <Card.Body>
            <Card.Title as='div'>
                <strong>{product.name}</strong>
            </Card.Title>


                <Card.Text as='div'>
                    <p>{product.price}</p>
                    <p>{product.quantity}</p>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product