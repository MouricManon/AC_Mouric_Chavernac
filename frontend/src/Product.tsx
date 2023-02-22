import { useEffect, useRef, useState } from 'react'
import MyProgressBar from './MyProgressBar';
import  { useInterval } from './MyInterval';
import MyProgressbar, { Orientation} from './MyProgressBar';
import "./product.css"
import "./MyProgressBar.css"
import {transform} from "./utils";
import { Product } from './world'
type ProductProps = {
    product: Product
    onProductionDone: (product: Product, nb: number) => void
    }

//hook de type ref
function ProductComponent(this: any, { product, onProductionDone} : ProductProps) {
    useInterval(() => calcScore(), 100)
    const lastupdate=useRef(Date.now())
    const [timeleft, setTimeleft] = useState(product.timeleft);
     
        return (
        <div> 
            <img onClick={startFabrication} src={"http://localhost:4000/" + product.logo} className="round"/>
            <div className="lesdeux">
<div className="lepremier"> <span> {product.quantite} </span></div>
<div className="lesecond"> <span> {product.name} </span></div>
<div className="ligne">
<MyProgressbar vitesse={product.vitesse} initialvalue={product.vitesse - timeleft} className="barstyle"  run={run()} frontcolor="#6e7a70" backcolor="#ffffff"
                    auto={product.managerUnlocked}
                    orientation={Orientation.horizontal} />
<div className="temps">hello</div></div></div></div>
)
function startFabrication(){
    console.log("startFabrication")
}
function run(){
    if (timeleft > 0||product.managerUnlocked) {
    return true}
    else return false
}
function calcScore(){   
//calcule le temps écoulé depuis la dernière sauvegarde
let now = Date.now()
let tempsecoule = now - lastupdate.current;
if (!product.managerUnlocked) {
        //Le temps écoulé est assez grand donc la production est fini
        if (timeleft > 0 && timeleft < tempsecoule) {
            console.log("Le produit ", product.name, " a réussi à créer un exemplaire")
            setTimeleft(0);
          onProductionDone(product,1);
        } else {
            //le temps écoulé n'est pas assez grand pour finir la production, on met à jour le temps restant
            if (product.timeleft > 0) {
                setTimeleft(timeleft - tempsecoule);
            }
        }
    }//Ceux qui ont manager
    else {
        //combien de fois vitesse a pu se produire
        let nb = Math.floor(tempsecoule / product.vitesse)
        console.log("Le produit ", product.name, " a produit ", nb, " exemplaires")
        setTimeleft(product.vitesse - (tempsecoule % product.vitesse))
        onProductionDone(product,nb);
    }
    lastupdate.current = now}
}
export default ProductComponent;