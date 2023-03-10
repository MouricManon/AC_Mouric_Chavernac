import { useEffect, useState } from 'react'
import { Product, World, Pallier } from './world'
import ProductComponent from './Product'
import Manager from './Manager';
import {transform} from "./utils";
import "./Main.css"
import { Badge } from '@material-ui/core';

type MainProps = {
    loadworld: World
    username: string
}

function Main({ loadworld, username }: MainProps) {
    const [world, setWorld] = useState(JSON.parse(JSON.stringify(loadworld)) as World)
    const [valeur, setValeur] = useState("*1");
    const [click, setClick] = useState(1);
    const [showManagers, setShowManager] = useState(false);


        function addToScore(gain: number): void {
           Math.trunc(world.money += gain)
            setWorld({...world})
        }
        function buyToScore(res: number): void {
            Math.trunc(world.money -= res)
            setWorld({...world})
        }

        function buyManagerToScore(manager:Pallier, res: number): void {
            Math.trunc(world.money -= res)
            world.managers.forEach(m => {
                if(m.name === manager.name){
                    m.unlocked = true
                }
            })
        //world.activeangels += manager.angelbonus
        //world.angelbonus += manager.angelbonus
        //world.managers.push(manager)
        world.products.forEach(product => {
            if(product.id === manager.idcible){
                product.managerUnlocked = true
                Math.trunc(world.money -= product.revenu*product.quantite)
            }
        })
            setWorld({...world})
        }
        
        function onAchatDone(p: Product, res: number, iteration : number): void {
            // calcul de la somme obtenue par la production du produit
            if(valeur==="*1"){
         p.cout=p.cout*p.croissance
        p.quantite=p.quantite+1
            }
            if(valeur==="*10"){
                p.cout=p.cout*p.croissance**10
                p.quantite=p.quantite+10
            }
            if(valeur==="*100"){
                p.cout=p.cout*p.croissance**100
                p.quantite=p.quantite+100
            }
            if(valeur==="*Max"){
                p.cout=p.cout*p.croissance**iteration
                p.quantite=p.quantite+iteration}
       
        console.log(res)
            // ajout de la somme à l’argent possédé
            buyToScore(Math.trunc(res))
        }
        function onProductionDone(p: Product, nb: number): void {
            // calcul de la somme obtenue par la production du produit
            let gain =p.revenu * p.quantite * (1 + world.activeangels * world.angelbonus / 100)*nb
            // ajout de la somme à l’argent possédé
            addToScore(Math.trunc(gain))
        }
        function achat(){
        setClick(click+1)
        if(click%4==0){
            setValeur("*1")}
        if(click%4==1){
            setValeur("*10")}
        if(click%4==2){
            setValeur("*100")}
        if(click%4==3){
            setValeur("*Max")}
    }
    useEffect(() => {
        setWorld(JSON.parse(JSON.stringify(loadworld)) as World)
    }, [loadworld])

function showmanager(){
    setShowManager(!showManagers)
}

function affichagemanager(): JSX.Element{
    if(showManagers){

    return(
        <Manager money={world.money} world={world} showManagers={showmanager} buyManagerToScore={buyManagerToScore}></Manager>
    )}
    else{
        return(<div></div>)
    }
}


    return (<div><div><Badge badgeContent={world.managers.filter( manager => !manager.unlocked && world.money>manager.seuil).length} color="primary"> <button  className="leboutonm" onClick={showmanager}>Managers</button>{affichagemanager()}</Badge>
    </div>
    
    <div className="presentation"><div ><img  className="imagepres"src={"http://localhost:4000/" + world.logo}/> </div>
     <div className="nompres">  <span> {world.name} </span></div></div>
     <div className="lesdeux"> <div className="score">  <span dangerouslySetInnerHTML={{ __html: transform(Math.trunc(world.money)) }} /> $</div>
      <div className="comm"> <span onClick={achat} >{valeur}</span> </div></div>
        <div className='lesprod'> 
        <ProductComponent money={world.money} valeur={valeur} product={world.products[0]} onProductionDone={onProductionDone} onAchatDone={onAchatDone} />
        <ProductComponent money={world.money} valeur={valeur} product={world.products[1]} onProductionDone={onProductionDone} onAchatDone={onAchatDone}/>
        <ProductComponent money={world.money} valeur={valeur} product={world.products[2]} onProductionDone={onProductionDone}onAchatDone={onAchatDone}/>
        <ProductComponent money={world.money} valeur={valeur} product={world.products[3]} onProductionDone={onProductionDone} onAchatDone={onAchatDone}/>
        <ProductComponent money={world.money} valeur={valeur} product={world.products[4]} onProductionDone={onProductionDone} onAchatDone={onAchatDone}/>
        <ProductComponent money={world.money} valeur={valeur} product={world.products[5]} onProductionDone={onProductionDone} onAchatDone={onAchatDone}/></div>
</div>)
}
export default Main;