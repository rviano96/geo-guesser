import { Navigate, Route, Routes } from 'react-router-dom';
import Game from './components/Game';
import { Container } from './Styles';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import Protected from './components/Protected';
import { BASE_PATH, HOME_PAGE_PATH, GAME_PAGE_PATH, REGISTER_PAGE_PATH, LOGIN_PAGE_PATH } from './Constants';

function App() {
  const { user } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(!!user)
  }, [user])

  return (
    <Container>
      <Routes>
        <Route
          path="*"
          element={<Navigate to={BASE_PATH} replace />}
        />
        <Route
          path={BASE_PATH}
          element={<Navigate to={HOME_PAGE_PATH} replace />}
        />
        <Route path={GAME_PAGE_PATH} element={<Protected isLoggedIn={isLoggedIn}> <Game /> </Protected>} />
        <Route path={HOME_PAGE_PATH} element={<Protected isLoggedIn={isLoggedIn}> <Home /> </Protected>} />
        <Route path={REGISTER_PAGE_PATH} element={isLoggedIn ? <Navigate to={BASE_PATH} replace /> : <Register />
        } />
        <Route path={LOGIN_PAGE_PATH} element={isLoggedIn ? <Navigate to={BASE_PATH} replace /> : <Login />} />
      </Routes>
    </Container>
  );
}
export default App;
