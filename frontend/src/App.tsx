import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { gql } from '@apollo/client';
const GET_WORLD = gql`
query GetWorld {
  getWorld {
    activeangels
    allunlocks {
      idcible
      logo
      name
      ratio
      seuil
      typeratio
      unlocked
    }
    angelbonus
    angelupgrades {
      name
      logo
      seuil
      idcible
      ratio
      typeratio
      unlocked
    }
    name
    logo
    money
    score
    totalangels
    lastupdate
    products {
      id
      name
      logo
      cout
      croissance
      revenu
      vitesse
      quantite
      timeleft
      managerUnlocked
      paliers {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
    }
    upgrades {
      name
      logo
      seuil
      idcible
      ratio
      typeratio
      unlocked
    }
    managers {
      name
      logo
      seuil
      idcible
      ratio
      typeratio
      unlocked
    }
  }
}`

function App() {
  const [username, setUsername] = useState("")
  useEffect(() => {
    let pseudo= pseudodefault();
  setUsername(pseudo)}, [])
  
  return (
    <input type="text" value={username} onChange={onUserNameChanged} />
  );

function onUserNameChanged(username: ChangeEvent<HTMLInputElement>){
  setUsername(username.target.value)
  localStorage.setItem("pseudo", username.target.value);
  console.log(username.target.value)
}
function pseudodefault(): string{
    let pseudo = localStorage.getItem("pseudo")
    if (pseudo == null ) {
      pseudo = "Pilote"+ Math.floor(Math.random() * 1000)
      localStorage.setItem("pseudo", pseudo);
    }
    return pseudo
}}
export default App;
