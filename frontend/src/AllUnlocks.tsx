import React, { useState } from 'react';
import "./AllUnlocks.css"
import { World, Pallier, Product } from './world'


type AllUnlockProps = {
    world: World
    money: number
    showAllUnlocks: () => void
}
function AllUnlocks(this: any, { world, money, showAllUnlocks}: AllUnlockProps) {
    return (<div className="modul">
    <h1 className="titre1"> AllUnlocks restants</h1>
    <div className="allallunlocks">{world.allunlocks.filter( p => !p.unlocked).map(p =><div className="anallunlock" key={p.idcible}>
    <img alt="allunlock logo" className="allunlockimage" src={"http://localhost:4000/"+ p.logo }/> 
    <div className="nameau"> { p.name} </div>
    <div className="qteeteffet1">
    <div className="quantite"> Quantité nécessaire : { p.seuil} </div> 
    <div className="effet1">{p.typeratio} X {p.ratio}</div></div> </div>
)} </div> 
    <img onClick={fermerallunlock} src={"http://localhost:4000/icones/croix.png"} className="laCroix"/>
</div>
)

    function fermerallunlock() {
        showAllUnlocks()
    }

}
export default AllUnlocks;