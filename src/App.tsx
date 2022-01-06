import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ReposSearchPage from 'pages/ReposSearchPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ReposSearchPage />} />
      <Route path='/repos' element={<ReposSearchPage />} />
      <Route path='/repos/:title' element={<ReposSearchPage />} />
      <Route path='*' element={<Navigate replace to='/' />} />
    </Routes>
  )
}

export default App;
