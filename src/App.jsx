import { BrowserRouter, Routes, Route } from "react-router-dom"

import Main from "./pages/Main"
import Detail from "./pages/Detail"
import Holder from "./pages/Holder"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/dasd" element={<Holder />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
