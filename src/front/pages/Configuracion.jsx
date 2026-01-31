const fondo1 = "/red-curved-sheets-paper.jpg";


const Configuracion = () => {


    return (
        <div>
              
            <section>
                <div 
                    className="d-flex justify-content-center align-items-center bg-opacity-50 gt3-page-title_wrapper mb-5" 
                    style={{height:"200px", backgroundImage: `url(${fondo1})`, backgroundSize: "cover", backgroundPosition: "center" }} >
                    <h1 className="text-white fw-bold ">Configuraciones</h1> 
                </div>
            </section>


            {/*Sección TU MARCA*/} 
            <section className="container d-flex ps-5 pb-5">    
                <div>
                    <h5 className="text-dark mb-4">Opciones Configurables en el sistema</h5>
                    <div>
                        <p className="ms-4 fs-5 text-danger pb-2 mb-0" >TU MARCA</p>
                        <h2 className="ms-4 mb-4 text-secondary" >Dominio  Wep  Propio</h2>
                        <p className="ms-4 text-secondary fs-5" >El sistema funciona tu dominio <span className=" text-danger fw-bold">www.tumarca.com</span> o <span className="text-danger fw-bold">subdominio rifas.tumarca.com</span>
                            <ul className="ms-3 mt-3">
                                <li>Cualquier proveedor de dominio</li>
                                <li>Activación en 1 hora</li>
                                <li>Registros nuevos y existentes</li>
                            </ul>                
                        </p>
                    </div>
                </div>

                 <div>
                    <h2 className="text-success text-opacity-25">Aquí va la imagen de la sección de configuracines</h2>
                </div>                
            </section>


            {/*Sección ELEGIBLE*/}
            <section className="container d-flex ps-5 pb-5">
                <div>
                    <div>
                        <p className="ms-4 fs-5 text-danger pb-2 mb-0" >ELEGIBLE</p>
                        <h2 className="ms-4 mb-4 text-secondary" >Campos Adicionales</h2>
                        <p className="ms-4 text-secondary fs-5" >
                            Agrega campos adicionales al formulario de registro para recopilar información específica de tus usuarios. 
                            <ul className="ms-3 mt-3">
                                <li>Visible desde el Panel de Admin.</li>
                                <li>Descargable en el Reporte</li>
                                <li>Estadísticas de Uso</li>
                            </ul>                
                        </p>
                    </div>
                </div>

                <div>
                    <h2 className="text-success text-opacity-25">Aquí va la imagen de la sección DE ELEGIBLE</h2>
                </div>  
            </section>


             {/*Sección AUATOMATICO*/}
            <section className="container d-flex ps-5 pb-5">
                <div>
                    <div>
                        <p className="ms-4 fs-5 text-danger pb-2 mb-0" >AUTOMATICO</p>
                        <h2 className="ms-4 mb-4 text-secondary" >Múltiples Medios de Pagos</h2>
                        <p className="ms-4 text-secondary fs-5" >
                            Pagos por transferencia ó depósito con Voucher <span className="text-danger fw-bold">(comprobante)</span> y pago online con verificación automática.
                            <ul className="ms-3 mt-3">
                                <li>Pago con Pasarela de Pagos de Mercado Pago.</li>
                                <li>Pago con Tarjeta</li>
                                <li>Pago con PayPal (según disponibilidad)</li>
                            </ul>                
                        </p>
                    </div>
                </div>

                <div>
                    <h2 className="text-success text-opacity-25">Aquí va la imagen de la sección de AUTOMATICO</h2>
                </div>  
            </section>


             {/*Sección PORCENTAJE VENDIDO*/}
            <section className="container d-flex ps-5 pb-5">
                <div>
                    <div>
                        <p className="ms-4 fs-5 text-danger pb-2 mb-0" >PORCENTAJE VENDIDO</p>
                        <h2 className="ms-4 mb-4 text-secondary" >Barra de Progreso</h2>
                        <p className="ms-4 text-secondary fs-5" >
                            Pagos por transferencia ó depósito con Voucher <span className="text-danger fw-bold">(comprobante)</span> y pago online con verificación automática.
                            <ul className="ms-3 mt-3">
                                <li>Se ocultan fechas</li>
                                <li>Se muestra arriba de la descripción</li>
                            </ul>                
                        </p>
                    </div>
                </div>

                <div>
                    <h2 className="text-success text-opacity-25">Aquí va la imagen de la sección de PORCENTAJE VENDIDO</h2>
                </div>  
            </section>



            {/*Sección PERSONALIZACIONES*/}
            <section className="container d-flex ps-5 pb-5">
                <div>
                    <div>
                        <p className="ms-4 fs-5 text-danger pb-2 mb-0" >PERSONALIZACIONES</p>
                        <h2 className="ms-4 mb-4 text-secondary" >Textos Personalizados</h2>
                        <p className="ms-4 text-secondary fs-5" >
                            Podrás configurar el texto de algunos títulos, acciones y botones de su landing page.
                            <ul className="ms-3 mt-3">
                                <li>Título de Formulario.</li>
                                <li>Check de envío de voucher.</li>
                                <li>Botón de Aleatorio…</li>
                            </ul>                
                        </p>
                    </div>
                </div>

                <div>
                    <h2 className="text-success text-opacity-25">Aquí va la imagen de la sección de PERSONALIZACIONES</h2>
                </div>  
            </section>



            {/*Sección NUMEROS DE REGALO*/}
            <section className="container d-flex ps-5 pb-5">
                <div>
                    <div>
                        <p className="ms-4 fs-5 text-danger pb-2 mb-0" >Números de Regalo</p>
                        <h2 className="ms-4 mb-4 text-secondary" >Sistema de Oportunidades</h2>
                        <p className="ms-4 text-secondary fs-5" >
                            Elige la cantidad de tickets de regalo que tendrán tus usuarios eligiendo un boleto.
                            <ul className="ms-3 mt-3">
                                <li>Cualquier Numeración.</li>
                                <li>Cualquier Configuración.</li>
                                <li>Facilita la elección de Tickets</li>
                            </ul>                
                        </p>
                    </div>
                </div>

                <div>
                    <h2 className="text-success text-opacity-25">Aquí va la imagen de la sección de NUMEROS DE REGALO</h2>
                </div>  
            </section>



            {/*Sección VENDE MAS TICKETS*/}
            <section className="container d-flex ps-5 pb-5">
                <div>
                    <div>
                        <p className="ms-4 fs-5 text-danger pb-2 mb-0" >Vende más tickets</p>
                        <h2 className="ms-4 mb-4 text-secondary" >Sistema de Descuentos</h2>
                        <p className="ms-4 text-secondary fs-5" >
                            Gracias a nuestro algoritmo puedes configurar a tu gusto el porcentaje de descuentos.
                            <ul className="ms-3 mt-3">
                                <li>Tablero de precios.</li>
                                <li>Previsualización de costos.</li>
                                <li>A más tickets mayor descuento</li>
                            </ul>                
                        </p>
                    </div>
                </div>

                <div>
                    <h2 className="text-success text-opacity-25">Aquí va la imagen de la sección de VENDE MAS TICKETS</h2>
                </div>  
            </section>
            
            
            

        
        
        
        </div>

    );
}


export default Configuracion;
