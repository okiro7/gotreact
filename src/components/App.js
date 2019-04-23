import React, {useState, useEffect} from 'react';
import '../App.css';
import {filter, chain, uniqBy,head} from 'lodash';
import axios from 'axios';


import Characters from './Characters';
import Loader from './Loader';

import Form from './Form';

const gotService = axios.create({baseURL: process.env.REACT_APP_API_BASE_URL, timeout: 10000});
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const App = () => {
    const [characters,setCharacters] = useState([]);
    const [search,setSearch] = useState("Jon Arryn"); 
    const [optionSearch,setOptionSearch] = useState("name");     
    console.log(process.env.REACT_APP_API_BASE_URL);
    useEffect(() => {


        const fetchData = async () => {
        const urlApi = optionSearch ==="name"? `/api/characters?name=${search}` : `/api/characters?gender=${search}&pageSize=20`;
            const characters = await  gotService.get(urlApi, {cancelToken: source.token})
            //const characters = await  gotService.get(`/api/characters?pageSize=20`, {cancelToken: source.token})
            .then( ({data}) => {
                //console.log(data);
                return  chain(data)
                .filter('name')
                .uniqBy('name')
                .value();    
            });

            const books =   Promise.all( 
                characters.map(( character ) => { 
                        const nameBooks = Promise.all( character.books.map( (book) =>{
                        const index = book.lastIndexOf("/");
                        const idBook = book.substring(index+1, book.length);
                        return gotService(`/api/books/${idBook}`, {cancelToken: source.token})
                                        .then( ({data}) => {
                                            return data.name;    
                                        })
                }));
                
                Promise.all([nameBooks]).then(values => { 
                    character.books= values[0];
                  });
                return nameBooks;

              })  
             )  
              ;

              
              const result = await Promise.all([characters,books]);

              /*Promise.all([characters]).then(values => { 
                setCharacters(values[0]);
              });*/

             // console.log(result);
      
               setCharacters(result[0]);
          };
      
          fetchData();

    }, [search]);


    const onSubmitSearch = (e) => {
        e.preventDefault();
        if(e.target.elements.optionSearch.value ==="name") {
           setSearch(e.target.elements.charactername.value);
           setCharacters([]);
        }else{
            setSearch(e.target.elements.gender.value);
            setCharacters([]);
        }    
        setOptionSearch(e.target.elements.optionSearch.value);
    }

    return (
        <div className="App">
         <Form onSubmitSearch={onSubmitSearch}></Form>
            <div className="characters-container">
           {characters.length === 0 ? <><Loader /></> : (
                <Characters characters={characters}/>
            )
           }
            </div>
        </div>
    );
}

export default App;
