import { Link } from "react-router-dom";

export const Login = () => {
    return (
        <div>
            <div className="container mt-5">
                <button type="button" className="btn btn-link mb-3 d-flex">
                    <Link to="/" className="text-danger fs-3"><i className="fa-solid fa-angle-left"></i></Link>
                </button>
                <h1 className="text-center text-danger text-bold" style={{fontSize:"60px"}} >Login</h1>
                <form className="mt-4 col-6 m-auto">
                    <div className="mb-3">
                        <label htmlFor="emailLogin" className="form-label">Email</label>
                        <input type="email" className="form-control" id="emailLogin" placeholder="Ingrese su email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordLogin" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="passwordLogin" placeholder="Ingrese su contraseña" />
                    </div>
                    <button type="submit" className="btn btn-danger m-auto d-flex rounded-5">Iniciar Sesión</button>
                    <button type="button" className="btn btn-link mt-3 d-flex mx-auto">
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