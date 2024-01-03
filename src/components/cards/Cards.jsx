/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* Estilos */
import './Cards.module.css';

/*Dependencias */
//import { UseLocation, Route, Routes  } from "react-router-dom"
/*Componentes */
import Card from "../card/Card"

const Cards = ({allPokemons}) => {
console.log(allPokemons, "hhh")
  return (
    <div >
    
      <div>
      {
        
        allPokemons.map((pokemon)=>{ // iamgen nombre tipos
        
          return(
            <Card 
              key={pokemon?.id}
              id={pokemon?.id}
              name={pokemon?.name}
              image={pokemon?.image} 
              types={pokemon?.types}
              attack={pokemon?.attack}
              defense={pokemon?.defense}
              speed={pokemon?.speed}
              hp={pokemon?.hitPoints}
            />
          )
        })
      }
      </div>
      
    </div>
  );
}

export default Cards;

