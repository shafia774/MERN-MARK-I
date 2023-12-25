import {useState , useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/formContainer';
import Loader from '../components/loader';
import { useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {

    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register,{ isLoading }] = useRegisterMutation();
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
        if(password !== confirmPassword){
            toast.error('Passwords do not match. Please try again.')
            return;
        }else{
            try{
                const res = await register(
                    {name,email,password}).unwrap();
                dispatch(setCredentials({...res,}));
                navigate(redirect);
            }catch(error){
                toast.error(error?.data?.message || error.error)
            }
        }
        
    };

  return (
    <FormContainer >
        <h1>Sign Up</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text'
                placeholder='Enter your name'
                value={name}
                onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId='email' className='my-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email'
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

            <Form.Group controlId='confirmPassword' className='my-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='confirmPassword'
                placeholder='Re-enter your password'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </Form.Group>

            <Button type='submit' variant='primary'
                    className='my-3' disabled={isLoading}>
                Sign Up
            </Button>

            {isLoading && <Loader/>}
        </Form>
        <Row className='py-3'> 
            <Col>
                Alreadt have an account <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} >click here</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen