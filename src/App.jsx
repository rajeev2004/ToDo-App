import React from "react";
import {HashRouter as Router,Routes,Route} from 'react-router-dom';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Notfound from "./components/Notfound";
function App(){
  return(
    <Router>
      <div>
          <Routes>
              <Route exact path="/" element={<Login />}/>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="*" element={<Notfound />}/>
          </Routes>
      </div>
    </Router>
  )
}
export default App;