import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import UserInfo from "./pages/userInfo";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { Toaster, toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/user/Dashboard';
import PrivateRoutes from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ChoicePage from './pages/Auth/ChoicePage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoutes from './components/Routes/AdminRoutes';
import ShelterRoutes from './components/Routes/ShelterRoutes';
import ShelterDashboard from './pages/Shelter/ShelterDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users'; // Corrected import
import Adopt from './pages/user/Adopt';
import Profile from './pages/user/Profile';
import Profiles from './pages/Shelter/Profiles';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/adopt" element={<Adopt />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/users" element={<Users />} /> {/* Corrected rendering */}
        </Route>
        <Route path="/dashboard" element={<ShelterRoutes />}>
          <Route path="shelter" element={<ShelterDashboard />} />
          <Route path="shelter/profile" element={<Profiles />} />
        </Route>
        <Route path="/choice-page" element={<ChoicePage />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
