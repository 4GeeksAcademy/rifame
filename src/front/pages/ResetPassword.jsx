import { Link } from "react-router-dom";

export const ResetPassword = () => {
    return (
        <div>
            <div className="container mt-5 px-3 px-sm-4">
                <button type="button" className="btn btn-link mb-3 d-flex p-0">
                    <Link to="/login" className="text-danger fs-3"><i className="fa-solid fa-angle-left"></i></Link>
                </button>
                <h1 className="text-center text-danger text-bold" style={{fontSize: "clamp(28px, 5vw, 60px)"}}>Restablecer Contraseña</h1>
                <form className="mt-4 mx-auto" style={{maxWidth: "500px"}}>
                    <div className="mb-3">
                        <label htmlFor="emailReset" className="form-label">Email</label>
                        <input type="email" className="form-control" id="emailReset" placeholder="Ingrese su email" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-danger w-100 w-sm-auto px-4 px-md-5 rounded-5">Enviar Instrucciones</button>
                    </div>
                </form>
            </div>      
        </div>
    );
};

export default ResetPassword;