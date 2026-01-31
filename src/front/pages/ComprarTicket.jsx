import { number } from 'prop-types';
import React, { useState } from 'react';


    export const ComprarTicket = () => {

    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
        }
    };    

    const elegirASuerte = (total, limite) => {
        const seleccionados = new Set();
        while (seleccionados.size < limite) {
            const aleatorio = Math.floor(Math.random() * total);
            seleccionados.add(String(aleatorio).padStart(3, '0'));
        }
        return Array.from(seleccionados);
    }

    const metodosDePago = [
        {nombre: "Zelle", titular: "Juan Perez", numero: "1234567890", imgSrc: "src/front/assets/img/zelle-logo.png"},
        {nombre: "Transferencia Bancaria", titular: "Maria Lopez", numeroDeRuta: "0987654321", numeroDeCuenta: "1122334455", imgSrc: "src/front/assets/img/Transferencia-logo.png"}
    ];

    const LimiteMaximo = 10;
    
    const generarTickets = (total) => {
        const tickets = [];
        for (let i = 0; i < total; i++) {
            tickets.push({
                numero: String(i).padStart(3, '0'),
                disponible: true,
                precio: 5
            });
        }
        return tickets;
    };

    const [tickets, setTickets] = useState(() => generarTickets(1000));
    const [ticketsSeleccionados, setTicketsSeleccionados] = useState([]);
    const [limitePersonalizado, setLimitePersonalizado] = useState(1);
    const [pais, setPais] = useState({});
    
    
    const paises = [
        {nombre:"República Dominicana", codigo:"RD", prefijo:"🇩🇴+1"},
        {nombre:"Estados Unidos", codigo:"US", prefijo:"🇺🇸+1"},
        {nombre:"Puerto Rico", codigo:"PR", prefijo:"🇵🇷+1"},
        {nombre:"Chile", codigo:"CL", prefijo:"🇨🇱+56"},
        {nombre:"Ecuador", codigo:"EC", prefijo:"🇪🇨+593"},
        {nombre:"Uruguay", codigo:"UY", prefijo:"🇺🇾+598"},
        {nombre:"Chile", codigo:"CL", prefijo:"🇨🇱+56"},
        {nombre:"Venezuela", codigo:"VE", prefijo:"🇻🇪+58"},
        {nombre:"Argentina", codigo:"AR", prefijo:"🇦🇷+54"},
        {nombre:"Colombia", codigo:"CO", prefijo:"🇨🇴+57"},
        {nombre:"España", codigo:"ES", prefijo:"🇪🇸+34"},
        {nombre:"México", codigo:"MX", prefijo:"🇲🇽+52"},
        {nombre:"Perú", codigo:"PE", prefijo:"🇵🇪+51"}
    ];

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

    
    return (
        <div>
            <div className="container mt-5 col-7" style={{ borderRadius: '18px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>

                <h1 className="text-center text-danger fw-bold" style={{ fontSize: "48px" }} >Lista de Ticket</h1>
                
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
                            <span className="text-danger" style={{fontSize:"0.75rem"}}>Tickets</span>
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

                    <h5 className="text-center text-danger font-bold mt-2 mb-0 fs-3">
                        Total: ${ticketsSeleccionados.length * tickets[0].precio}
                    </h5>

                    <input className="form-control input-sin-estilos rounded-5 m-auto mt-2 text-center" style={{width:"6rem"}} type="text" placeholder="Buscar"></input>

                    <button className="btn btn-outline-danger btn-lg mt-2 px-3 rounded-5" onClick={() => {
                        const seleccionados = elegirASuerte(tickets.length, limitePersonalizado);
                        setTicketsSeleccionados(seleccionados);
                    }}>
                        <i className="fa-solid fa-fire"></i> Elegir a la suerte <i className="fa-solid fa-fire"></i>
                    </button>
                    
                </div>

                <div className="row mx-5" style={{ height: '500px', overflowY: 'scroll' }}>
                    <div className='col d-flex flex-wrap justify-content-center'>
                        {tickets.map((ticket) => (
                            <button
                                key={ticket.numero}
                                className="btn btn-secondary m-1"
                                onClick={() => seleccionarTicket(ticket.numero)}
                                style={{ width: '4rem', height: '2rem', fontSize: '12px', fontWeight: 'bold', borderRadius: '18px', backgroundColor: ticketsSeleccionados.includes(ticket.numero) ? '#d90429' : '#6c757d', color: 'white', boxShadow: ticketsSeleccionados.includes(ticket.numero) ? '0 4px 8px rgba(217,4,41,0.2)' : 'none' }}
                            >
                                {ticket.numero}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="text-center my-4 d-flex flex-column align-items-center">
                    <h3 className="text-center">Seleccionados</h3>
                    <div className="text-center text-danger font-bold">
                        {ticketsSeleccionados.length} de {limitePersonalizado} 
                    </div>
                    {ticketsSeleccionados.length > 0 && (
                        <div className="d-flex flex-wrap gap-2 mt-2">
                            {ticketsSeleccionados.map(num => (
                            <button
                                key={num}
                                className="btn btn-primary m-1"
                                onClick={() => seleccionarTicket(num)}
                                style={{ width: '4rem', height: '2rem', fontSize: '12px', fontWeight: 'bold', borderRadius: '18px' }}
                            >
                                {num}
                            </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mx-5 my-4">
                    <div className="mt-4">
                        <h1 className="text-start mx-2 mb-0 text-danger fw-bold"><i className="fa-solid fa-id-card me-2"></i>DATOS PERSONALES</h1>
                        <form className="mx-auto row flex-wrap">
                            <div className="mb-3 col-12 col-md-6">
                                <label htmlFor="nombreCompleto" className="form-label">Nombre y Apellido</label>
                                <input type="text" className="form-control" id="nombreCompleto" name="nombreCompleto" placeholder="Ingrese su nombre y apellido" required />
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                                <label htmlFor="paisTelefono" className="form-label">País y Teléfono</label>
                                <div className="d-flex">
                                    <select 
                                        className="form-select me-2" id="paisTelefono" 
                                        name="paisTelefono" 
                                        style={{ maxWidth: '150px' }} onChange={(e) => {
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
                                    <input type="tel" className="form-control" id="telefono" name="telefono" placeholder="Número de teléfono" required />
                                </div>
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                                <label htmlFor="emailCompra" className="form-label">Email</label>
                                <input type="email" className="form-control" id="emailCompra" name="emailCompra" placeholder="Ingrese su email" required />
                            </div>
                        </form>
                    </div>

                    <div className="mt-4">
                        <h1 className="text-start mx-2 mb-0 text-danger fw-bold"><i className="fa-solid fa-credit-card me-2"></i>METODOS DE PAGO</h1>
                        <h6 className="text-start text-muted ms-4 mb-3">Elige una opcion</h6>
                        <div className="row d-flex justify-content-center">
                            <div className="container col-6 text-center mt-3 mb-4">
                                <img src={metodosDePago[0].imgSrc} alt="Zelle Logo" className="img-fluid rounded-circle p-2" style={{backgroundColor:"#d0d0d0", maxHeight: '100px', boxShadow: '0 2px 20px rgba(217,4,41,0.2)'}} />
                                <div className="mt-2">
                                    <p className="mb-1"><strong>Nombre del titular:</strong> {metodosDePago[0].titular}</p>
                                    <p className="mb-1"><strong>Número de Zelle:</strong> {metodosDePago[0].numero}</p>
                                </div>
                            </div>
                            <div className="container col-6 text-center mt-3 mb-4">
                                <img src={metodosDePago[1].imgSrc} alt="Transferencia Bancaria Logo" className="img-fluid rounded-circle p-2" style={{backgroundColor:"#d0d0d0", maxHeight: '100px', boxShadow: '0 2px 20px rgba(217,4,41,0.2)'}} />
                                <div className="mt-2">
                                    <p className="mb-1"><strong>Nombre del titular:</strong> {metodosDePago[1].titular}</p>
                                    <p className="mb-1"><strong>Número de Ruta:</strong> {metodosDePago[1].numeroDeRuta}</p>
                                    <p className="mb-1"><strong>Número de Cuenta:</strong> {metodosDePago[1].numeroDeCuenta}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center my-4">
                        <h1 className="text-start mx-2 mb-0 text-danger fw-bold"><i className="fa-solid fa-file-lines me-2"></i>COMPROBANTE DE PAGO</h1>
                        <h6 className="text-start text-muted ms-4 mb-3">Foto o captura de pantalla</h6>
                        <div className="row">
                            <div className="mt-2 col-4 text-center">
                                {preview && (
                                    <div className="position-relative d-inline-block hover-container">
                                        <img 
                                            src={preview} 
                                            alt="Vista previa del comprobante" 
                                            className="img-fluid rounded-5" 
                                            style={{ maxWidth: '150px', boxShadow: '0 2px 20px rgba(217,4,41,0.2)' }} 
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-danger position-absolute top-50 start-50 translate-middle rounded-circle hover-button"
                                            style={{ 
                                                width: '40px', 
                                                height: '40px', 
                                                padding: '0',
                                                opacity: '0',
                                                transition: 'opacity 0.3s'
                                            }}
                                            onClick={() => {
                                                setPreview(null);
                                                const fileInput = document.getElementById('comprobante');
                                                if (fileInput) fileInput.value = '';
                                            }}
                                        >
                                            <i className="fa-solid fa-times"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="mt-2 col-8 d-flex flex-column justify-content-center align-items-start">
                                <input id="comprobante" type="file" className="form-control mx-auto col-5 rounded-3" accept="image/*,application/pdf" onChange={handleFileChange} />
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="mb-1 text-danger fs-3"><strong>Total: ${ticketsSeleccionados.length * tickets[0].precio}</strong> ({ticketsSeleccionados.length} Tickets)</p>
                        </div>
                    </div>

                    <div className="text-center my-4">
                        <h6 className="text-center text-muted ms-4 mb-3">Al confirmar autorizo el uso de <a href="/privacidad">Mis Datos Personales</a></h6>
                        <button className="btn btn-outline-danger btn-lg px-5">
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ComprarTicket;