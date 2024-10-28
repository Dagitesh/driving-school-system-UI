
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard'

import StudentRegistration from './components/enrollment'
import AppBarComponent from './components/AppBarComponent';

function App() {
  

  return (
    <>
     
      <Router>
      <div>
       <AppBarComponent/>
        

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/enrollment" element={<StudentRegistration />} />
        </Routes>
      </div>
    </Router>
       
     
    </>
  )
}

export default App
