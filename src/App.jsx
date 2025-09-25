import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from "./pages/Landing";
import Demo from "./pages/Demo";
import About from "./pages/About";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}