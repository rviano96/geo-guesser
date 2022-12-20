import { Route, Routes } from 'react-router-dom';
import Game from './components/Game';
import { Container } from './Styles';
import Home from './components/Home';

function App() {
  return (
    <Container>
      <Routes>
        <Route path='/game' element={<Game />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Container>
  );
}
export default App;
