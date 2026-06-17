import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Helmet } from "./pages/Helmet";
import { Pants } from "./pages/Pants";
import { Shoes } from "./pages/Shoes";
import { Gloves } from "./pages/Gloves";
import { Compare } from "./pages/Compare";

export default function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/helmet" element={<Helmet />} />
            <Route path="/pants" element={<Pants />} />
            <Route path="/shoes" element={<Shoes />} />
            <Route path="/gloves" element={<Gloves />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}
