import { Link } from "react-router-dom";

export const Login = () => {
    return (
        <div>
            <div className="container mt-5 px-3 px-sm-4">
                <button type="button" className="btn btn-link mb-3 d-flex p-0">
                    <Link to="/" className="text-danger fs-3"><i className="fa-solid fa-angle-left"></i></Link>
                </button>
                <h1 className="text-center text-danger text-bold" style={{fontSize: "clamp(30px, 5vw, 60px)"}}>Login</h1>
                <form className="mt-4 mx-auto" style={{maxWidth: "500px"}}>
                    <div className="mb-3">
                        <label htmlFor="emailLogin" className="form-label">Email</label>
                        <input type="email" className="form-control" id="emailLogin" placeholder="Ingrese su email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordLogin" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="passwordLogin" placeholder="Ingrese su contraseña" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-danger w-100 w-sm-auto px-5 rounded-5">Iniciar Sesión</button>
                    </div>
                    <button type="button" className="btn btn-link mt-3 d-flex mx-auto p-0">
                        <Link to="/reset-password" className="text-danger">¿Olvidaste tu contraseña?</Link>
                    </button>
                </form>
            </div>      
            <div className="mt-3">
                <p className="text-center mt-3">¿No tienes una cuenta? <Link to="/registro-usuario" className="text-danger">Regístrate aquí</Link></p>
            </div>
        </div>
    );
};

export default Login;