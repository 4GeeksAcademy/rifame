import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	return (
		<div>
			<section 
				className="justify-content-center align-items-center row mx-5 mb-5"
				style={{backgroundImage: "url('src/front/assets/img/red_wavy_with_halftone_background.jpg')", backgroundSize: "cover", height: "750px", borderRadius: "15px"}}
				id="scrollspyHeading1"
			>
				<div className="text-start mt-5 col-4 align-self-start" style={{color:"#d90429"}}>
					<h1  style={{fontSize: "94px", fontWeight: "bold"}}>Sistema de Rifas Online</h1>
					<p className="fs-3" style={{color:"#961623"}}>Vende tickets por Internet en nuestra plataforma digital de <strong>sorteos online</strong> con números de la lotería y <strong>boletos virtuales</strong>.</p>
				</div>
				<div className="col-4">
					<img 
						src="src/front/assets/img/MagicEraser_260125_114439.PNG" 
						alt="Rifame Logo" 
						className="d-block m-auto"
						width="500"
						height="500"
					/>
				</div>
			</section>
			<section 
				className="justify-content-center align-items-center row mx-5 mb-5"
				style={{backgroundImage: "url('')", backgroundSize: "cover", height: "750px", borderRadius: "15px"}}
			>
				<div className="d-flex justify-content-center col-2 mb-4" style={{boxShadow: "60px 60px 199px -50px rgba(217,4,41,1)"}}>
					<div className="flex-column">
						<button className="btn btn-danger btn-lg w-100" style={{height:"350px"}}>Crear Rifa</button>
						<button className="btn btn-outline-danger btn-lg mt-3 w-100" style={{height:"350px"}}>Participar en Rifa</button>
					</div>
				</div>
				<div className="d-flex justify-content-center col-2 mb-4">
					<div className="flex-column">
						<button className="btn btn-outline-danger btn-lg w-100" style={{height:"350px"}}>Crear Rifa</button>
						<button className="btn btn-danger btn-lg mt-3 w-100" style={{height:"350px"}}>Participar en Rifa</button>
					</div>
				</div>
				<div className="d-flex flex-column align-items-start col-4 ms-5">
					<h5 className="text-start mb-5">Bienvenido</h5>
					<h2 className="text-center mx-auto mb-4" style={{color:"#d90429", fontWeight:"bold"}}>Acelera la venta de tus Tickets!</h2>
					<p className="fs-4 text-start mx-auto">RIFAME es una plataforma digital que permite a los usuarios crear, gestionar y participar en rifas y sorteos en línea de manera fácil y segura. Nuestro objetivo es brindar una experiencia divertida y emocionante para todos los participantes, al tiempo que ofrecemos a los organizadores una herramienta eficiente para administrar sus eventos.</p>
				</div>
			</section>
			<section 
				className="container mb-5" id="scrollspyHeading2"
			>
				<h2 className="text-center mb-4" style={{color:"#d90429", fontWeight:"bold"}}>Nuestro Sistema te brinda</h2>
				<div className="accordion" id="faqAccordion">
					<div className="accordion-item">
						<h2 className="accordion-header" id="headingOne">
							<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								¿Cómo puedo crear una rifa en RIFAME?
							</button>
						</h2>
						<div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
							<div className="accordion-body">
								Para crear una rifa, simplemente regístrate en nuestra plataforma, accede a tu cuenta y sigue las instrucciones para configurar los detalles de tu rifa, como el premio, la fecha del sorteo y el precio de los boletos.
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header" id="headingTwo">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
								¿Cómo se selecciona al ganador de una rifa?
							</button>
						</h2>
						<div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
							<div className="accordion-body">
								El ganador de la rifa se selecciona de manera aleatoria utilizando un algoritmo seguro y transparente para garantizar la imparcialidad del sorteo.
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header" id="headingThree">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
								¿Es seguro participar en rifas en línea?
							</button>
						</h2>
						<div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
							<div className="accordion-body">
								Sí, en RIFAME nos tomamos muy en serio la seguridad de nuestros usuarios. Utilizamos medidas de seguridad avanzadas para proteger la información personal y financiera de nuestros participantes.
							</div>
						</div>
					</div>
				</div>
			</section>


		</div>
	);
}; 