import React from 'react';
import UseApi from './useApi';
import Footer from './components/Footer/Footer';
import Dropdown from "./components/dropdown/Dropdown";




function App() {

  return (
    <div>
      <h1>Connect Front to Back</h1>
      <UseApi />
      <Dropdown />
      <Footer />
    </div>
  )
}

export default App
