import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/movie/:id" element={<Detail />} /> 
        {/* 이 id 값을 Detail 함수에서 받기 위해 useParams를 사용한 것. */}
      </Routes>
      <Routes>
        <Route path ="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App;
