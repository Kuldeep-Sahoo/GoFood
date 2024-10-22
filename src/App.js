import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup.js";
import { CartProvider } from "./screens/ContextReducer.js";
import {
  BrowserRouter as Router,
  Route,
  Routes, //befote Switch is used instead of Routes
} from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-colors.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Cart from "./screens/Cart.js";
import MyOrder from "./screens/MyOrder.js";
import Admin from "./screens/Admin.js";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            {/* Before exact path use of path in switch Route */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/myOrders" element={<MyOrder />} />
            <Route exact path={"/kdjbefjhvbhjbvhbvjdfhgkjdfhgkjdfbjkfbvkjdfbjvbfjvbej683465834838634868346873687admin"} element={<Admin />} />


          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
