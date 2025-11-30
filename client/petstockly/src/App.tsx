import { BrowserRouter, Routes, Route } from "react-router"   
import HomePage from "./pages/HomePage"
import UserDashBoard from "./pages/UserDashBoard"

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Inventories" element={<UserDashBoard />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
