import React, { useState } from 'react';
import "./Unlock.css"
import { World, Pallier, Product } from './world'
import { Snackbar } from '@material-ui/core';

type ManagerProps = {
    world: World
    money: number
    showUnlocks: () => void
    buyUnlocksToScore: (unlock: Pallier, res: number) => void
}
function Unlock(this: any, { world, money, showUnlocks, buyUnlocksToScore }: ManagerProps) {
    const [open, setOpen] = useState(false);
    return (<div className="model">
    <h1 className="titre"> Unlocks restants</h1>
    <div className="allunlocks">{afficheunlock().filter( p => !p.unlocked).map(p =><div className="anunlock" key={p.idcible}>
    <img alt="unlock logo" className="unlockimage" src={"http://localhost:4000/"+ p.logo }/> 
    <div className="nameandproductu">
    <div className="nameu"> { p.name} </div>
    <div className="productu"> {nomProduitOfUnlock(p)}</div>
    </div>
    <div className="qte"> Quantité nécessaire : { p.seuil} </div> 
    <Snackbar
        message={"Vous avez débloqué un unlock !"}
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
      /></div> )} </div>
    <img onClick={fermerunlock} src={"http://localhost:4000/icones/croix.png"} className="laCroix"/>
</div>)

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

    function hireUnlock(unlock: Pallier) {
        if (money >= unlock.seuil) {
            buyUnlocksToScore(unlock, unlock.seuil)
            setOpen(true)
        }
    }
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