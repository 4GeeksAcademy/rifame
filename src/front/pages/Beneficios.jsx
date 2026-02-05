import { Link } from "react-router-dom";
const fondo1 = "/red_wavy_with_halftone_background.jpg";


const Beneficios = () => {

    return ( 
        <>
                <section>
                    <div
                        className="d-flex justify-content-center align-items-center bg-opacity-50 gt3-page-title_wrapper mb-5"
                        style={{ height: "200px", backgroundImage: `url(${fondo1})`, backgroundSize: "cover", backgroundPosition: "center" }} >
                        <h1 className="text-dark fw-bold ">Beneficios</h1>
                    </div>
                </section>

                <section id="pagina-web" className="container d-flex ps-5 pb-5">    
                <div>
                    <h5 className="text-dark mb-4">Beneficios de nuestro sistema</h5>
                    <div>
                        <p className="ms-4 fs-5 text-danger pb-2 mb-0" >LANDING PAGE</p>
                        <h2 className="ms-4 mb-4 text-secondary" >Pagina Web Personalizada</h2>
                        <p className="ms-4 text-secondary fs-5" >En tan solo unas horas tendrás tu propia página web lista para empezar a vender tus tickets. 
                            <ul className="ms-3 mt-3">
                                <li>Con tu Logo</li>
                                <li>Con tus Colores</li>
                                <li>Con tus Dinamica</li>
                                <li>Con tu Datos</li>
                            </ul>                
                        </p>
                    </div>
                </div>

                 <div>
                    <h2 className="text-success text-opacity-25"><img src= "https://images.vexels.com/media/users/3/199980/isolated/preview/4c910ee68a0f4fe8029f72e40bc10fe6-icono-de-navegacion-por-internet-trazo-rosa.png" style={{ width: "100px", height: "100px", color:"#f50b22"}}/></h2>
                </div>                
            </section>

             <section className="container d-flex ps-5 pb-5">
                <div>
                    <div>
                        <p className="ms-4 fs-5 text-danger pb-2 mb-0" >RAPIDEZ</p>
                        <h2 className="ms-4 mb-4 text-secondary" >Velocidad Garantizada</h2>
                        <p className="ms-4 text-secondary fs-5" >
                            Gracias a nuestros nuevos algoritmos e infraestructura totalmente optimizada… 
                            <ul className="ms-3 mt-3">
                                <li>Todas las Numeraciones</li>
                                <li>Todas las Configuraciones</li>
                                <li>Toda la Administración</li>
                            </ul>                
                        </p>
                    </div>
                </div>

                <div>
                    <h2 className="text-success text-opacity-25"><img src= "https://media.istockphoto.com/id/1370444281/es/foto/icono-de-reloj-circular-estilizado-alarma-m%C3%ADnima-timbre-del-reloj-icono-de-tiempo-de-velocidad.webp?a=1&b=1&s=612x612&w=0&k=20&c=lDFXw7b8zp1wqp5KjgL83fYY1IfnbR1QoI3mtq5ohRs=" style={{ width: "100px", height: "100px", color:"#f50b22"}}/></h2>
                </div>  
            </section>


            <section className="container d-flex ps-5 pb-5">
                <div>
                    <div>
                        <p className="ms-4 fs-5 text-danger pb-2 mb-0" >NUMERACION</p>
                        <h2 className="ms-4 mb-4 text-secondary" >Paginado de Tickets</h2>
                        <p className="ms-4 text-secondary fs-5" >
                            El Sistema cuenta con paginado optimizado con carga veloz de tickets 
                        <p className="ms-4 text-secondary fs-5" >
                            para una experiencia óptima para el usuario.
                            </p>    
                            <ul className="ms-3 mt-3">
                                <li>Carga Veloz</li>
                                <li>Paginado Inteligente</li>
                                <li>Optimizado para Móviles</li>
                            </ul>                
                        </p>
                    </div>
                </div>

                <div>
                     <h2 className="text-success text-opacity-25"><img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo70U6Dew7_rwmS22lRXfTAoyWxU1ZIfSMYg&s" style={{ width: "100px", height: "100px", color:"#f50b22"}}/></h2>
                </div>  
            </section>

            <section className="container d-flex ps-5 pb-5">
                <div>
                    <div>
                        <p className="ms-4 fs-5 text-danger pb-2 mb-0" >COMPATIBILIDAD</p>
                        <h2 className="ms-4 mb-4 text-secondary" >Página Adaptable</h2>
                        <p className="ms-4 text-secondary fs-5" >
                            Diseñado cuidadosamente para mostrarse perfecto en cada tamaño y tipo de pantalla…
                            <ul className="ms-3 mt-3">
                                <li>Computadoras (PCs)</li>
                                <li>Laptops</li>
                                <li>Tablets</li>
                                <li>Celulares</li>
                            </ul>                
                        </p>
                    </div>
                </div>

                <div>
                   <h2 className="text-success text-opacity-25"><img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn5zYWW9A8bnb84fe3I-rGrF7vHmQWUmDL5g&s" style={{ width: "100px", height: "100px", color:"#f50b22"}}/></h2>
                </div>  
            </section>

           
                </>

                
                );
            
};


            export default Beneficios;