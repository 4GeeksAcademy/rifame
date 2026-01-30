import { Link } from "react-router-dom";

const RegistrodeUsuario = () => {
    return (
        <div>
            <div className="container mt-5">
                <h1 className="text-center text-danger text-bold" style={{fontSize:"60px"}} >Registro de Usuario</h1>
                <form className="mx-auto col-6 mt-4">
                    <div className="mb-3 row">
                        <div className="col">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" name="nombre" required/>
                        <div className="invalid-feedback">Por favor ingresa tu nombre.</div>
                        </div>
                        <div className="col">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input type="text" className="form-control" id="apellido" name="apellido" required/>
                            <div className="invalid-feedback">Por favor ingresa tu apellido.</div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" required/>
                        <div className="invalid-feedback">Por favor ingresa un correo electrónico válido.</div>
                    </div>
                    <div>
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input type="tel" className="form-control" id="telefono" name="telefono" required/>
                        <div className="invalid-feedback">Por favor ingresa tu número de teléfono.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="password" name="password" required/>
                        <div className="invalid-feedback">Por favor ingresa una contraseña.</div>
                    </div>
                    <div>
                        <label htmlFor="confirmarPassword" className="form-label">Confirmar Contraseña</label>
                        <input type="password" className="form-control" id="confirmarPassword" name="confirmarPassword" required/>
                        <div className="invalid-feedback">Las contraseñas no coinciden.</div>
                    </div>
                    <div className="mb-3 form-check mt-3">
                        <input type="checkbox" id="terminos" name="terminos" className="me-2" required />
                        <label htmlFor="terminos" className="form-label">Acepto los términos y condiciones</label>
                        <div className="invalid-feedback">Debes aceptar los términos y condiciones.</div>
                    </div>
                    <button className="btn btn-danger d-flex mx-auto" type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
}

export default RegistrodeUsuario;