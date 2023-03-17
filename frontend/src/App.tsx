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
  const [username, setUsername] = useState(localStorage.getItem('username') || `Pilote${Math.floor(Math.random()*1000)}`);
  const client = useApolloClient();
  const onUserNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("username", event.currentTarget.value);
    setUsername(event.currentTarget.value);
    //Quand le nom d'utilisateur change --> forcer le client à refabriquer la requête.
    client.resetStore();
};

  const { loading, error, data, refetch } = useQuery(GET_WORLD, {
    context: { headers: { "x-user": username } }
  });



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
  

}
export default App;
