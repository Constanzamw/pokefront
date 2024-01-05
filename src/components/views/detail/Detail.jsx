/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* Estilos */
import style from "./Detail.module.css";
/* Dependencias */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';

/* Componentes */
import { pokemonDetail, cleanDetail } from '../../../reudx/actions/actions';


const  Detail = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  const pokemonDetailData = useSelector((state)=> state.pokemonDetail)
  //const allPokemons = useSelector((state)=> state.allPokemons)

  useEffect(()=>{
    dispatch(pokemonDetail(id));
    return ()=> dispatch(cleanDetail())
  },[dispatch,id])

  //esto lo hago porque sino me aparecen los typesjuntos!
  
  const formattedTypes = pokemonDetailData?.types 
    ? pokemonDetailData.types.join(', ') 
    : '';

    const getBackgroundClass = () => {
      return pokemonDetailData?.types?.[0]?.name ?? '';
    };
  
    const backgroundClass = getBackgroundClass();

  
    return (
      <div className={`${style.container} ${style[backgroundClass]}`}>
      <div className={style.name}>
        <h1>{pokemonDetailData?.name}</h1>
      </div>
      <div className={style.info}>
        <div className={style.image}>
          <img src={pokemonDetailData?.image} alt={pokemonDetailData?.name} />
        </div>
        <div className={style.details}>
          <div>
            <label className={style.types}> Types: </label>
            <span>{formattedTypes}</span>
          </div>
          <div>
            <label className={style.types}> HP: </label>
            <span>{pokemonDetailData?.hitPoints}</span>
          </div>
          <div>
            <label className={style.types}> Attack: </label>
            <span>{pokemonDetailData?.attack}</span>
          </div>
          <div>
            <label className={style.types}> Defense: </label>
            <span>{pokemonDetailData?.defense}</span>
          </div>
          <div>
            <label className={style.types}> Speed: </label>
            <span>{pokemonDetailData?.speed}</span>
          </div>
          <div>
            <label className={style.types}> Height: </label>
            <span>{pokemonDetailData?.height}</span>
          </div>
          <div>
            <label className={style.types}> Weight: </label>
            <span>{pokemonDetailData?.weight}</span>
          </div>
          
        </div>
        <Link to="/home">
        <button className={style.button} > Home </button>
      </Link>
      </div>
    </div>
  );
};
export default Detail;