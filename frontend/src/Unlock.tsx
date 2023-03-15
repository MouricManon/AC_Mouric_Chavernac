import React, { useState } from 'react';
import "./Unlock.css"
import { World, Pallier, Product } from './world'


type UnlockProps = {
    world: World
    money: number
    showUnlocks: () => void
}
function Unlock(this: any, { world, money, showUnlocks}: UnlockProps) {
    return (<div className="model">
    <h1 className="titre"> Unlocks restants</h1>
    <div className="allunlocks">{afficheunlock().filter( p => !p.unlocked).map(p =><div className="anunlock" key={p.idcible}>
    <img alt="unlock logo" className="unlockimage" src={"http://localhost:4000/"+ p.logo }/> 
    <div className="nameandproductu">
    <div className="nameu"> { p.name} </div>
    <div className="productu"> {nomProduitOfUnlock(p)}</div>
    </div>
    <div className="qte"> Quantité nécessaire : { p.seuil} </div> 
  </div>)} </div>
    <img onClick={fermerunlock} src={"http://localhost:4000/icones/croix.png"} className="laCroix"/>
</div>
)

    function fermerunlock() {
        showUnlocks()
    }

    function afficheunlock() {
        //Parcourir tous les produits, et pour chaque produit, l'ensemble des palliers et les ajouter à une liste qu'on retourne
        //Il faut régler l'erreur  product.palliers is undefined
        let palliers: Pallier[] = []
        world.products.forEach(p => {
            console.log(p)
            p.paliers.forEach(pallier => {
                if (pallier.seuil > p.quantite) {
                    palliers.push(pallier)
                }
            })
        }
        )
        console.log(palliers)
        return palliers}

    function nomProduitOfUnlock(unlock: Pallier) {
        let nomProduit = ""
        world.products.forEach(product => {
            if (product.id === unlock.idcible) {
                nomProduit = product.name
            }
        })
        return nomProduit
    }
}
export default Unlock;