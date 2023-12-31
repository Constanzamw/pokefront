/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* Dependencias */
import apiUrl from "../../../routeconnection"
import axios from "axios"

/* Componentes */
import { CLEAN_DETAIL, GET_POKEMONS, GET_POKENAME, GET_TYPES,POKEMON_DETAIL, FILTER_POKEMON,CREATE_POKEMON, CREATE_IMAGE, FILTER_ATTACK, SET_ORIGIN_DB,SET_ORIGIN_API,SET_ORIGIN , ORDER_AZ, FILTER_TYPES, CLEAR_TYPES, CLEAR_SEARCH, ORDER_FN, CREATE_USER_SUCCESS, CREATE_USER_FAILURE, LOG_IN_FAILURE, LOG_IN_SUCCESS, LOG_OUT,ORDER_ATT  } from "./action-types";

//const apiUrl = process.env.DEPLOY || 'http://localhost:3001'; // DOTENV ES SOLO PARA BACKEND!!


export const getPokemons = () => {
    return async function(dispatch){
      
        let {data} = await axios(`${apiUrl}/`);
        
        return dispatch({type: GET_POKEMONS , payload: data})
    }
}

export const getPokename = (name)=>{
    return async function (dispatch){
        try {
            let {data} = await axios(`${apiUrl}/search?name=${name}`)
           
            return dispatch ({ type: GET_POKENAME, payload:data})
            
        } catch (error) {
            alert("Pokemon does not exist")
        }
    }
}

export const pokemonDetail = (id) => {
    return async function (dispatch){
        let {data} = await axios(`${apiUrl}/${id}`)

        return dispatch({ type: POKEMON_DETAIL, payload: data})
    }
}

export const cleanDetail = ()=>{
    return {type: CLEAN_DETAIL}
}

export const getTypes =()=>{
    return async function (dispatch){
        let {data} = await axios(`${apiUrl}/types`)

        return dispatch ({ type: GET_TYPES, payload: data})
    }
}

export const filterTypes = (selectedType) =>{
    return async (dispatch)=>{
        try {
            const {data} = await axios(`${apiUrl}/`)
          
              if(selectedType === "all"){
                
                  return dispatch ({ type: FILTER_TYPES, payload: data})
              } else{

                  const pokeFiltered =  data.filter((pokemon)=> pokemon.types.includes(selectedType))
                  
                   const holas= dispatch ({ type: FILTER_TYPES, payload: pokeFiltered})
                   return holas
              }
              
            
        } catch (error) {
            console.log(error)
          }
    }
}

export const filterPokemon = (filterOptions) => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`${apiUrl}/`);
        let filteredPokemon = response.data;
  
        const { type, minAttack, maxAttack, origin } = filterOptions;
  
        // Filtrar por tipo solo si se selecciona un tipo (type !== "all")
        if (type !== "all") {
          filteredPokemon = filteredPokemon.filter((pokemon) =>
            pokemon.types.includes(type)
          );
        }
  
        // Filtrar por rango de ataque
        if (minAttack !== "" && maxAttack !== "") {
          filteredPokemon = filteredPokemon.filter((pokemon) => {
            const attack = pokemon.attack;
            return attack >= parseInt(minAttack) && attack <= parseInt(maxAttack);
          });
        }
  
        // Filtrar por origen (DB o API)
        if (origin === "Database") {
          filteredPokemon = filteredPokemon.filter((pokemon) =>
            isNaN(pokemon.id)
          );
        } else if (origin === "Api") {
          filteredPokemon = filteredPokemon.filter((pokemon) =>
            !isNaN(pokemon.id)
          );
        }
  
        dispatch({ type: FILTER_POKEMON, payload: filteredPokemon });
      } catch (error) {
        console.error("Filter failed", error);
      }
    };
  };

export const clearTypes = () => {
    return {type:CLEAR_TYPES}
};

export const orderAz = (sortType)=>{ 
     return ({ type: ORDER_AZ, payload: sortType})
}

export const orderFn =()=>{
    return ({type: ORDER_FN})
}

export const filterAttack = (minAttack, maxAttack)=>{
    return async function(dispatch){
        const response = await axios.get(`${apiUrl}/`);
        const allPokemon = response.data;

        const filteredPokemon = allPokemon.filter((pokemon) => {
            const attack = pokemon.attack;
        return attack >= minAttack && attack <= maxAttack;
         });
    dispatch({ type: FILTER_ATTACK, payload: filteredPokemon });
    }
}

export const orderAtt = (sortAttack)=>{
    return ({ type: ORDER_ATT, payload: sortAttack})
}

//BE: router.post("/create", postPokemonHandler)
export const createPokemon = (formData) => {
    
    return async function (dispatch) {
      const { data } = await axios.post(`${apiUrl}/create`, formData);
      
      return dispatch({ type: CREATE_POKEMON, payload: data });
    };
  }

export const createImage = ()=>{
    return async function(dispatch){
        const {data} = await axios.get(`${apiUrl}/image`)

        return dispatch({ type: CREATE_IMAGE, payload:data})
    }
}

export const clearSearch = () => {
    return {type:CLEAR_SEARCH}
};

export const filterOrigin = (origin) => {
    
    return async function (dispatch) {
      try {
        const response = await axios(`${apiUrl}/`)
        const allOrigin = response.data

    
        let originType = [];
        for(let item of allOrigin){
            originType.push(item)
        }
        //console.log(originType)
        if(origin==="Database"){
            const filteredPokemons = originType.filter(origin => isNaN(origin.id));
            return dispatch({ type: SET_ORIGIN_DB, payload: filteredPokemons })
        }
        if(origin === "Api"){
            const filteredPokemons = originType.filter(origin => !isNaN(origin.id));
            return dispatch({ type: SET_ORIGIN_API, payload: filteredPokemons })
        }

       return dispatch({ type: SET_ORIGIN, payload: originType })

      } catch (error) {
        console.error('Filter failed', error);
      }
    };
  };

export const createUser= (userData) => {
    const { email, password } = userData;
    return async function(dispatch){
        try {
            const { data } = await axios.post(`${apiUrl}/createUser`, { email, password });
            return dispatch({ type: CREATE_USER_SUCCESS, payload: data });
          } catch (error) {
            return dispatch({ type: CREATE_USER_FAILURE, payload: error.response.data.errorMessage });
          }  

    }
}

export const login = (userData)=>{
    const { email, password } = userData;
    return async function(dispatch){
        try {
            
            const { data } = await axios.post(`${apiUrl}/login`, { email, password });
            
            dispatch({ type: LOG_IN_SUCCESS, payload: data });
          } catch (error) {
            dispatch({ type: LOG_IN_FAILURE, payload: error.response.data.errorMessage });
          }

    }
}

export const logOut = () => {
    return {type: LOG_OUT }
};


// export const fetchPokemons = () => {
//   return async (dispatch) => {
//     dispatch(fetchRequest());

//     try {
//       const response = await axios.get(`http://localhost:3001/pokemons`);
//       dispatch(fetchSuccess(response.data));
//     } catch (error) {
//       dispatch(fetchFail(error.message));
//     }
//   };
// };

// export const fetchTypes = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`http://localhost:3001/pokemons/type`);
//       const types = response.data.map((typeObj) => typeObj.name);
//       dispatch(setTypes(types));
//     } catch (error) {
//       console.error("Error fetching types:", error);
//     }
//   };
// };