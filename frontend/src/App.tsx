import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main';
import {transform} from "./utils";
import { gql, useApolloClient, useQuery } from '@apollo/client';
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
  const client = useApolloClient();


  const { loading, error, data, refetch } = useQuery(GET_WORLD, {
    context: { headers: { "x-user": username } }
  });

  useEffect(() => {
    let pseudo = pseudodefault();
    setUsername(pseudo)
  }, [])

  let corps = undefined
  if (loading) corps = <div> Loading... </div>
  else if (error) corps = <div> Erreur de chargement du monde ! </div>
  else corps = <Main loadworld={data.getWorld} username={username} />
  return (
   
    <div >
      <div className="joueur"><div > Your ID :</div>
      <input type="text" value={username} onChange={onUserNameChanged} /></div>
     {corps} 
      
    </div>
   
  )
  
  function onUserNameChanged(username: ChangeEvent<HTMLInputElement>) {
    setUsername(username.target.value)
    localStorage.setItem("pseudo", username.target.value);
    console.log(username.target.value)
    client.resetStore()
  }
  
  function pseudodefault(): string {
    let pseudo = localStorage.getItem("pseudo")
    if (pseudo == null) {
      pseudo = "Pilote" + Math.floor(Math.random() * 1000)
      localStorage.setItem("pseudo", pseudo);
      client.resetStore()
    }
    return pseudo
  }
}
export default App;
