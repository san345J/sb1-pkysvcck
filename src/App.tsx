import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { DigitalCreators } from "./pages/DigitalCreators";
import AuthPage from "./pages/Login";
import CreatorDashboard from "./pages/CreatorDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<AuthPage isRegister={true} />} />
          <Route path="/login" element={<AuthPage isRegister={false} />} />
          <Route path="/dashboard/creator" element={<CreatorDashboard />} />
          <Route path="/dashboard/client" element={<ClientDashboard />} />
          <Route path="/creators" element={<DigitalCreators />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
