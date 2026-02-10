const fondo1 = "https://res.cloudinary.com/dkkkjhhgl/image/upload/v1770358857/red_wavy_with_halftone_background_j4ui6q.jpg";

const Configuracion = () => {

    return (
        <div>
            <section>
                <div 
                    className="d-flex justify-content-center align-items-center bg-opacity-50 gt3-page-title_wrapper mb-5" 
                    style={{minHeight:"200px", backgroundImage: `url(${fondo1})`, backgroundSize: "cover", backgroundPosition: "center", padding: "20px"}} 
                >
                    <h1 className="text-dark fw-bold text-center" style={{fontSize: "clamp(28px, 5vw, 48px)"}}>Configuraciones</h1> 
                </div>
            </section>

            <section className="container px-3 px-md-4 pb-5">    
                <div className="row g-4">
                    <div className="col-12 col-lg-8">
                        <h5 className="text-dark mb-4">Opciones Configurables en el sistema</h5>
                        <div>
                            <p className="fs-6 fs-md-5 text-danger pb-2 mb-0">TU MARCA</p>
                            <h2 className="mb-4 text-secondary" style={{fontSize: "clamp(20px, 4vw, 32px)"}}>Dominio Web Propio</h2>
                            <p className="text-secondary fs-6 fs-md-5">El sistema funciona tu dominio <span className="text-danger fw-bold">www.tumarca.com</span> o <span className="text-danger fw-bold">subdominio rifas.tumarca.com</span>
                                <ul className="ms-3 mt-3">
                                    <li>Cualquier proveedor de dominio</li>
                                    <li>Activación en 1 hora</li>
                                    <li>Registros nuevos y existentes</li>
                                </ul>                
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                        <h2 className="text-success text-opacity-25 text-center">Aquí va la imagen de la sección de configuraciones</h2>
                    </div>
                </div>                
            </section>

            <section className="container px-3 px-md-4 pb-5">
                <div className="row g-4">
                    <div className="col-12 col-lg-8">
                        <div>
                            <p className="fs-6 fs-md-5 text-danger pb-2 mb-0">ELEGIBLE</p>
                            <h2 className="mb-4 text-secondary" style={{fontSize: "clamp(20px, 4vw, 32px)"}}>Campos Adicionales</h2>
                            <p className="text-secondary fs-6 fs-md-5">
                                Agrega campos adicionales al formulario de registro para recopilar información específica de tus usuarios. 
                                <ul className="ms-3 mt-3">
                                    <li>Visible desde el Panel de Admin.</li>
                                    <li>Descargable en el Reporte</li>
                                    <li>Estadísticas de Uso</li>
                                </ul>                
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                        <h2 className="text-success text-opacity-25 text-center">Aquí va la imagen de la sección DE ELEGIBLE</h2>
                    </div>
                </div>  
            </section>

            <section className="container px-3 px-md-4 pb-5">
                <div className="row g-4">
                    <div className="col-12 col-lg-8">
                        <div>
                            <p className="fs-6 fs-md-5 text-danger pb-2 mb-0">AUTOMATICO</p>
                            <h2 className="mb-4 text-secondary" style={{fontSize: "clamp(20px, 4vw, 32px)"}}>Múltiples Medios de Pagos</h2>
                            <p className="text-secondary fs-6 fs-md-5">
                                Pagos por transferencia ó depósito con Voucher <span className="text-danger fw-bold">(comprobante)</span> y pago online con verificación automática.
                                <ul className="ms-3 mt-3">
                                    <li>Pago con Pasarela de Pagos de Mercado Pago.</li>
                                    <li>Pago con Tarjeta</li>
                                    <li>Pago con PayPal (según disponibilidad)</li>
                                </ul>                
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                        <h2 className="text-success text-opacity-25 text-center">Aquí va la imagen de la sección de AUTOMATICO</h2>
                    </div>
                </div>  
            </section>

            <section className="container px-3 px-md-4 pb-5">
                <div className="row g-4">
                    <div className="col-12 col-lg-8">
                        <div>
                            <p className="fs-6 fs-md-5 text-danger pb-2 mb-0">PORCENTAJE VENDIDO</p>
                            <h2 className="mb-4 text-secondary" style={{fontSize: "clamp(20px, 4vw, 32px)"}}>Barra de Progreso</h2>
                            <p className="text-secondary fs-6 fs-md-5">
                                Puedes configurar tu rifa condicionada a la venta del 80%, 90% o 100% de boletos. (Aplican restricciones)
                                <ul className="ms-3 mt-3">
                                    <li>Se ocultan fechas</li>
                                    <li>Se muestra arriba de la descripción</li>
                                </ul>                
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                        <h2 className="text-success text-opacity-25 text-center">Aquí va la imagen de la sección de PORCENTAJE VENDIDO</h2>
                    </div>
                </div>  
            </section>

            <section className="container px-3 px-md-4 pb-5">
                <div className="row g-4">
                    <div className="col-12 col-lg-8">
                        <div>
                            <p className="fs-6 fs-md-5 text-danger pb-2 mb-0">PERSONALIZACIONES</p>
                            <h2 className="mb-4 text-secondary" style={{fontSize: "clamp(20px, 4vw, 32px)"}}>Textos Personalizados</h2>
                            <p className="text-secondary fs-6 fs-md-5">
                                Podrás configurar el texto de algunos títulos, acciones y botones de su landing page.
                                <ul className="ms-3 mt-3">
                                    <li>Título de Formulario.</li>
                                    <li>Check de envío de voucher.</li>
                                    <li>Botón de Aleatorio…</li>
                                </ul>                
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                        <h2 className="text-success text-opacity-25 text-center">Aquí va la imagen de la sección de PERSONALIZACIONES</h2>
                    </div>
                </div>  
            </section>

            <section className="container px-3 px-md-4 pb-5">
                <div className="row g-4">
                    <div className="col-12 col-lg-8">
                        <div>
                            <p className="fs-6 fs-md-5 text-danger pb-2 mb-0">NUMEROS DE REGALO</p>
                            <h2 className="mb-4 text-secondary" style={{fontSize: "clamp(20px, 4vw, 32px)"}}>Sistema de Oportunidades</h2>
                            <p className="text-secondary fs-6 fs-md-5">
                                Elige la cantidad de tickets de regalo que tendrán tus usuarios eligiendo un boleto.
                                <ul className="ms-3 mt-3">
                                    <li>Cualquier Numeración.</li>
                                    <li>Cualquier Configuración.</li>
                                    <li>Facilita la elección de Tickets</li>
                                </ul>                
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                        <h2 className="text-success text-opacity-25 text-center">Aquí va la imagen de la sección de NUMEROS DE REGALO</h2>
                    </div>
                </div>  
            </section>

            <section className="container px-3 px-md-4 pb-5">
                <div className="row g-4">
                    <div className="col-12 col-lg-8">
                        <div>
                            <p className="fs-6 fs-md-5 text-danger pb-2 mb-0">VENDE MAS TICKETS</p>
                            <h2 className="mb-4 text-secondary" style={{fontSize: "clamp(20px, 4vw, 32px)"}}>Sistema de Descuentos</h2>
                            <p className="text-secondary fs-6 fs-md-5">
                                Gracias a nuestro algoritmo puedes configurar a tu gusto el porcentaje de descuentos.
                                <ul className="ms-3 mt-3">
                                    <li>Tablero de precios.</li>
                                    <li>Previsualización de costos.</li>
                                    <li>A más tickets mayor descuento</li>
                                </ul>                
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                        <h2 className="text-success text-opacity-25 text-center">Aquí va la imagen de la sección de VENDE MAS TICKETS</h2>
                    </div>
                </div>  
            </section>

            <section className="container px-3 px-md-4 pb-5">
                <div className="row g-4">
                    <div className="col-12 col-lg-8">
                        <div>
                            <p className="fs-6 fs-md-5 text-danger pb-2 mb-0">OFERTAS DE BOLETOS</p>
                            <h2 className="mb-4 text-secondary" style={{fontSize: "clamp(20px, 4vw, 32px)"}}>Sistema de Promociones</h2>
                            <p className="text-secondary fs-6 fs-md-5">
                                Podrás ofrecer promociones de 2×1 (comprando un boleto el segundo es gratis), 3×2, 4×3, 5×4…
                                <ul className="ms-3 mt-3">
                                    <li>Descuento en el precio al instante.</li>
                                    <li>Descuento en el precio al instante.</li>
                                    <li>Se puede actualizar en cualquier momento.</li>
                                </ul>                
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                        <h2 className="text-success text-opacity-25 text-center">Aquí va la imagen de la sección de OFERTAS DE BOLETOS</h2>
                    </div>
                </div>  
            </section>         
        </div>
    );
}

export default Configuracion;