/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
//import style from'./select.module.css';

const Select = ({values, onChange, name})=>{
    return(
        <div >
        <label htmlFor={name} >
          Sort by:
        </label>
        <select
          key={name}
          name={name}
          onChange={onChange}
          id={name}
        >
          {values.map(value => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default Select;