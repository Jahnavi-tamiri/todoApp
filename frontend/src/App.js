import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm'; // Make sure you create this component
import Signup from './components/Signup'; // Make sure you create this component
import './App.css';

const App = () => (
    <>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    </>
);

export default App;
