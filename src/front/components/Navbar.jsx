import { Link } from "react-router-dom";


export const Navbar = () => {

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container">
				<Link to="/" className="d-flex align-items-center text-decoration-none">
					<img
						src="src/front/assets/img/MagicEraser_260125_114439.PNG"
						alt="Logo"
						width="50"
						height="50"
						className="d-inline-block"
					/>
					<h1
						className="navbar-brand mb-0 ms-2"
						style={{ fontSize: "40px", color: "#000000" }}
					>
						Rifame<span className="text-danger" style={{ fontSize: "40px", color: "#d90429" }}>.</span>
					</h1>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-5">
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Inicio
							</a>
							<ul className="dropdown-menu fs-small">
								<li>
									<a className="dropdown-item" href="#scrollspyHeading1">Acerca de RIFAME</a>
								</li>
								<li>
									<a className="dropdown-item" href="#scrollspyHeading2">Bienvenidos</a>
								</li>
								<li>
									<a className="dropdown-item" href="#scrollspyHeading3">Plataforma Completa</a>
								</li>
								<li>
									<a className="dropdown-item" href="#scrollspyHeading4">Promociones</a>
								</li>
							</ul>
						</li>
						<li className="nav-item">
							<Link className="nav-link" aria-current="page" to="/sistema-pagina">Sistema</Link>
						</li>

						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Beneficios
							</a>
							<ul className="dropdown-menu fs-small">
								<li>
									<a className="dropdown-item" href="scrollspyHeading1">Pagina Web Personalizada</a>
								</li>
								<li>
									<a className="dropdown-item" href="scrollspyHeading1">Velocidad Garantizada</a>
								</li>
								<li>
									<a className="dropdown-item" href="scrollspyHeading1">Paginado de Tickets</a>
								</li>
								<li>
									<a className="dropdown-item" href="scrollspyHeading1">Página Adaptable</a>
								</li>
							</ul>
						</li>

						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Configuraciones
							</a>

							<ul className="dropdown-menu fs-small">
								<li>
									<Link to="/configuracion" >
										<a className="dropdown-item" href="#">Configuraciones</a>
									</Link>
								</li>

								<li>
									<a className="dropdown-item" href="#" >Dominio Wep Propio</a>
								</li>
								<li>
									<a className="dropdown-item" href="#">Sistema de Pagos</a>
								</li>
								<li>
									<a className="dropdown-item" href="#">Sistema de Vendedores</a>
								</li>
								<li>
									<a className="dropdown-item" href="#">Carga de Comprobante</a>
								</li>
							</ul>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-white bg-danger rounded-5 mx-2 px-3" to="/crear-rifa">Crear Rifa</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};