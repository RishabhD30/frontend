import "./App.css"; 
// Make sure App.css exists in the correct directory
import "./Venderhomepage.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import HomePage1 from "./homepage";
import Venderhomepage from "./venderHomepage";
import Requirement from "./Requirement/addreq";
import ITPurchase from "./ITpurchase/Itpur";
import UserTable from "./Users/users";
import VenderITPurchase from "./ITpurchase/VenderItpur";
import EmailSelection from "./ITpurchase/EmailSelection/EmailSelection";
import Records from "./LastOrders/lastorders";
import Cart from "./cart/cart";

function App() {
  return (<Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/homepage" element={<HomePage1 />} />
      <Route path="/Venderhomepage" element={<Venderhomepage />} />
      <Route path="/requirement" element={<Requirement />} />
      <Route path="/ITpurchase" element={<ITPurchase />} />
      <Route path="/ITpurchase1" element={<VenderITPurchase />} />
      <Route path="/user" element={<UserTable />} /> 
      <Route path="/FinalSubmit" element={<EmailSelection />} />
      <Route path="/Records" element={<Records />} />
      <Route path="/venderCart" element={<Cart />} />
    </Routes>
  </Router>
  );
}
export default App;