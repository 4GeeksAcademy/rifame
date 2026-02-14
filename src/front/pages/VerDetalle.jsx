import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const VerDetalle = () => {
  const { id } = useParams();
  const { store, dispatch } = useGlobalReducer();

  
  const getRifas = async (dispatch, userId, token) => {
      try {
        const response = await fetch(`${API_URL}api/rifa/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
                return;
            }
    
        if (response.ok) {
          const data = await response.json();
    
          dispatch({
            type: "set_rifas",
            payload: data,
          });
    
          return { success: true, data };
        }
    
        if (response.status === 401) {
          dispatch({ type: "logout" });
          return { success: false, message: "Sesión expirada", expired: true };
        }
    
        return { success: false, message: "Error al obtener rifas" };
      } catch (error) {
        console.error("Error:", error);
        return { success: false, message: "Error de conexión" };
      }
    };
      


  // Buscar la rifa por id
  const rifa = store.rifas.find(
    (r) => r.id === parseInt(id)
  );

  if (!rifa) {
    return <h2 className="text-center mt-5">Rifa no encontrada</h2>;
  }

  return (
    <div className="container mt-5">
      <div className="card p-4">

        <img
          src={rifa.imagen}
          alt={rifa.tituloRifa}
          className="img-fluid mb-3"
        />

        <h2>{rifa.tituloRifa}</h2>
        <p>{rifa.descripcionRifa}</p>

        <p><strong>Precio Ticket:</strong> ${rifa.precioTicket}</p>
        <p><strong>Total Tickets:</strong> {rifa.totalTickets}</p>
        <p><strong>Fecha Sorteo:</strong> {rifa.fechaSorteo}</p>

      </div>
    </div>
  );
};

export default VerDetalle;