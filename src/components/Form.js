import React, {useState} from 'react'
import '../App.css';
const Form = ({onSubmitSearch}) => {
    const [optionSearch,setOptionSearch] = useState("name");
    const [radioGender,setradioGender] = useState("");    

    const onHandleSelect = (e) => {
        e.preventDefault();
        setOptionSearch(e.target.value);
    }

    return (
        <form className="search-form" onSubmit={onSubmitSearch}>
            <label>
                <select
                    id="optionSearch"
                    className="search-select"
                    value={optionSearch}
                    onChange={onHandleSelect}>
                    <option value="name">Nombre</option>
                    <option defaultValue value="sex">Sexo</option>
                </select>
            </label>
            {optionSearch === "sex" 
              ? (
              <div className="search-radio">
                <label>
                    <input type="radio" id="gender" value="Male"   checked={radioGender === 'Male'} onChange={e => setradioGender(e.target.value)} />
                    Male
                </label>
                <label>
                    <input type="radio" id="gender" value="Female" checked={radioGender === 'Female'}  onChange={e => setradioGender(e.target.value)} />
                    Female
                </label>
            </div>)
             : (<input className="search-input" id="charactername" type="text"/>)
            }
            <button className="search-button" type="submit">Search</button>   
        </form>
    );

}

export default Form;