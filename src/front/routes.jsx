// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import CrearRifa from "./pages/CrearRifa";
import RegistrodeUsuario from "./pages/RegistrodeUsuario.jsx";
import SistemaPagina from "./pages/SistemaPagina.jsx";
import Dashboard from "./components/Dashboard.jsx";
import MisRifas from "./components/MisRifas.jsx";
import EditarUsuario from "./pages/EditarUsuario.jsx";
// import Pagos from "./components/Pagos.jsx";


import Beneficios from "./pages/Beneficios.jsx";
import Configuracion from "./pages/Configuracion.jsx";
import DetalleRifa from "./pages/DetalleRifa.jsx";
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ComprarTicket from "./pages/ComprarTicket.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import GestionCompradores from "./pages/GestionCompradores.jsx";
import Clientes from "./pages/Clientes.jsx";
import VerDetalle from "./pages/VerDetalle.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      <Route path="/" element={<Home />} />
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
      <Route path="/admin-panel" element={<AdminPanel />} />
      <Route path="/detalle-rifa" element={<DetalleRifa />} />
      <Route path="/editar-usuario/:id" element={<EditarUsuario />} /> 
      <Route path="/rifa/:rifaId/compradores" element={<GestionCompradores />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/rifa/:id" element={<VerDetalle />} />
    </Route>
  )
)
