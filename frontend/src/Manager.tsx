import React from 'react';
import "./Manager.css"
import { World, Pallier } from './world'


type ManagerProps = {
    world: World
    money : number
    showManagers: ()=>void
    buyManagerToScore: (manager:Pallier,res: number)=>void
    }
function Manager(this: any, { world, money, showManagers,buyManagerToScore} : ManagerProps){
    return(<div className="modal"><div>
    <h1 className="title">Managers make you feel better !</h1>
    </div>
    <div>{world.managers.filter( manager => !manager.unlocked).map(manager =><div key={manager.idcible} className="managergrid">
    <div className="logo">
    <img alt="manager logo" className="round" src={"http://localhost:4000/"+ manager.logo }/>
    </div>
    <div>
    <div className="infosmanager">
    <div className="managername"> { manager.name} </div>
    <div className="managercible"> { manager.idcible}</div>
    <div className="managercost"> { manager.seuil} </div>
    </div> </div> 
    <div onClick= {()=>hireManager(manager)}>  
    <button disabled={money < manager.seuil}>
    Hire !</button></div>
    <div>
    <img onClick={fermermanager} src={"http://localhost:4000/icones/croix.png"} className="laCroix"/></div>
</div>)} </div>
</div>)
function fermermanager(){
  showManagers()
}

function hireManager(manager : Pallier){
    if(money >= manager.seuil){
        buyManagerToScore(manager,manager.seuil)
    }
}
}
 export default Manager;