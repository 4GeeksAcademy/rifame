import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const VerDetalle = () => {
  const { id } = useParams();
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    obtenerRifa();
  }, []);

  const obtenerRifa = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}api/rifa/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        dispatch({
          type: "set_rifas",
          payload: [data], // 👈 guardamos solo esa rifa
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const rifa = store.rifas.find(
    (r) => r.id === parseInt(id)
  );

  if (!rifa) {
    return <h2 className="text-center mt-5">Cargando...</h2>;
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

        <p><strong>Precio Ticket:</strong> ${rifa.precio_ticket}</p>
        <p><strong>Total Tickets:</strong> ${rifa.total_tickets}</p>
        <p><strong>Fecha Sorteo:</strong> ${rifa.fecha_sorteo}</p>
      </div>
    </div>
  );
};

export default VerDetalle;