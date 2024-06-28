import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Undefined from "./pages/Undefined";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tarif/:id" element={<Detail />} />
          <Route path="/ekle" element={<Create />} />
          <Route path="*" element={<Undefined />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
