import { Navigate, Route, Routes } from 'react-router-dom';
import ReposSearchPage from './Pages/ReposSearchPage/ReposSearchPage';
import './styles/style.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ReposSearchPage />} />
      <Route path='/repos' element={<ReposSearchPage />} />
      <Route path='/repos/:title' element={<ReposSearchPage />} />
      <Route path="/*" element={<Navigate replace to="/repos" />} />
    </Routes>
  )
}

export default App;
