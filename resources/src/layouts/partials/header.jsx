import {Navbar,Nav,Container, NavDropdown} from 'react-bootstrap';
import { Await, useNavigate } from 'react-router-dom';
import  {FaShoppingCart,FaUser} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { logout } from '../../slices/authSlice';
import logo from '../../assets/logo.svg';
import { toast } from 'react-toastify';

const Header = () =>{

    const {userInfo} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () =>{
      try{
        await logoutApiCall({ token: userInfo.token }).unwrap();
        dispatch(logout());
        navigate('/login');
      }catch(error){
          // If not, handle the error (log or display a message)
          console.error('Logout failed:', error?.data?.message || error.error);
          toast.error(error?.data?.message || error.error);
      }
    }
    return(
        <header>
        <Navbar bg='primary'  expand='lg' collapseOnSelect>
          <Container >
            <LinkContainer to='/'>
              <Navbar.Brand >
                <img src={logo} alt='name'/>
              </Navbar.Brand>
            </LinkContainer>
            
            LOGO
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                <LinkContainer to='/cart'>
                  <Nav.Link>
                    <FaShoppingCart /> Cart
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown title={userInfo.data.user.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ):(
                  <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
                ) }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    )
}

export default Header