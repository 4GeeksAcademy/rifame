import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {
	const navigate = useNavigate();
	const { user, isAuthenticated, logout } = useAuth();

	//NO UTILIZAR!!!!
	const handleLinkClick = () => {
		const navbarCollapse = document.getElementById('navbarSupportedContent');
		const navbarToggler = document.querySelector('.navbar-toggler');

		if (navbarCollapse && navbarCollapse.classList.contains('show')) {
			navbarToggler?.click();
		}
	};

	const handleLogout = () => {
		logout();
		handleLinkClick();
		navigate("/");
	};

	// Debug: Ver el estado actual
	console.log("Navbar - isAuthenticated:", isAuthenticated);
	console.log("Navbar - user:", user);

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid px-3 px-md-4">
				<Link to="/" className="d-flex align-items-center text-decoration-none">
					<img
						src="src/front/assets/img/MagicEraser_260125_114439.PNG"
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
						{!user && (
							<>
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										Inicio
									</a>
									<ul className="dropdown-menu">
										<li>
											<a className="dropdown-item" href="#scrollspyHeading1" onClick={handleLinkClick}>Acerca de RIFAME</a>
										</li>
										<li>
											<a className="dropdown-item" href="#scrollspyHeading2" onClick={handleLinkClick}>Bienvenidos</a>
										</li>
										<li>
											<a className="dropdown-item" href="#scrollspyHeading3" onClick={handleLinkClick}>Plataforma Completa</a>
										</li>
										<li>
											<a className="dropdown-item" href="#scrollspyHeading4" onClick={handleLinkClick}>Promociones</a>
										</li>
									</ul>
								</li>
								<li className="nav-item">
									<Link className="nav-link" aria-current="page" to="/sistema-pagina" onClick={handleLinkClick}>
										Sistema
									</Link>
								</li>
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										Beneficios
									</a>
									<ul className="dropdown-menu">
										<li>
											<a className="dropdown-item" href="#scrollspyHeading1" onClick={handleLinkClick}>Pagina Web Personalizada</a>
										</li>
										<li>
											<a className="dropdown-item" href="#scrollspyHeading1" onClick={handleLinkClick}>Velocidad Garantizada</a>
										</li>
										<li>
											<a className="dropdown-item" href="#scrollspyHeading1" onClick={handleLinkClick}>Paginado de Tickets</a>
										</li>
										<li>
											<a className="dropdown-item" href="#scrollspyHeading1" onClick={handleLinkClick}>Página Adaptable</a>
										</li>
									</ul>
								</li>
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										Configuraciones
									</a>
									<ul className="dropdown-menu">
										<li>
											<Link to="/configuracion" className="dropdown-item" onClick={handleLinkClick}>
												Configuraciones
											</Link>
										</li>
										<li>
											<a className="dropdown-item" href="#" onClick={handleLinkClick}>Dominio Web Propio</a>
										</li>
										<li>
											<a className="dropdown-item" href="#" onClick={handleLinkClick}>Sistema de Pagos</a>
										</li>
										<li>
											<a className="dropdown-item" href="#" onClick={handleLinkClick}>Sistema de Vendedores</a>
										</li>
										<li>
											<a className="dropdown-item" href="#" onClick={handleLinkClick}>Carga de Comprobante</a>
										</li>
									</ul>
								</li>
								<li className="nav-item">
									<Link 
										className="nav-link text-white bg-danger rounded-5 mx-lg-2 px-3 mt-2 mt-lg-0 text-center" 
										to="/login" 
										onClick={handleLinkClick}
									>
										Iniciar Sesión
									</Link>
								</li>
							</>
						)}

						{/* MENÚ CUANDO ESTÁ AUTENTICADO */}
						{user && (
							<>
								{/* Dashboard */}
								<li className="nav-item">
									<Link className="nav-link" to="/dashboard" onClick={handleLinkClick}>
										<i className="fa-solid fa-house me-1"></i>
										Inicio
									</Link>
								</li>

								{/* Mis Rifas */}
								<li className="nav-item">
									<Link className="nav-link" to="/mis-rifas" onClick={handleLinkClick}>
										<i className="fa-solid fa-ticket me-1"></i>
										Mis Rifas
									</Link>
								</li>

								{/* Pagos */}
								<li className="nav-item">
									<Link className="nav-link" to="/pagos" onClick={handleLinkClick}>
										<i className="fa-solid fa-money-bill me-1"></i>
										Pagos
									</Link>
								</li>

								{/* Crear Rifa */}
								<li className="nav-item">
									<Link 
										className="nav-link text-white bg-danger rounded-5 mx-lg-2 px-3 mt-2 mt-lg-0 text-center" 
										to="/crear-rifa" 
										onClick={handleLinkClick}
									>
										<i className="fa-solid fa-plus me-1"></i>
										Crear Rifa
									</Link>
								</li>

								{/* Menú de Usuario */}
								<li className="nav-item dropdown">
									<a 
										className="nav-link dropdown-toggle d-flex align-items-center" 
										href="#" 
										role="button" 
										data-bs-toggle="dropdown" 
										aria-expanded="false"
									>
										<i className="fa-solid fa-user-circle me-2"></i>
										{user?.nombre || "Usuario"}
									</a>
									<ul className="dropdown-menu dropdown-menu-end">
										<li>
											<div className="dropdown-item-text">
												<strong>{user?.nombre} {user?.apellido}</strong>
												<br />
												<small className="text-muted">{user?.email}</small>
											</div>
										</li>
										<li><hr className="dropdown-divider" /></li>
										<li>
											<Link to="/perfil" className="dropdown-item" onClick={handleLinkClick}>
												<i className="fa-solid fa-user me-2"></i>Mi Perfil
											</Link>
										</li>
										<li>
											<Link to="/configuracion" className="dropdown-item" onClick={handleLinkClick}>
												<i className="fa-solid fa-gear me-2"></i>Configuración
											</Link>
										</li>
										{user?.admin && (
											<>
												<li><hr className="dropdown-divider" /></li>
												<li>
													<Link to="/admin" className="dropdown-item text-danger" onClick={handleLinkClick}>
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