import React, { useState } from 'react';
import "./AngelsUpgrades.css"
import { World, Pallier } from './world'
import { Snackbar } from '@material-ui/core';
import { gql, useMutation} from '@apollo/client';
import { transform } from "./utils";

const ANGELUPGRADE = gql`
mutation acheterAngelUpgrade($name: String!) {
acheterAngelUpgrade(name: $name) {
name
}
}`
type AngelUpgradeProps = {
    world: World
    money : number
    username : string
    showAngelUpgrade: ()=>void
    buyAngelUpgradeToScore: (manager:Pallier,res: number)=>void
    }
function AngelsUpgrades(this: any, { username, world, money, showAngelUpgrade,buyAngelUpgradeToScore} : AngelUpgradeProps){
    const[open, setOpen] = useState(false);
    const[message, setMessage] = useState("");
    const [buyupgrade] = useMutation(ANGELUPGRADE,
        { context: { headers: { "x-user": username }},
        onError: (error): void => {
        // actions en cas d'erreur
        }
        })
    return(<div className="modale2">
      
    <h1 className="title2">Upgrades Angels make you feel better !</h1>
    <div className="allangelsu">{world.angelupgrades.filter( ange => !ange.unlocked).map(ange =><div className="anangelu" key={ange.idcible}>
    <img alt="upgrade angel image" className="angeluimage" src={"http://localhost:4000/"+ ange.logo }/> 
    <div className="name2"> { ange.name} </div>
    <div className="couteteffect1">
    <div className="angelcost"> Prix :{ <span dangerouslySetInnerHTML={{ __html: transform(Math.round(ange.seuil * 100) / 100) }}/>} anges  </div> 
    <div className="effect1">{ange.typeratio} X {ange.ratio}</div> </div>
    <div  >  
    <button onClick= {()=>takeAngelUpgrade(ange)} className="angeltake" disabled={world.activeangels < ange.seuil}>
    Buy !</button>
    <Snackbar
        message={message}
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
      /></div> </div> 
      )}</div>
    <img onClick={fermerAngelupgrade} src={"http://localhost:4000/icones/croix.png"} className="laCroix"/>
</div>)
function fermerAngelupgrade(){
  showAngelUpgrade()
}

function takeAngelUpgrade(ange : Pallier){
    if(world.activeangels >= ange.seuil){
        setOpen(true)
        setMessage("L'amélioration "+ange.name +" a été achetée !")
        buyupgrade({variables: {name: ange.name}})
        buyAngelUpgradeToScore(ange,ange.seuil)
    }
}

}
 export default AngelsUpgrades;