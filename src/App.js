import './App.css';
import ProductList from './features/products/ProductList';
import { Route, Routes, Navigate } from 'react-router-dom';
import EditProduct from './features/admin/EditProduct';
import PhotoList from './features/photo/PhotoList'
import SignIn from './features/user/SignIn';
import Details from './features/products/Details';
import SignUp from './features/user/SignUp';
import { grey } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './Navbar';
import Cart from './features/order/Cart';
import Chat from "./features/chat/chat.jsx";
function App() {
  const userRole = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).role : null;

  const theme = createTheme({
    styleOverrides: {
      Button1: {
        color: 'red',
      },
    },
    typography: {
      fontFamily: ['"Segoe UI"']
    },
    palette: {
      primary: {
        main: grey[900],
      },
      secondary: {
        main: '#80cbc4',
      },
    }
  });

  return (<>
    <ThemeProvider theme={theme}>
      <Navbar />
      <Chat />
      <Routes>
        <Route path='/' element={<PhotoList />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='edit/:id' element={userRole === 'admin' ? <EditProduct isDefaultValues={true} /> : <Navigate to="/" replace />} />
        <Route path='add' element={userRole === 'admin' ? <EditProduct isDefaultValues={false} /> : <Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  </>
  );
}

export default App;