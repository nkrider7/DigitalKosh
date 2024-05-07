import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Navbar from "./Components/Navbar"
import Blogs from "./Pages/Blogs/Blogs"
import CoinVews from "./Components/CoinVews"

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/blogs" exact element={<Blogs />} />
        {/* <Route path="/dashboard/:id"  element={<Dashboard />} /> */}
        <Route path="/coin/:id"  element={<CoinVews/>} />
      </Routes>
      
      
      
    </>


  )
}

export default App
