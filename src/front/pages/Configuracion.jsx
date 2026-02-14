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

            <section id="dominio" className="container px-3 px-md-4 pb-5">    
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
                        <h2 className="text-success text-opacity-25"><img src= "https://img.icons8.com/fluent-systems-filled/512w/FA5252/domain.png" style={{ width: "100px", height: "100px", color:"#f50b22"}}/></h2>
                    </div>
                </div>                
            </section>

            <section id="descuentos" className="container px-3 px-md-4 pb-5">
                <div className="row g-4">
                    <div className="col-12 col-lg-8">
                        <div>
                            <p className="fs-6 fs-md-5 text-danger pb-2 mb-0">VENDE MAS TICKETS</p>
                            <h2 className="mb-4 text-secondary" style={{fontSize: "clamp(20px, 4vw, 32px)"}}>Sistema de Descuentos</h2>
                            <p className="text-secondary fs-6 fs-md-5">
                                Gracias a nuestro algoritmo puedes configurar a tu gusto el porcentaje de descuentos. 
                                <ul className="ms-3 mt-3">
                                    <li>Tablero de Precios</li>
                                    <li>Previsualización de costos</li>
                                    <li>A más tickets mayor descuento</li>
                                </ul>                
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                        <h2 className="text-success text-opacity-25"><img src= "https://cdn-icons-png.flaticon.com/512/726/726476.png" style={{ width: "100px", height: "100px", color:"#f50b22"}}/></h2>
                    </div>
                </div>  
            </section>

            <section id="vendedores" className="container px-3 px-md-4 pb-5">
                <div className="row g-4">
                    <div className="col-12 col-lg-8">
                        <div>
                            <p className="fs-6 fs-md-5 text-danger pb-2 mb-0">VENDE MAS RAPIDO</p>
                            <h2 className="mb-4 text-secondary" style={{fontSize: "clamp(20px, 4vw, 32px)"}}>Sistema de Vendedores</h2>
                            <p className="text-secondary fs-6 fs-md-5">
                                Podrás tener múltiples vendedores con 2 modalidades de funcionamiento.
                                <ul className="ms-3 mt-3">
                                    <li>Primera modalidad con Usuario propio.</li>
                                    <li>Segunda modalidad sin Usuario (Campo libre ó Selección de Vendedores)</li>
                                    <li>En ambos casos el administrador tendrá la información.</li>
                                </ul>                
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                        <h2 className="text-success text-opacity-25"><img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPVjYgFKysqLvhk3prKvkA-PjQNW1Pdzi8-w&s" style={{ width: "100px", height: "100px", color:"#f50b22"}}/></h2>
                    </div>
                </div>  
            </section>

            <section id="voucher"className="container px-3 px-md-4 pb-5">
                <div className="row g-4">
                    <div className="col-12 col-lg-8">
                        <div>
                            <p className="fs-6 fs-md-5 text-danger pb-2 mb-0">IMAGEN</p>
                            <h2 className="mb-4 text-secondary" style={{fontSize: "clamp(20px, 4vw, 32px)"}}>Carga de Voucher</h2>
                            <p className="text-secondary fs-6 fs-md-5">
                                Podrás elegir si tus participantes deben subir el comprobante al sistema o lo envíen a WhatsApp
                                <ul className="ms-3 mt-3">
                                    <li>Comprobante para verificar</li>
                                    <li>Como respaldo si pierdes tu WhatsApp</li>
                                    <li>Accesible desde el Panel del Admin</li>
                                </ul>                
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                        <h2 className="text-success text-opacity-25"><img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyB6vcdKgDEqG_twAZopFgGXn1dbzdcUsWGQ&s" style={{ width: "100px", height: "100px", color:"#f50b22"}}/></h2>
                    </div>
                </div>  
            </section>

           
        </div>
    );
}

export default Configuracion;