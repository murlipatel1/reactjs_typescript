import './App.css'
import ContactForm from './components/ContactForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Table from './components/Table';
import Department from './components/Department';

function App() {

  return (
    <>
    
    <Router>
      <Routes>
      <Route path="/" element={<ContactForm />} />
      <Route path="/table" element={<Table />} />

      </Routes>
      </Router>
    </>
  )
}

export default App
