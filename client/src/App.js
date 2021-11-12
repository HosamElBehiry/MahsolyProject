import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/pages/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Routes } from './routes/Router';
import {  BrowserRouter as Router } from 'react-router-dom';
import FixedIcon from './components/FixedIcon/FixedIcon';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes />
        <FixedIcon />
        <Footer />
      </Router>
    </div>
  );
}


export default App;

