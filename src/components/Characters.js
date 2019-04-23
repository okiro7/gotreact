import React from 'react';
import styled, {ThemeProvider, css} from 'styled-components';
import jsonCharacters from '../got.json';
import {filter, head, chain, compact} from 'lodash';

const Character = styled.div `
                        border-radius:10px;
                        box-shadow: 0px 5px 20px rgb(71,71,71);
                        margin:20px;
                        display:flex;
                        flex-direction:column;
                        background: white;
                        align-items:center;
                        min-width: 20%;
                    `;

const CharacterInfo = styled.h3 `
                      margin:5px 0px 5px 0px;
                      padding:0px 0px 0px 0px;
                    `;

const CharacterImg = styled.img `
                      border-radius:50px;
                      width:100px;
                      height:100px;
                      margin:15px 0px 10px 0px;
                      padding:0px 0px 0px 0px;
                    `;

const male = {
    color: "#3b5998"
};
const female = {
    color: "#ec8ce7"
}

const getColor = (name) => {
    if (name === 'Male') 
        return male;
    if (name === 'Female') 
        return female;
    }

const GenderIcon = styled.i `
   font-size: 1.5rem;
   color: ${props => props.theme.color};
  `;
const Characters = ({characters}) => {
    return (characters.map((character, index) => {
        const ch = chain(jsonCharacters)
            .filter(v => v.characterImageFull !== "")
            .filter({characterName: character.name})
            .head()
            .value();

        const imgsrc = ch === undefined
            ? (character.gender ==='Male'?'http://watchersonthewall.com/wp-content/uploads/2016/02/js.jpg':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMoINsNPhV1sw5DkSkyjFDnKYeQrPCOZ5A8zc6WMga8c9a517AtA')
            : ch.characterImageFull;

        return (
            <Character key={character.name + index}>
                <CharacterImg src={imgsrc} alt=""/>
                <CharacterInfo>{character.name}</CharacterInfo>
                <ThemeProvider theme={getColor(character.gender)}>
                    <GenderIcon
                        className={`fa fa-${character
                        .gender
                        .toLowerCase()}`}/>
                </ThemeProvider>
                <ol>
                    {character
                        .books
                        .map((book, index) => {
                            return (
                                <li key={book + index}>{book}</li>
                            )
                        })}
                </ol>
            </Character>
        )
    }));

};

export default Characters;