import { useEffect, useState } from 'react'
import { Product, World } from './world'
import ProductComponent from './Product'
import {transform} from "./utils";
import "./Main.css"

type MainProps = {
    loadworld: World
    username: string
}

function Main({ loadworld, username }: MainProps) {
    const [world, setWorld] = useState(JSON.parse(JSON.stringify(loadworld)) as World)
    const [valeur, setValeur] = useState("*1");
    const [click, setClick] = useState(1);


        function addToScore(gain: number): void {
           Math.trunc(world.money += gain)
            setWorld({...world})
        }
        function buyToScore(res: number): void {
            Math.trunc(world.money -= res)
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


    return (<div><div className="presentation"><img className="imagepres" src={"http://localhost:4000/" + world.logo} />
        <span> {world.name} </span></div>
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