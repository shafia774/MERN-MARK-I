import {useState , useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/formContainer';
import Loader from '../components/loader';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    
// method 1
    // const [authentication,setAuthentication] = useState({
    //     email : '',
    //     password : ''
    // })

    // method 2
    // const handleInput = (e) => {
    //         //two way binding
    // }



    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login,{ isLoading }] = useLoginMutation();
    const {userInfo} = useSelector(
        (state) => state.auth);

    const {search} = useLocation();
    const searchParams = new URLSearchParams(search);
    const redirect = searchParams.get('redirect') || '/';

    useEffect(() =>{
        if(userInfo){
            navigate(redirect);
        }

    },[userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const res = await login(
                {email,password}).unwrap();
            dispatch(setCredentials({...res,}));
            navigate(redirect);
        }catch(error){
            toast.error(error?.data?.message || error.error)
        }
    };

  return (
    <FormContainer >
        <h1>Sign in</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='my-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email'
                name="email"
                placeholder='Enter your email address'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId='password' className='my-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>

            </Form.Group>

            <Button type='submit' variant='primary'
                    className='my-3' disabled={isLoading}>
                Sign In
            </Button>

            {isLoading && <Loader/>}
        </Form>
        <Row className='py-3'> 
            <Col>
                Sign Up <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} >click here</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen