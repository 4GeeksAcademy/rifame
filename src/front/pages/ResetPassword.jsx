import { Link } from "react-router-dom";


export const ResetPassword = () => {
    return (
        <div>
            <div className="container mt-5">
                <button type="button" className="btn btn-link mb-3 d-flex">
                    <Link to="/login" className="text-danger fs-3"><i className="fa-solid fa-angle-left"></i></Link>
                </button>
                <h1 className="text-center text-danger text-bold" style={{fontSize:"60px"}} >Restablecer Contraseña</h1>
                <form className="mt-4 col-6 m-auto">
                    <div className="mb-3">
                        <label htmlFor="emailReset" className="form-label">Email</label>
                        <input type="email" className="form-control" id="emailReset" placeholder="Ingrese su email" />
                    </div>
                    <button type="submit" className="btn btn-danger m-auto d-flex rounded-5">Enviar Instrucciones</button>
                </form>
            </div>      
        </div>
    );
};
export default ResetPassword;