
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./modules/AuthPages/Login";
import Registration from "./modules/AuthPages/Registration";
import BillingContainer from "./modules/Billing/BillingContainer";
import PrivateRoute from "./modules/PrivateRoute";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/Billing"
            element={
              <PrivateRoute>
                <BillingContainer />
              </PrivateRoute>
            } />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
