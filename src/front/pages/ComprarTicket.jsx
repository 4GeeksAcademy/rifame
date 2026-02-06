import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const ComprarTicket = () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const CLOUDINARY_CLOUD_NAME = "dkkkjhhgl";
    const CLOUDINARY_UPLOAD_PRESET = "comprobantes-pagos";

    const { rifaId } = useParams();
    const navigate = useNavigate();

    const [rifa, setRifa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [ticketsSeleccionados, setTicketsSeleccionados] = useState([]);
    const [limitePersonalizado, setLimitePersonalizado] = useState(1);
    const [pais, setPais] = useState({});
    const [busqueda, setBusqueda] = useState('');
    const [ticketEncontrado, setTicketEncontrado] = useState(null);
    const [ultimaActualizacion, setUltimaActualizacion] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // ✅ AGREGAR ESTA LÍNEA

    const pollingIntervalRef = useRef(null);

    const [formData, setFormData] = useState({
        nombreCompleto: '',
        telefono: '',
        email: '',
        comprobante: null
    });

    const LimiteMaximo = 10;
    const POLLING_INTERVAL = 5000;

    const fetchTickets = async () => {
        try {
            const ticketsResponse = await fetch(`${API_URL}/api/ticket/${rifaId}`);
            if (ticketsResponse.ok) {
                const ticketsBd = await ticketsResponse.json();

                const ticketsFormateados = ticketsBd.map(t => ({
                    id: t.id,
                    numero: String(t.numero_ticket).padStart(3, '0'),
                    disponible: t.estado === 'disponible',
                    estado: t.estado || 'disponible',
                    precio: rifa?.precio_ticket || 0
                }));

                setTickets(ticketsFormateados);
                setUltimaActualizacion(new Date());

                setTicketsSeleccionados(prev =>
                    prev.filter(numTicket => {
                        const ticket = ticketsFormateados.find(t => t.numero === numTicket);
                        return ticket && ticket.disponible;
                    })
                );
            }
        } catch (err) {
            console.error("Error actualizando tickets:", err);
        }
    };

    useEffect(() => {
        const fetchRifaPublica = async () => {
            if (!rifaId || !API_URL) {
                setError("Configuración incompleta");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/api/rifa/publica/${rifaId}`);

                if (response.ok) {
                    const rifaData = await response.json();
                    setRifa(rifaData);

                    const ticketsResponse = await fetch(`${API_URL}/api/ticket/${rifaId}`);
                    if (ticketsResponse.ok) {
                        const ticketsBd = await ticketsResponse.json();

                        const ticketsFormateados = ticketsBd.map(t => ({
                            id: t.id,
                            numero: String(t.numero_ticket).padStart(3, '0'),
                            disponible: t.estado === 'disponible',
                            estado: t.estado || 'disponible',
                            precio: rifaData.precio_ticket
                        }));
                        setTickets(ticketsFormateados);
                        setUltimaActualizacion(new Date());
                    }
                    setError(null);
                } else if (response.status === 404) {
                    setError("Rifa no encontrada");
                } else {
                    setError("Error al cargar la rifa");
                }
            } catch (err) {
                setError("Error de conexión con el servidor");
            } finally {
                setLoading(false);
            }
        };

        fetchRifaPublica();
    }, [rifaId, API_URL]);

    useEffect(() => {
        if (!rifa || !rifaId) return;

        pollingIntervalRef.current = setInterval(() => {
            fetchTickets();
        }, POLLING_INTERVAL);

        return () => clearInterval(pollingIntervalRef.current);
    }, [rifa, rifaId]);

    const actualizarAhora = () => {
        fetchTickets();
    };

    const elegirASuerte = (total, limite) => {
        const seleccionados = new Set();
        const ticketsDisponibles = tickets.filter(t => t.disponible).map(t => t.numero);

        if (ticketsDisponibles.length < limite) {
            alert(`Solo hay ${ticketsDisponibles.length} tickets disponibles`);
            return [];
        }

        while (seleccionados.size < limite) {
            const aleatorio = ticketsDisponibles[Math.floor(Math.random() * ticketsDisponibles.length)];
            seleccionados.add(aleatorio);
        }
        return Array.from(seleccionados);
    };

    const seleccionarTicket = (numero) => {
        setTicketsSeleccionados(prev => {
            if (prev.includes(numero)) {
                return prev.filter(n => n !== numero);
            } else {
                if (prev.length < limitePersonalizado) {
                    return [...prev, numero];
                }
                return prev;
            }
        });
    };

    const buscarTicket = () => {
        if (!busqueda.trim()) {
            setTicketEncontrado(null);
            return;
        }

        const busquedaNormalizada = busqueda.trim().padStart(3, '0');
        const ticket = tickets.find(t => t.numero === busquedaNormalizada);

        if (ticket) {
            setTicketEncontrado(ticket);

            setTimeout(() => {
                const elemento = document.getElementById(`ticket-${ticket.numero}`);
                if (elemento) {
                    elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    elemento.style.animation = 'parpadeo 1s ease-in-out 3';
                }
            }, 100);
        } else {
            setTicketEncontrado(null);
            alert(`Ticket ${busquedaNormalizada} no encontrado`);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            setFormData(prev => ({ ...prev, comprobante: file }));

            return () => URL.revokeObjectURL(objectUrl);
        }
    };

    const uploadComprobanteToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error('Error al subir el comprobante');
            }

            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (ticketsSeleccionados.length === 0) {
            alert("Por favor selecciona al menos un ticket");
            return;
        }

        if (!formData.comprobante) {
            alert("Por favor sube el comprobante de pago");
            return;
        }

        const ticketsNoDisponibles = ticketsSeleccionados.filter(numTicket => {
            const ticket = tickets.find(t => t.numero === numTicket);
            return !ticket || !ticket.disponible;
        });

        if (ticketsNoDisponibles.length > 0) {
            alert(`Los siguientes tickets ya no están disponibles: ${ticketsNoDisponibles.join(', ')}`);
            await fetchTickets();
            return;
        }

        try {
            const comprobanteUrl = await uploadComprobanteToCloudinary(formData.comprobante);
            if (!comprobanteUrl) {
                alert("Error al subir el comprobante");
                return;
            }

            const payload = {
                rifa_id: rifaId,
                tickets: ticketsSeleccionados,
                nombre: formData.nombreCompleto,
                telefono: `${pais.prefijo || ''} ${formData.telefono}`,
                email: formData.email,
                pais: pais.nombre || "",
                comprobante_url: comprobanteUrl,
                total: ticketsSeleccionados.length * (rifa?.precio_ticket || 0)
            };

            const response = await fetch(`${API_URL}/api/compra-ticket`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("¡Compra enviada! Recibirás confirmación por email");
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Error al procesar la compra");
                await fetchTickets();
            }
        } catch (error) {
            alert("Error de conexión");
        }
    };

    const paises = [
        { nombre: "República Dominicana", codigo: "RD", prefijo: "🇩🇴+1" },
        { nombre: "Estados Unidos", codigo: "US", prefijo: "🇺🇸+1" },
        { nombre: "Puerto Rico", codigo: "PR", prefijo: "🇵🇷+1" },
        { nombre: "Chile", codigo: "CL", prefijo: "🇨🇱+56" },
        { nombre: "Ecuador", codigo: "EC", prefijo: "🇪🇨+593" },
        { nombre: "Uruguay", codigo: "UY", prefijo: "🇺🇾+598" },
        { nombre: "Venezuela", codigo: "VE", prefijo: "🇻🇪+58" },
        { nombre: "Argentina", codigo: "AR", prefijo: "🇦🇷+54" },
        { nombre: "Colombia", codigo: "CO", prefijo: "🇨🇴+57" },
        { nombre: "España", codigo: "ES", prefijo: "🇪🇸+34" },
        { nombre: "México", codigo: "MX", prefijo: "🇲🇽+52" },
        { nombre: "Perú", codigo: "PE", prefijo: "🇵🇪+51" }
    ];

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-danger" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3 text-muted">Cargando detalles de la rifa...</p>
            </div>
        );
    }

    if (error || !rifa) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-danger" role="alert">
                    <i className="fa-solid fa-exclamation-triangle me-2"></i>
                    {error || "Rifa no encontrada"}
                </div>
                <button className="btn btn-danger" onClick={() => navigate('/')}>
                    <i className="fa-solid fa-arrow-left me-2"></i>
                    Volver al inicio
                </button>
            </div>
        );
    }

    let fechaSorteo = new Date();
    try {
        if (rifa.fecha_sorteo) {
            fechaSorteo = new Date(rifa.fecha_sorteo);
            if (isNaN(fechaSorteo.getTime())) {
                fechaSorteo = new Date();
            }
        }
    } catch (e) {
        fechaSorteo = new Date();
    }

    const precioTicket = parseFloat(rifa.precio_ticket) || 0;
    const totalCompra = ticketsSeleccionados.length * precioTicket;

    return (
        <div>
            {/* Banner y detalles de la rifa */}
            <div className="container mt-5 px-3 px-md-4 mb-4">
                <div className="row g-4">
                    <div className="col-12 col-lg-6 text-center">
                        <img
                            src={rifa.imagen || "https://res.cloudinary.com/dkkkjhhgl/image/upload/v1770352480/rifas/m7j5drkngidad7fjgrfq.jpg"}
                            alt={rifa.titulo}
                            className="img-fluid rounded-5"
                            style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '100%' }}
                            onError={(e) => {
                                e.target.src = "https://res.cloudinary.com/dkkkjhhgl/image/upload/v1770352480/rifas/m7j5drkngidad7fjgrfq.jpg";
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="d-flex flex-column justify-content-center h-100">
                            <h3 className="text-start text-danger fw-bold mt-2 mb-3 fs-5 fs-md-4">
                                <i className="fa-regular fa-calendar-days"></i> {fechaSorteo.toLocaleDateString('es-ES')} |
                                <i className="fa-solid fa-clock ms-2"></i> {fechaSorteo.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                            </h3>
                            <h1 className="text-start text-danger fw-bold" style={{ fontSize: "clamp(32px, 5vw, 48px)" }}>
                                {rifa.titulo}
                            </h1>
                            {rifa.descripcion && (
                                <p className="text-start text-muted mt-2">{rifa.descripcion}</p>
                            )}
                            <h3 className="text-start text-danger fw-bold mt-2 mb-0 fs-5 fs-md-4">
                                Precio por Ticket: ${precioTicket} | Total de Tickets: {rifa.cantidad_tickets}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5 px-3 px-md-4 mb-5" style={{ maxWidth: '900px' }}>
                <div style={{ borderRadius: '18px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                    <h1 className="text-center text-danger fw-bold" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>Lista de Tickets</h1>

                    <div className="text-center mb-4">
                        <div className='d-flex justify-content-center align-items-center gap-2'>
                            <button
                                className="btn btn-danger rounded-circle"
                                onClick={() => {
                                    if (limitePersonalizado > 1) {
                                        setLimitePersonalizado(limitePersonalizado - 1);
                                        if (ticketsSeleccionados.length > limitePersonalizado - 1) {
                                            setTicketsSeleccionados(ticketsSeleccionados.slice(0, limitePersonalizado - 1));
                                        }
                                    }
                                }}
                                disabled={limitePersonalizado <= 1}
                            >
                                <i className="fa-solid fa-minus"></i>
                            </button>

                            <div className='d-flex flex-column align-items-center'>
                                <h1 className="rounded-5 text-center m-2 mb-0 fs-1">{limitePersonalizado}</h1>
                                <span className="text-danger" style={{ fontSize: "0.75rem" }}>Tickets</span>
                            </div>

                            <button
                                className="btn btn-danger rounded-circle"
                                onClick={() => {
                                    if (limitePersonalizado < LimiteMaximo) {
                                        setLimitePersonalizado(limitePersonalizado + 1);
                                    }
                                }}
                                disabled={limitePersonalizado >= LimiteMaximo}
                            >
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>

                        <h5 className="text-center text-danger fw-bold mt-2 mb-0 fs-4 fs-md-3">
                            Total: ${totalCompra}
                        </h5>

                        <div className="d-flex justify-content-center gap-2 mt-2">
                            <input
                                className="form-control input-sin-estilos rounded-5 text-center"
                                style={{ maxWidth: "150px" }}
                                type="text"
                                placeholder="Buscar"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && buscarTicket()}
                            />
                            <button
                                className="btn btn-danger rounded-circle"
                                onClick={buscarTicket}
                                title="Buscar ticket"
                            >
                                <i className="fa-solid fa-search"></i>
                            </button>
                            {busqueda && (
                                <button
                                    className="btn btn-outline-danger rounded-circle"
                                    onClick={() => {
                                        setBusqueda('');
                                        setTicketEncontrado(null);
                                    }}
                                    title="Limpiar búsqueda"
                                >
                                    <i className="fa-solid fa-times"></i>
                                </button>
                            )}
                        </div>

                        {ticketEncontrado && (
                            <div className="alert alert-info mt-2 py-2" style={{ maxWidth: '300px', margin: '10px auto' }}>
                                <small>
                                    <strong>Ticket {ticketEncontrado.numero}</strong>
                                    {ticketEncontrado.disponible ? (
                                        <span className="text-success"> - Disponible ✓</span>
                                    ) : ticketEncontrado.estado === 'pendiente' ? (
                                        <span className="text-warning"> - Pendiente ⏳</span>
                                    ) : (
                                        <span className="text-danger"> - Vendido ✗</span>
                                    )}
                                </small>
                            </div>
                        )}

                        <button className="btn btn-outline-danger btn-lg mt-2 px-3 px-md-4 rounded-5" onClick={() => {
                            const seleccionados = elegirASuerte(tickets.length, limitePersonalizado);
                            setTicketsSeleccionados(seleccionados);
                        }}>
                            <i className="fa-solid fa-fire"></i> Elegir a la suerte <i className="fa-solid fa-fire"></i>
                        </button>

                        <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
                            <div className="d-flex align-items-center gap-1">
                                <div style={{ width: '20px', height: '20px', backgroundColor: '#6c757d', borderRadius: '4px' }}></div>
                                <small className="text-muted">Disponible</small>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                                <div style={{ width: '20px', height: '20px', backgroundColor: '#ffc107', borderRadius: '4px' }}></div>
                                <small className="text-muted">Pendiente</small>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                                <div style={{ width: '20px', height: '20px', backgroundColor: '#dc3545', borderRadius: '4px' }}></div>
                                <small className="text-muted">Vendido</small>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                                <div style={{ width: '20px', height: '20px', backgroundColor: '#d90429', borderRadius: '4px' }}></div>
                                <small className="text-muted">Seleccionado</small>
                            </div>
                        </div>
                    </div>

                    <div className="px-2 px-md-5" style={{ height: '400px', overflowY: 'scroll' }}>
                        <div className='d-flex flex-wrap justify-content-center gap-1'>
                            {tickets.map((ticket) => {
                                let backgroundColor = '#6c757d';
                                let cursor = 'pointer';
                                let opacity = 1;

                                if (ticketsSeleccionados.includes(ticket.numero)) {
                                    backgroundColor = '#d90429';
                                } else if (ticket.estado === 'pendiente') {
                                    backgroundColor = '#ffc107';
                                    cursor = 'not-allowed';
                                    opacity = 0.8;
                                } else if (ticket.estado === 'verificado') {
                                    backgroundColor = '#dc3545';
                                    cursor = 'not-allowed';
                                    opacity = 0.6;
                                } else if (ticket.estado === 'rechazado') {
                                    backgroundColor = '#6c757d';
                                } else if (!ticket.disponible) {
                                    backgroundColor = '#333';
                                    cursor = 'not-allowed';
                                    opacity = 0.5;
                                }

                                return (
                                    <button
                                        key={ticket.numero}
                                        id={`ticket-${ticket.numero}`}
                                        className="btn"
                                        disabled={!ticket.disponible}
                                        onClick={() => seleccionarTicket(ticket.numero)}
                                        style={{
                                            width: '4rem',
                                            height: '2rem',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            borderRadius: '18px',
                                            color: 'white',
                                            boxShadow: ticketsSeleccionados.includes(ticket.numero) ? '0 4px 8px rgba(217,4,41,0.2)' : 'none',
                                            backgroundColor,
                                            cursor,
                                            opacity,
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {ticket.numero}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="text-center my-4 d-flex flex-column align-items-center">
                        <h3 className="text-center">Seleccionados</h3>
                        <div className="text-center text-danger fw-bold">
                            {ticketsSeleccionados.length} de {limitePersonalizado}
                        </div>
                        {ticketsSeleccionados.length > 0 && (
                            <div className="d-flex flex-wrap gap-2 mt-2 justify-content-center">
                                {ticketsSeleccionados.map(num => (
                                    <button
                                        key={num}
                                        className="btn btn-danger rounded-5"
                                        style={{ width: '4rem', height: '2rem', fontSize: '12px', fontWeight: 'bold' }}
                                        onClick={() => seleccionarTicket(num)}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="px-2 px-md-5 my-4">
                            <div className="mt-4">
                                <h1 className="text-start mb-3 text-danger fw-bold" style={{ fontSize: "clamp(20px, 4vw, 28px)" }}>
                                    <i className="fa-solid fa-id-card me-2"></i>DATOS PERSONALES
                                </h1>
                                <div className="row g-3">
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="nombreCompleto" className="form-label">Nombre y Apellido</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nombreCompleto"
                                            placeholder="Ingrese su nombre y apellido"
                                            value={formData.nombreCompleto}
                                            onChange={(e) => setFormData({ ...formData, nombreCompleto: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="paisTelefono" className="form-label">País y Teléfono</label>
                                        <div className="d-flex gap-2">
                                            <select
                                                className="form-select"
                                                id="paisTelefono"
                                                style={{ maxWidth: '150px' }}
                                                onChange={(e) => {
                                                    const seleccionado = paises.find(p => p.codigo === e.target.value);
                                                    setPais(seleccionado || {});
                                                }}
                                                required
                                            >
                                                <option value="">País</option>
                                                {paises.map((p) => (
                                                    <option key={p.codigo} value={p.codigo}>{p.prefijo}</option>
                                                ))}
                                            </select>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="telefono"
                                                placeholder="Número de teléfono"
                                                value={formData.telefono}
                                                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="emailCompra" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="emailCompra"
                                            placeholder="Ingrese su email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h1 className="text-start mb-3 text-danger fw-bold" style={{ fontSize: "clamp(20px, 4vw, 28px)" }}>
                                    <i className="fa-solid fa-credit-card me-2"></i>MÉTODOS DE PAGO
                                </h1>
                                <h6 className="text-start text-muted mb-3">Selecciona un método de pago para ver los detalles</h6>

                                {rifa.metodo_pagos ? (
                                    <div className="d-flex justify-content-center gap-4 flex-wrap mb-4">
                                        {rifa.metodo_pagos.split(',').map((metodo, index) => {
                                            const metodoPago = metodo.trim();

                                            // ✅ Zelle
                                            if (metodoPago === 'ZELLE' && rifa.titular_zelle && rifa.contacto_zelle) {
                                                return (
                                                    <button
                                                        key={index}
                                                        className="btn p-0 border-0"
                                                        onClick={() => setSelectedPaymentMethod({
                                                            tipo: 'ZELLE',
                                                            titular: rifa.titular_zelle,
                                                            contacto: rifa.contacto_zelle,
                                                            imagen: "https://res.cloudinary.com/dkkkjhhgl/image/upload/v1770359127/zelle-logo_ewoyis.png"
                                                        })}
                                                        style={{
                                                            cursor: 'pointer',
                                                            transition: 'transform 0.3s ease, filter 0.3s ease'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.transform = 'scale(1.1)';
                                                            e.currentTarget.style.filter = 'drop-shadow(0 4px 15px rgba(217,4,41,0.3))';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.transform = 'scale(1)';
                                                            e.currentTarget.style.filter = 'drop-shadow(0 2px 10px rgba(217,4,41,0.1))';
                                                        }}
                                                    >
                                                        <img
                                                            src="https://res.cloudinary.com/dkkkjhhgl/image/upload/v1770359127/zelle-logo_ewoyis.png"
                                                            alt="Zelle"
                                                            style={{
                                                                height: '120px',
                                                                filter: 'drop-shadow(0 2px 10px rgba(217,4,41,0.1))',
                                                                borderRadius: '10px'
                                                            }}
                                                        />
                                                    </button>
                                                );
                                            }

                                            // ✅ Transferencia Bancaria
                                            if (metodoPago === 'Transferencia-Bancaria' && rifa.titular_transferencia &&
                                                rifa.numero_ruta && rifa.numero_cuenta) {
                                                return (
                                                    <button
                                                        key={index}
                                                        className="btn p-0 border-0"
                                                        onClick={() => setSelectedPaymentMethod({
                                                            tipo: 'Transferencia Bancaria',
                                                            titular: rifa.titular_transferencia,
                                                            ruta: rifa.numero_ruta,
                                                            cuenta: rifa.numero_cuenta,
                                                            imagen: "https://res.cloudinary.com/dkkkjhhgl/image/upload/v1770358971/Transferencia-logo_h2p0li.png"
                                                        })}
                                                        style={{
                                                            cursor: 'pointer',
                                                            transition: 'transform 0.3s ease, filter 0.3s ease'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.transform = 'scale(1.1)';
                                                            e.currentTarget.style.filter = 'drop-shadow(0 4px 15px rgba(40,167,69,0.3))';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.transform = 'scale(1)';
                                                            e.currentTarget.style.filter = 'drop-shadow(0 2px 10px rgba(40,167,69,0.1))';
                                                        }}
                                                    >
                                                        <img
                                                            src="https://res.cloudinary.com/dkkkjhhgl/image/upload/v1770358971/Transferencia-logo_h2p0li.png"
                                                            alt="Transferencia Bancaria"
                                                            style={{
                                                                height: '120px',
                                                                filter: 'drop-shadow(0 2px 10px rgba(40,167,69,0.1))',
                                                                borderRadius: '10px'
                                                            }}
                                                        />
                                                    </button>
                                                );
                                            }

                                            return null;
                                        })}
                                    </div>
                                ) : (
                                    <div className="alert alert-warning" role="alert">
                                        <i className="fa-solid fa-exclamation-triangle me-2"></i>
                                        No hay métodos de pago configurados para esta rifa
                                    </div>
                                )}
                            </div>

                            {/* ✅ Modal Mejorado */}
                            {selectedPaymentMethod && (
                                <div
                                    className="modal fade show d-block"
                                    tabIndex="-1"
                                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                                    onClick={() => setSelectedPaymentMethod(null)}
                                >
                                    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                                        <div className="modal-content border-0 rounded-4" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
                                            {/* Header */}
                                            <div className="modal-header border-bottom-0 bg-gradient p-4">
                                                <div className="d-flex align-items-center gap-2">
                                                    <img
                                                        src={selectedPaymentMethod.imagen}
                                                        alt={selectedPaymentMethod.tipo}
                                                        style={{ maxHeight: '50px', filter: 'drop-shadow(0 2px 8px rgba(217,4,41,0.2))' }}
                                                    />
                                                    <h5 className="modal-title text-danger fw-bold mb-0">
                                                        {selectedPaymentMethod.tipo}
                                                    </h5>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    onClick={() => setSelectedPaymentMethod(null)}
                                                    style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.1))' }}
                                                ></button>
                                            </div>

                                            {/* Body */}
                                            <div className="modal-body p-4">
                                                {selectedPaymentMethod.tipo === 'ZELLE' ? (
                                                    <div className="row g-3">
                                                        {/* Titular */}
                                                        <div className="col-12">
                                                            <div
                                                                className="card border-light bg-light cursor-pointer"
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(selectedPaymentMethod.titular);
                                                                }}
                                                                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                                                            >
                                                                <div className="card-body p-3">
                                                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                                                        <div className="d-flex align-items-center gap-2">
                                                                            <i className="fa-solid fa-user text-danger fs-5"></i>
                                                                            <label className="form-label fw-bold text-danger mb-0">
                                                                                Titular de Cuenta
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-dark mb-0 fs-5 fw-500">
                                                                        {selectedPaymentMethod.titular}
                                                                    </p>
                                                                    <small className="text-muted mt-1 d-block">
                                                                        <i className="fa-solid fa-click"></i> Toca para copiar
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Contacto */}
                                                        <div className="col-12">
                                                            <div
                                                                className="card border-light bg-light cursor-pointer"
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(selectedPaymentMethod.contacto);
                                                                }}
                                                                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                                                            >
                                                                <div className="card-body p-3">
                                                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                                                        <div className="d-flex align-items-center gap-2">
                                                                            <i className="fa-solid fa-envelope text-danger fs-5"></i>
                                                                            <label className="form-label fw-bold text-danger mb-0">
                                                                                Email o Teléfono
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-dark mb-0 fs-5 fw-500">
                                                                        {selectedPaymentMethod.contacto}
                                                                    </p>
                                                                    <small className="text-muted mt-1 d-block">
                                                                        <i className="fa-solid fa-click"></i> Toca para copiar
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Info Helper */}
                                                        <div className="col-12">
                                                            <div className="alert alert-info border-0 bg-light-info text-info" role="alert">
                                                                <i className="fa-solid fa-circle-info me-2"></i>
                                                                <small>Copia esta información y realiza la transferencia por Zelle</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="row g-3">
                                                        {/* Titular */}
                                                        <div className="col-12">
                                                            <div
                                                                className="card border-light bg-light cursor-pointer"
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(selectedPaymentMethod.titular);
                                                                }}
                                                                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                                                            >
                                                                <div className="card-body p-3">
                                                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                                                        <div className="d-flex align-items-center gap-2">
                                                                            <i className="fa-solid fa-user text-danger fs-5"></i>
                                                                            <label className="form-label fw-bold text-danger mb-0">
                                                                                Titular de Cuenta
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-dark mb-0 fs-5 fw-500">
                                                                        {selectedPaymentMethod.titular}
                                                                    </p>
                                                                    <small className="text-muted mt-1 d-block">
                                                                        <i className="fa-solid fa-click"></i> Toca para copiar
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Número de Ruta */}
                                                        <div className="col-12">
                                                            <div
                                                                className="card border-light bg-light cursor-pointer"
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(selectedPaymentMethod.ruta);
                                                                }}
                                                                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                                                            >
                                                                <div className="card-body p-3">
                                                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                                                        <div className="d-flex align-items-center gap-2">
                                                                            <i className="fa-solid fa-code text-danger fs-5"></i>
                                                                            <label className="form-label fw-bold text-danger mb-0">
                                                                                Número de Ruta
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-dark mb-0 fs-5 fw-500">
                                                                        {selectedPaymentMethod.ruta}
                                                                    </p>
                                                                    <small className="text-muted mt-1 d-block">
                                                                        <i className="fa-solid fa-click"></i> Toca para copiar
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Número de Cuenta */}
                                                        <div className="col-12">
                                                            <div
                                                                className="card border-light bg-light cursor-pointer"
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(selectedPaymentMethod.cuenta);
                                                                }}
                                                                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                                                            >
                                                                <div className="card-body p-3">
                                                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                                                        <div className="d-flex align-items-center gap-2">
                                                                            <i className="fa-solid fa-calculator text-danger fs-5"></i>
                                                                            <label className="form-label fw-bold text-danger mb-0">
                                                                                Número de Cuenta
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-dark mb-0 fs-5 fw-500">
                                                                        {selectedPaymentMethod.cuenta}
                                                                    </p>
                                                                    <small className="text-muted mt-1 d-block">
                                                                        <i className="fa-solid fa-click"></i> Toca para copiar
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Info Helper */}
                                                        <div className="col-12">
                                                            <div className="alert alert-info border-0 bg-light-info text-info" role="alert">
                                                                <i className="fa-solid fa-circle-info me-2"></i>
                                                                <small>Copia esta información y realiza la transferencia bancaria</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Footer */}
                                            <div className="modal-footer border-top-0 p-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger rounded-3 px-4"
                                                    onClick={() => setSelectedPaymentMethod(null)}
                                                >
                                                    <i className="fa-solid fa-check me-2"></i>
                                                    Entendido
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="text-center my-4">
                                <h1 className="text-start mb-3 text-danger fw-bold" style={{ fontSize: "clamp(20px, 4vw, 28px)" }}>
                                    <i className="fa-solid fa-file-lines me-2"></i>COMPROBANTE DE PAGO
                                </h1>
                                <h6 className="text-start text-muted mb-3">Foto o captura de pantalla</h6>
                                <div className="row g-3">
                                    <div className="col-12 col-md-4 text-center">
                                        {preview && (
                                            <div className="position-relative d-inline-block hover-container">
                                                <img
                                                    src={preview}
                                                    alt="Vista previa del comprobante"
                                                    className="img-fluid rounded-5"
                                                    style={{ maxWidth: '150px', filter: 'drop-shadow(0 2px 20px rgba(217,4,41,0.2))' }}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-danger position-absolute top-50 start-50 translate-middle rounded-circle hover-button"
                                                    style={{ width: '40px', height: '40px', padding: '0', opacity: '0', transition: 'opacity 0.3s' }}
                                                    onClick={() => {
                                                        setPreview(null);
                                                        setFormData({ ...formData, comprobante: null });
                                                        const fileInput = document.getElementById('comprobante');
                                                        if (fileInput) fileInput.value = '';
                                                    }}
                                                >
                                                    <i className="fa-solid fa-times"></i>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-12 col-md-8 d-flex flex-column justify-content-center">
                                        <input
                                            id="comprobante"
                                            type="file"
                                            className="form-control rounded-3"
                                            accept="image/*,application/pdf"
                                            onChange={handleFileChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <p className="mb-1 text-danger fs-4 fs-md-3">
                                        <strong>Total: ${totalCompra}</strong> ({ticketsSeleccionados.length} Tickets)
                                    </p>
                                </div>
                            </div>

                            <div className="text-center my-4">
                                <h6 className="text-center text-muted mb-3">Al confirmar autorizo el uso de Mis Datos Personales</h6>
                                <button
                                    type="submit"
                                    className="btn btn-danger btn-lg px-4 px-md-5 w-100 w-md-auto"
                                    disabled={ticketsSeleccionados.length === 0}
                                >
                                    <i className="fa-solid fa-check me-2"></i>
                                    Confirmar Compra
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ComprarTicket;