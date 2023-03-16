import React, { useState } from 'react';
import "./Manager.css"
import { World, Pallier } from './world'
import { Snackbar } from '@material-ui/core';
import { gql, useMutation} from '@apollo/client';
import { transform } from "./utils";

const ENGAGER_MANAGER = gql`
mutation engagerManager($name: String!) {
engagerManager(name: $name) {
name
}
}`
type ManagerProps = {
    world: World
    money : number
    username : string
    showManagers: ()=>void
    buyManagerToScore: (manager:Pallier,res: number)=>void
    }
function Manager(this: any, { username, world, money, showManagers,buyManagerToScore} : ManagerProps){
    const[open, setOpen] = useState(false);
    const[message, setMessage] = useState("");
    const [engagerManager] = useMutation(ENGAGER_MANAGER,
        { context: { headers: { "x-user": username }},
        onError: (error): void => {
        // actions en cas d'erreur
        }
        })
    return(<div className="modal">
      
    <h1 className="title">Managers make you feel better !</h1>
    <div className="allmanagers">{world.managers.filter( manager => !manager.unlocked).map(manager =><div className="amanager" key={manager.idcible}>
    <img alt="manager logo" className="managerimage" src={"http://localhost:4000/"+ manager.logo }/> 
    <div className="nameandproduct">
    <div className="name"> { manager.name} </div>
    <div className="product"> {nomProduitOfManager(manager)}</div>
    </div>
    <div className="managercost"> Prix :{ <span dangerouslySetInnerHTML={{ __html: transform(Math.round(manager.seuil * 100) / 100) }}/>}$  </div> 
   
    <div  onClick= {()=>hireManager(manager)}>  
    <button className="embaucher" disabled={money < manager.seuil}>
    Hire !</button>
    <Snackbar
        message={message}
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
      /></div> </div> 
      )}</div>
    <img onClick={fermermanager} src={"http://localhost:4000/icones/croix.png"} className="laCroix"/>
</div>)
function fermermanager(){
  showManagers()
}

function hireManager(manager : Pallier){
    if(money >= manager.seuil){
        engagerManager({variables: {name: manager.name}})
        buyManagerToScore(manager,manager.seuil)
        setMessage("Le manager "+manager.name +" a été embauché !")
        setOpen(true)
    }
}
function nomProduitOfManager(manager : Pallier){
    let nomProduit =""
    world.products.forEach(product => {
        if(product.id === manager.idcible){
            nomProduit = product.name        }
    })
    return nomProduit
    }
}
 export default Manager;