import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Game from './components/Game';
import { Container, Divisor } from './Styles';
import Home from './components/Home';

function App() {
  return (
    <Container>
      {/* <NavBar>
        <Link to='/'>Home</Link>
        <Link to='/game'>Play</Link>
      </NavBar>
      <Divisor /> */}
      <Routes>
        <Route path='/game' element={<Game />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Container>
  );
}
export default App;
