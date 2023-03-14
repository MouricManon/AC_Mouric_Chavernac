import React, { useState } from 'react';
import "./CashUpgrade.css"
import { World, Pallier } from './world'
import { Snackbar } from '@material-ui/core';
import { gql, useMutation} from '@apollo/client';
import { transform } from "./utils";

const CASHUPGRADE = gql`
mutation engagerManager($name: String!) {
engagerManager(name: $name) {
name
}
}`
type CashUpgradeProps = {
    world: World
    money : number
    username : string
    showUpgrade: ()=>void
    buyUpgradeToScore: (manager:Pallier,res: number)=>void
    }
function CashUpgrade(this: any, { username, world, money, showUpgrade,buyUpgradeToScore} : CashUpgradeProps){
    const[open, setOpen] = useState(false);
    const[message, setMessage] = useState("");
    const [buyupgrade] = useMutation(CASHUPGRADE,
        { context: { headers: { "x-user": username }},
        onError: (error): void => {
        // actions en cas d'erreur
        }
        })
    return(<div className="modale">
      
    <h1 className="title1">Upgrades make you feel better !</h1>
    <div className="allcash">{world.upgrades.filter( cash => !cash.unlocked).map(cash =><div className="acash" key={cash.idcible}>
    <img alt="upgrade logo" className="cashimage" src={"http://localhost:4000/"+ cash.logo }/> 
    <div className="nameandproduit">
    <div className="name1"> { cash.name} </div>
    <div className="produit"> {nomProduitOfUpgrade(cash)}</div>
    </div>
    <div className="cashcost"> Prix :{ <span dangerouslySetInnerHTML={{ __html: transform(Math.round(cash.seuil * 100) / 100) }}/>}$  </div> 
   
    <div  onClick= {()=>takeUpgrade(cash)}>  
    <button className="cashtake" disabled={money < cash.seuil}>
    Buy !</button>
    <Snackbar
        message={message}
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
      /></div> </div> 
      )}</div>
    <img onClick={fermerupgrade} src={"http://localhost:4000/icones/croix.png"} className="laCroix"/>
</div>)
function fermerupgrade(){
  showUpgrade()
}

function takeUpgrade(cash : Pallier){
    if(money >= cash.seuil){
        setMessage("L'amélioration "+cash.name +" a été achetée !")
        setOpen(true)
        buyupgrade({variables: {name: cash.name}})
        buyUpgradeToScore(cash,cash.seuil)
    }
}

function nomProduitOfUpgrade(cash : Pallier){
    let nomProduit =""
    world.products.forEach(product => {
        if(product.id === cash.idcible){
            nomProduit = product.name        }
    })
    return nomProduit
    }
}
 export default CashUpgrade;