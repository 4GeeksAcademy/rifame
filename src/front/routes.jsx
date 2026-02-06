// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import CrearRifa from "./pages/CrearRifa";
import RegistrodeUsuario from "./pages/RegistrodeUsuario.jsx";
import SistemaPagina from "./pages/SistemaPagina.jsx";
import Dashboard from "./components/Dashboard.jsx";
import MisRifas from "./components/MisRifas.jsx";
// import Pagos from "./components/Pagos.jsx";


import Beneficios from "./pages/Beneficios.jsx";

import Configuracion from "./pages/Configuracion.jsx";

import DetalleRifa from "./pages/DetalleRifa.jsx";

import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ComprarTicket from "./pages/ComprarTicket.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import GestionCompradores from "./pages/GestionCompradores.jsx";
export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
      <Route path="/crear-rifa" element={<CrearRifa />} />
      <Route path="/registro-usuario" element={<RegistrodeUsuario />} />
      <Route path="/sistema-pagina" element={<SistemaPagina />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/comprar-ticket/:rifaId" element={<ComprarTicket />} />
      <Route path="/configuracion" element={<Configuracion />} />
      <Route path="/beneficios" element={<Beneficios />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/mis-rifas" element={<MisRifas />} />
      {/* <Route path="/pagos" element={<Pagos />} /> */}
      <Route path="/admin-panel" element={<AdminPanel />} />
      <Route path="/detalle-rifa" element={<DetalleRifa />} />
      <Route path="/rifa/:rifaId/compradores" element={<GestionCompradores />} />
    </Route>
  )
)
