import { Link, useNavigate } from "react-router-dom";
import  useGlobalReducer from "../hooks/useGlobalReducer";
import { logout } from "../actions.js";

export const Navbar = () => {

	const navigate = useNavigate();

	const { store, dispatch } = useGlobalReducer();

	const handleLogout = () => {
		logout(dispatch);
		navigate("/");
	};

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid px-3 px-md-4">
				<Link to="/" className="d-flex align-items-center text-decoration-none">
					<img
						src="https://res.cloudinary.com/dkkkjhhgl/image/upload/v1770357996/MagicEraser_260125_114439_dp3yik.png"
						alt="Logo"
						width="40"
						height="40"
						className="d-inline-block"
					/>
					<h1
						className="navbar-brand mb-0 ms-2"
						style={{ fontSize: "clamp(24px, 4vw, 40px)", color: "#000000" }}
					>
						Rifame<span className="text-danger" style={{ color: "#d90429" }}>.</span>
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
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-6 fs-lg-5">
						{/* MENÚ CUANDO NO ESTÁ AUTENTICADO */}
						{!store.user && (
							<>
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										Inicio
									</a>
									<ul className="dropdown-menu">
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
									<Link className="nav-link" to="/sistema-pagina">
										Sistema
									</Link>
								</li>
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										Beneficios
									</a>
									<ul className="dropdown-menu">
										<li>
											<a className="dropdown-item" href="#scrollspyHeading1">Pagina Web Personalizada</a>
										</li>
										<li>
											<a className="dropdown-item" href="#scrollspyHeading1">Velocidad Garantizada</a>
										</li>
										<li>
											<a className="dropdown-item" href="#scrollspyHeading1">Paginado de Tickets</a>
										</li>
										<li>
											<a className="dropdown-item" href="#scrollspyHeading1">Página Adaptable</a>
										</li>
									</ul>
								</li>
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										Configuraciones
									</a>
									<ul className="dropdown-menu">
										<li>
											<Link to="/configuracion" className="dropdown-item">
												Configuraciones
											</Link>
										</li>
										<li>
											<a className="dropdown-item" href="#">Dominio Web Propio</a>
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
									<Link 
										className="nav-link text-white bg-danger rounded-5 mx-lg-2 px-3 mt-2 mt-lg-0 text-center" 
										to="/login"
									>
										Iniciar Sesión
									</Link>
								</li>
							</>
						)}

						{/* MENÚ CUANDO ESTÁ AUTENTICADO */}
						{store.user && (
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/dashboard">
										<i className="fa-solid fa-house me-1"></i>
										Inicio
									</Link>
								</li>

								<li className="nav-item">
									<Link className="nav-link" to="/mis-rifas">
										<i className="fa-solid fa-ticket me-1"></i>
										Mis Rifas
									</Link>
								</li>

								<li className="nav-item">
									<Link className="nav-link" to="/pagos">
										<i className="fa-solid fa-money-bill me-1"></i>
										Pagos
									</Link>
								</li>

								<li className="nav-item">
									<Link 
										className="nav-link text-white bg-danger rounded-5 mx-lg-2 px-3 mt-2 mt-lg-0 text-center" 
										to="/crear-rifa"
									>
										<i className="fa-solid fa-plus me-1"></i>
										Crear Rifa
									</Link>
								</li>

								<li className="nav-item dropdown">
									<a 
										className="nav-link dropdown-toggle d-flex align-items-center" 
										href="#" 
										role="button" 
										data-bs-toggle="dropdown" 
										aria-expanded="false"
									>
										<i className="fa-solid fa-user-circle me-2"></i>
										{store.user?.nombre || "Usuario"}
									</a>
									<ul className="dropdown-menu dropdown-menu-end">
										<li>
											<div className="dropdown-item-text">
												<strong>{store.user?.nombre} {store.user?.apellido}</strong>
												<br />
												<small className="text-muted">{store.user?.email}</small>
											</div>
										</li>
										<li><hr className="dropdown-divider" /></li>
										<li>
											<Link to="/perfil" className="dropdown-item">
												<i className="fa-solid fa-user me-2"></i>Mi Perfil
											</Link>
										</li>
										{store.user?.admin && (
											<>
												<li><hr className="dropdown-divider" /></li>
												<li>
													<Link to="/admin" className="dropdown-item text-danger">
														<i className="fa-solid fa-shield-halved me-2"></i>Panel Admin
													</Link>
												</li>
											</>
										)}
										<li><hr className="dropdown-divider" /></li>
										<li>
											<button 
												className="dropdown-item text-danger" 
												onClick={handleLogout}
											>
												<i className="fa-solid fa-right-from-bracket me-2"></i>Cerrar Sesión
											</button>
										</li>
									</ul>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};