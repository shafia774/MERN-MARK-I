import {Container} from 'react-bootstrap';
import {Outlet} from 'react-router-dom';
import Header from "./layouts/partials/header";
import Footer from './layouts/partials/footer';


const App = () => {
  return (
    <>
      <Header />
      <main className='ms-auto'>
        <Container >
          <Outlet/>
        </Container>
      </main>  
      <Footer />
    </>
  );
};

export default App