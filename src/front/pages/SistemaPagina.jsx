import { Link } from "react-router-dom";

const SistemaPagina = () => {
    return (
        <>
            <section className="row align-items-center mx-3 mx-md-5 mb-5 p-4 p-md-5" style={{
                backgroundSize: "cover",
                minHeight: "500px",
                height: "auto",
                borderRadius: "20px"
            }}>
                <div className="col-12 col-lg-6 text-start mb-4 mb-lg-0" style={{color:"#d90429"}}>
                    <h1 style={{fontSize: "clamp(32px, 6vw, 80px)", fontWeight: "bold"}}>
                        Nuestro Sistema 
                    </h1>
                    <p className="fs-5 fs-md-3" style={{color:"#961623"}}>
                        Administra, controla y haz crecer tus rifas desde plataforma moderna, segura y fácil de usar. 
                    </p>        
                </div>
                <div className="col-12 col-lg-6 text-center">
                    <img 
                        src="https://res.cloudinary.com/dkkkjhhgl/image/upload/v1770358243/MagicEraser_260125_114843_xcld4t.png" 
                        alt="Rifame Logo" 
                        className="img-fluid"
                        style={{filter: "drop-shadow(0px 10px 25px rgba(0, 0, 0, 0.25))", maxWidth: "300px", width: "100%"}}
                    />
                </div>
            </section>

            <section className="container mb-5 px-3 px-md-4">
                <h2 className="text-center mb-5" style={{color:"#d90429", fontSize: "clamp(24px, 4vw, 36px)"}}>
                    ¿Que incluye el Sistema?
                </h2>
                <div className="row g-4">
                    {[
                        {title: "Panel Administrativo", text: "Control total de rifas, participantes y ventas en tiempo real"},
                        {title: "Gestión de Tickets", text: "Visualiza tickets vendidos y disponibles fácilmente"},
                        {title: "Personalización", text: "Personaliza el diseño de tus rifas con plantillas a medida"},
                        {title: "Seguridad", text: "Protege tus rifas con autenticación y control de acceso"},
                    ].map((item, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-3">
                            <div className="card h-100 border-0 p-4"
                                style={{
                                    boxShadow: "0 10px 30px rgba(217, 4, 41,0.15)",
                                    borderRadius: "20px"
                                }}
                            >
                                <h4 style={{color: "#d90429", fontWeight: "bold"}}>{item.title}</h4>
                                <p className="text-muted">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="row mx-3 mx-md-5 mb-5 g-4">
                <div className="col-12 col-md-6 d-flex">
                    <div className="p-4 p-md-5 rounded-4 w-100"
                        style={{
                            background: "#fff",
                            boxShadow:"0px 10px 40px rgba(0,0,0,0.1)"
                        }}
                    >
                        <h2 style={{color:"#d90429", fontWeight: "bold", fontSize: "clamp(24px, 4vw, 32px)"}}>
                            Diseño para ti
                        </h2>
                        <p className="fs-5 fs-md-4 mt-4">
                            Rifame está pensado para organizadores que buscan facilitar el proceso de sus rifas, sin complicaciones. Todo está en una sola página, accesible desde cualquier dispositivo.
                        </p>
                    </div>
                </div>

                <div className="col-12 col-md-6 d-flex">
                    <div className="p-4 p-md-5 rounded-4 w-100"
                        style={{
                            background: "#fff",
                            boxShadow:"0px 10px 40px rgba(0,0,0,0.1)"
                        }}
                    >
                        <h3 style={{color:"#d90429", fontWeight: "bold", fontSize: "clamp(24px, 4vw, 32px)"}}>
                            Plataforma 100% Web
                        </h3>
                        <p className="fs-6 fs-md-5 mt-3">
                            No necesitas instalar nada. Accede desde cualquier lugar y controla todas tus rifas fácilmente
                        </p>
                    </div>
                </div>
            </section>

            <section className="container mb-5 px-3 px-md-4">
                <div className="p-4 p-md-5 text-center rounded-4"
                    style={{
                        background: "#d90429",
                        color: "#fff",
                    }}
                >
                    <h2 className="mb-4 fw-bold" style={{fontSize: "clamp(24px, 4vw, 36px)"}}>
                        Lleva tus rifas al siguiente nivel.
                    </h2>
                    <p className="fs-6 fs-md-5 mb-4">
                        Empieza a gestionar rifas de forma pro.
                    </p>
                    <Link 
                        to="/crear-rifa"
                        className="btn btn-light btn-lg rounded-5 px-4 px-md-5"
                        style={{textDecoration: "none"}}
                    >
                        Crear mi primera Rifa
                    </Link>
                </div>
            </section>

            <section className="text-center mb-5 px-3">
                <h2 style={{color:"#d90429", fontWeight: "bold", fontSize: "clamp(24px, 4vw, 36px)"}}>
                    ¿Listo para comenzar?
                </h2>
            </section>
        </>
    );
};

export default SistemaPagina;