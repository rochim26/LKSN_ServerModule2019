import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext'
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Navbar from './components/Navbar';
import BoardDetail from './components/BoardDetail';
import BoardContextProvider from './contexts/BoardContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Navbar />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <BoardContextProvider>
              <Route exact path="/" component={Home} />
              <Route path="/:board" component={BoardDetail} />
            </BoardContextProvider>
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
