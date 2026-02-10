export const initialStore = () => {
  return {

    user: JSON.parse(localStorage.getItem("user")) || null,

    token: localStorage.getItem("token") || null,
    
    rifas: [],

    tickets: [],

    compras: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type) {
    
    // ACCIONES DE AUTENTICACIÓN
    
    case 'login':
      // Guardar en localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      
      return {
        ...store,
        user: action.payload.user,
        token: action.payload.token
      };
    
    case 'logout':
      // Limpiar localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      return {
        ...store,
        user: null,
        token: null
      };
    
    case 'update_user':

    // Actualizar usuario en localStorage

      localStorage.setItem("user", JSON.stringify(action.payload));
      
      return {
        ...store,
        user: action.payload
      };
    
    // ACCIONES DE RIFAS

    case 'set_rifas':
      return {
        ...store,
        rifas: action.payload
      };
    
    case 'add_rifa':
      return {
        ...store,
        rifas: [...store.rifas, action.payload]
      };
    
    case 'delete_rifa':
      return {
        ...store,
        rifas: store.rifas.filter(rifa => rifa.id !== action.payload)
      };
    
    case 'update_rifa':
      return {
        ...store,
        rifas: store.rifas.map(rifa => 
          rifa.id === action.payload.id ? action.payload : rifa
        )
      };
    
    // ACCIONES DE COMPRAS/PAGOS
    
    case 'set_compras':
      return {
        ...store,
        compras: action.payload
      };
    
    case 'update_compra':
      return {
        ...store,
        compras: store.compras.map(compra =>
          compra.id === action.payload.id ? action.payload : compra
        )
      };
        
    default:
      throw Error('Unknown action: ' + action.type);
  }
}