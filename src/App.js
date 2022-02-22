import Layout from "./components/UI/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tokens from "./pages/Tokens";
import TokenDetails from "./pages/TokenDetails";
import Transfer from "./pages/Transfer";

function App() {
  return (
    <div className="bg-gray-500">
      <Layout>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tokens" element={<Tokens />} />
            <Route path="/tokens/:tokenDetails" element={<TokenDetails />}/>
            <Route path="/transfer" element={<Transfer />}/>
            <Route />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
