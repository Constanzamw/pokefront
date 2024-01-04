/* eslint-disable react/prop-types */

const CardPreview = ({ name, hitPoints, attack, defense, speed, height, weight, types, image }) => {
  return (
    <div>
      <h2>{name}</h2>
      <div>
        <img src={image} alt="Preview" />
        <div>
          
          <p>HitPoints: {hitPoints}</p>
          <p>Attack: {attack}</p>
          <p>Defense: {defense}</p>
          <p>Speed: {speed}</p>
          <p>Height: {height}</p>
          <p>Weight: {weight}</p>
          <p>Types: {types.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;