import {Container} from 'react-bootstrap';
import {Outlet} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from "./layouts/partials/header";
import Footer from './layouts/partials/footer';


const App = () => {
  return (
    <>
      <Header />
      <main className='ms-auto'>
        <Container className='p-3'>
          <Outlet/>
        </Container>
      </main>  
      <Footer />
      <ToastContainer/>
    </>
  );
};

export default App