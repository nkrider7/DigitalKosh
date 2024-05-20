import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Navbar from "./Components/Navbar"
import Blogs from "./Pages/Blogs/Blogs"
import CoinVews from "./Components/CoinVews"
import Footer from "./Components/Footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CoinsPage } from "./Pages/AllCoins/CoinsPage"


function App() {

  return (
    <div className="mx-auto max-w-screen-xl">
      <Navbar/>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/blogs" exact element={<Blogs />} />
        {/* <Route path="/dashboard/:id"  element={<Dashboard />} /> */}
        <Route path="/coin/:id"  element={<CoinVews/>} />
        <Route path="/coins"  element={<CoinsPage />} />
        <Route path="/coins/:text"  element={<CoinsPage />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </div>


  )
}

export default App
