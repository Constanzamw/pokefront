/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* Estilos */
import style from "./Home.module.css";
//import pokemonStadium from "../../../assets/pokemonStadium.png"
/*Dependencias */
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux"
/*Componentes */
import Nav from "../../nav/Nav";
//import Paginado from "../../paginado/Paginado";
import { getPokemons } from "../../../reudx/actions/actions";
//import { all } from "axios";
import Paginate from "../../paginado/Paginate";
import running from "../../../assets/running.gif";


const  Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  let allPokemons = useSelector((state)=>state.allPokemons)
  const filterPokemons = useSelector((state) => state.filterPokemon);
    //console.log(allPokemons,"fg")
    useEffect(()=>{
      if(!allPokemons.length){
        dispatch(getPokemons())
      }
    },[dispatch,allPokemons])

    if (loading) {
      return (
        <div className={style.loadingContainer}>
          <img src={running} alt="Loading..." />
        </div>
      );
    }

  return (
    <div className={style.background}>
      
      <div className={style.container}>
        
        <Paginate />
      </div>
    </div>
  );
}

export default Home;

