import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	return (
		<div>
			<section
				className="justify-content-center align-items-center row mx-3 mx-md-5 mb-5 px-3"
				style={{ backgroundImage: "url('https://res.cloudinary.com/dkkkjhhgl/image/upload/v1770358857/red_wavy_with_halftone_background_j4ui6q.jpg')", backgroundSize: "cover", minHeight: "500px", height: "auto", borderRadius: "15px" }}
				id="scrollspyHeading1"
			>
				<div className="text-start text-md-start mt-5 col-12 col-lg-4 align-self-start" style={{ color: "#d90429" }}>
					<h1 style={{ fontSize: "clamp(32px, 6vw, 94px)", fontWeight: "bold" }}>Sistema de Rifas Online</h1>
					<p className="fs-5 fs-md-3" style={{ color: "#961623" }}>Vende tickets por Internet en nuestra plataforma digital de <strong>sorteos online</strong> con números de la lotería y <strong>boletos virtuales</strong>.</p>
				</div>
				<div className="col-12 col-lg-4 d-flex justify-content-center mt-4 mt-lg-0">
					<img
						src="https://res.cloudinary.com/dkkkjhhgl/image/upload/v1770357996/MagicEraser_260125_114439_dp3yik.png"
						alt="Rifame Logo"
						className="img-fluid"
						style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))", maxWidth: "500px", width: "100%" }}
					/>
				</div>
			</section>

			<section
				className="justify-content-center align-items-center row mx-3 mx-md-5 mb-5 px-3"
				style={{ borderRadius: "15px" }}
				id="scrollspyHeading2"
			>
				<div className="d-flex justify-content-center col-12 col-md-6 col-lg-2 mb-4">
					<div className="flex-column w-100">
						<button className="btn btn-outline-danger btn-lg w-100 mb-3" style={{ minHeight: "250px", boxShadow: "-10px -10px 70px -50px rgba(217,4,41,1)" }}>
							<strong>Sin Comisiones</strong><br />
							Todos los pagos van directo hacia sus cuentas...
						</button>
						<button className="btn btn-outline-danger btn-lg w-100" style={{ minHeight: "250px", boxShadow: "-10px 10px 70px -50px rgba(217,4,41,1)" }}>
							<strong>Automatizado</strong><br />
							Tus clientes elegirán sus números y enviarán su voucher...
						</button>
					</div>
				</div>
				<div className="d-flex justify-content-center col-12 col-md-6 col-lg-2 mb-4">
					<div className="flex-column w-100">
						<button className="btn btn-outline-danger btn-lg w-100 mb-3" style={{ minHeight: "250px", boxShadow: "10px -10px 70px -50px rgba(217,4,41,1)" }}>
							<strong>Fácil de Usar</strong><br />
							Landing Page y Panel con una interfaz amigable...
						</button>
						<button className="btn btn-outline-danger btn-lg w-100" style={{ minHeight: "250px", boxShadow: "10px 10px 70px -50px rgba(217,4,41,1)" }}>
							<strong>Administrable</strong><br />
							Puedes gestionar los tickets y ver las estadísticas.
						</button>
					</div>
				</div>
				<div className="d-flex flex-column align-items-start col-12 col-lg-4 mt-4 mt-lg-0 ms-lg-5">
					<h6 className="text-start mb-5">BIENVENIDO</h6>
					<h2 className="text-start mb-4" style={{ color: "#d90429", fontWeight: "bold", fontSize: "clamp(24px, 4vw, 40px)" }}>Acelera la venta de tus Tickets!</h2>
					<p className="fs-6 fs-md-4 text-start">RIFAME es una plataforma digital que permite a los usuarios crear, gestionar y participar en rifas y sorteos en línea de manera fácil y segura. Nuestro objetivo es brindar una experiencia divertida y emocionante para todos los participantes, al tiempo que ofrecemos a los organizadores una herramienta eficiente para administrar sus eventos.</p>
				</div>
			</section>

			<section
				className="justify-content-center align-items-center row mx-3 mx-md-5 mb-5 px-3"
				id="scrollspyHeading3"
			>
				<div className="col-12 col-lg-4 mb-4 mb-lg-0 me-lg-5">
					<h6 className="text-start mb-5">PLATAFORMA COMPLETA</h6>
					<h2 className="text-start text-lg-center mb-4" style={{ color: "#d90429", fontWeight: "bold", fontSize: "clamp(24px, 4vw, 40px)" }}>Nuestro Sistema te brinda</h2>
					<div className="accordion" id="faqAccordion">
						<div className="accordion-item rounded-2 mb-3 border">
							<h2 className="accordion-header" id="headingOne">
								<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
									Página Web Online
								</button>
							</h2>
							<div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
								<div className="accordion-body">
									Landing Page con tu logo, colores y configuraciones donde los usuarios pueden elegir sus números de tickets, subir su voucher de pago y verificar sus tickets.
								</div>
							</div>
						</div>
						<div className="accordion-item rounded-2 mb-3 border">
							<h2 className="accordion-header" id="headingTwo">
								<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
									Panel de Administración
								</button>
							</h2>
							<div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
								<div className="accordion-body">
									Estadísticas, datos de participantes, lista de tickets / boletos, configuraciones, tickets vendidos, aprobación de compras, botones de WhatsApp…
								</div>
							</div>
						</div>
						<div className="accordion-item rounded-2 mb-3 border">
							<h2 className="accordion-header" id="headingThree">
								<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
									Múltiples Configuraciones
								</button>
							</h2>
							<div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
								<div className="accordion-body">
									Colores, Oportunidades, mostrar/ocultar reservados, múltiples medios de pagos, descuentos, campos extras, promociones, dominio propio…
								</div>
							</div>
						</div>
						<div className="accordion-item rounded-2 mb-3 border">
							<h2 className="accordion-header" id="headingFour">
								<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
									Verificador de Tickets
								</button>
							</h2>
							<div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
								<div className="accordion-body">
									Brinda seguridad a tus participantes al permitirles verificar sus números de boletos comprados con su número de celular o número de boleto/ticket.
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-12 col-lg-4 d-flex justify-content-center">
					<img
						src="https://res.cloudinary.com/dkkkjhhgl/image/upload/v1770358243/MagicEraser_260125_114843_xcld4t.png"
						alt="Rifame Logo"
						className="img-fluid"
						style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))", maxWidth: "500px", width: "100%" }}
					/>
				</div>
			</section>

			<section id="scrollspyHeading4">
				<div className="container my-5 p-4 p-md-5 rounded-4 bg-body-tertiary">
					<div className="d-flex flex-column flex-lg-row justify-content-center align-items-center m-auto gap-3">
						<h2 className="text-center m-0 mb-3 mb-lg-0 me-lg-5" style={{ color: "#d90429", fontWeight: "bold", fontSize: "clamp(20px, 4vw, 32px)" }}>Suscríbase para Recibir Promociones</h2>
						<form className="d-flex flex-column flex-sm-row gap-2 w-100 w-lg-auto" role="search">
							<input className="form-control" type="search" placeholder="Ingresa tu correo electrónico" aria-label="Search" style={{ maxWidth: "400px" }} />
							<button className="btn btn-danger rounded-5 px-4" type="submit">Suscribirse</button>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
};