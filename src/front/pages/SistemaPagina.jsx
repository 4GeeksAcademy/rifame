
const SistemaPagina = () => {
    return (
        <>
            <section className=" row align-items-center mx-5 mb-5 p-5" style={{
                backgroundSize: "cover",
                height: "650px",
                borderRadius: "20px"
            }}>
             <div className="col-6 text-start" style={{color:"#d90429"}}>
                <h1 style={{
                    fontSize: "80px", 
                    fontWeight: "bold"}}>
                        Nuestro Sistema 
                </h1>
                <p className="fs-3" style={{color:"#961623"}}>
                    Administra, controla y haz crecer tus rifas desde plataforma moderna, segura y fácil de usar. 
                </p>        
                </div>
                <div className="col-6 text-center">
                    <img 
                        src="src/front/assets/img/MagicEraser_260125_114439.PNG" 
                        alt="Rifame Logo" 
                        width="480"
                        className="img-fluid"
                        style={{filter: "drop-shadow(0px 10px 25px rgba(0, 0, 0, 0.25))"}}
                    />
                </div>
            </section>
            <section className="container mb-5">
                <h2 className="text-center mb-5" style={{color:"#d90429"}}>
                    ¿Que incluye el Sistema?
                </h2>
                <div className="row g-4">
                    {[
                        {title: "Panel Administrativo", text: "Control total de rifas, participantes y ventas en timepo real"},
                        {title: "Gestion de Tickets", text: "Visualiza tickets vendidos y disponibles falcilmente"},
                        {title: "Personalización", text: "Personaliza el diseño de tus rifas con plantillas a medida"},
                        {title: "Seguridad", text: "Protege tus rifas con autenticación y control de acceso"},

                    ].map((item, index) => (
                        <div key={index} className="col-md-4">
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
            <section className="row mx-5 mb-5 align-items-strech">
                <div className="col-md-6 d-flex">
                    <div className="p-5 rounded-4 w-100"
                        style={{
                            background: "#fff",
                            boxShadow:"0px 10px 40px rgba(0,0,0,0.1)"
                        }}
                    >
                   
                    <h2 style={{color:"#d90429", fontWeight: "bold"}}>
                        Diseño para ti
                    </h2>
                    <p className="fs-4 mt-4">
                       Rifame está pensado para organizadores que buscan facilitar el proceso de sus rifas, sin complicaciones.Todo esta en una sola pagina, accesibel desde cualquier dispositivo.
                    </p>
                    </div>
                </div>

                <div className="col-md-6 d-flex">
                    <div className="p-5 rounded-4 w-100"
                        style={{
                            background: "#fff",
                            boxShadow:"0px 10px 40px rgba(0,0,0,0.1)"
                        }}
                >
                        <h3 style={{color:"#d90429", fontWeight: "bold"}}>
                            Plataforma 100% Web
                        </h3>
                        <p className="fs-5 mt-3">
                            No necesitas instalar nada. Accede desde cualquier lugar y controla todas tus rifas facilmente
                        </p>
                    </div>
                </div>
            </section>
            <section className="container mb-5">
                <div className="p-5 text-center rounded-4"
                    style={{
                        background: "#d90429",
                        color: "#fff",
                    }}
                >
                    <h2 className="mb-4 fw-bold">
                        LLeva tus rifas al siguiente nivel.
                    </h2>
                    <p className="fs-5 mb-4">
                        Empieza a gestionar rifas de forma pro.
                    </p>
                    <button className="btn btn-light btn-lg rounded-5 px-5">
                        Crear mi primera Rifa
                    </button>
                </div>
            </section>
            <section className="text-center mb-5">
                <h2 style={{color:"#d90429", fontWeight: "bold"}}>
                    ¿Listo para comenzar?
                    </h2>
            </section>
        </>
    );
};
    export default SistemaPagina;