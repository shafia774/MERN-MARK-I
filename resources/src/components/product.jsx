import {Card} from 'react-bootstrap'
import logo from '../assets/logo.svg'

const Product = () =>{
    return(
        <Card className='my-3 p-3 rounded'>
            <a>
                <Card.Img  src={logo} variant='top'/>
            </a>
            <Card.Body>
                <a >
                    <Card.Title as='div'>
                        <strong>Product Name</strong>
                    </Card.Title>
                </a>

                <Card.Text as='h3'>
                    33
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product