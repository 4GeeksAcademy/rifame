import React, { useState } from 'react';

export const Talonario = () => {

        const generarTickets = (total) => {
      const tickets = [];
      for (let i = 0; i < total; i++) {
        tickets.push({
          numero: String(i).padStart(2, '0'),
        });
      }
      return tickets;
    };
    
    const [tickets, setTickets] = useState(() => generarTickets(1000));

    return (
            <div className="row mx-5" style={{height: '500px', overflowY: 'scroll'}}>
                <div className='col'>
                    {tickets.map((ticket) => (
                        <button
                            key={ticket.numero}
                            className="btn btn-secondary m-2"
                            style={{ width: '67px', height: '32px', fontSize: '12px', fontWeight: 'bold', borderRadius: '18px' }}
                        >
                            {ticket.numero}
                        </button>
                    ))}
                </div>
            </div>
    );
};
export default Talonario;