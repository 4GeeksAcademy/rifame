import React, { useState } from 'react';
import Talonario from '../components/Talonario';


export const ComprarTicket = () => {
    

    return (
        <div>
            <div className="container mt-5 col-7" style={{ borderRadius: '18px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                <h1 className="text-center text-danger text-bold" style={{fontSize:"60px"}} >Lista de Ticket</h1>

                <Talonario />

                <div className="text-center my-4 ">
                    <button className="btn btn-outline-danger btn-lg px-5">
                        Comprar Ticket
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ComprarTicket;