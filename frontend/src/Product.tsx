import { MouseEventHandler, useEffect, useRef, useState } from 'react'
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
    valeur : string
    money : number
    onAchatDone: (product: Product, res: number,iteration:number) => void
    }

//hook de type ref
function ProductComponent(this: any, { product, onProductionDone, valeur, money, onAchatDone} : ProductProps) {
    const lastupdate=useRef(Date.now())
    const [timeleft, setTimeleft] = useState(product.timeleft);
    const res = useRef(0);
    const iteration = useRef(0);
    const griseval = useRef(false);
    useInterval(() => calcScore(), 100);
 if(grise()){
        return (
        <div className='aproduct'> 
            <div className="ligne1"><img onClick={startFabrication} src={"http://localhost:4000/" + product.logo} className="round"/>
            <MyProgressbar vitesse={product.vitesse} initialvalue={product.vitesse - timeleft} className="barstyle"  run={timeleft > 0||product.managerUnlocked} frontcolor="#6e7a70" backcolor="#ffffff"
                    auto={product.managerUnlocked}
                    orientation={Orientation.horizontal} />
            <div className="temps">{timeleft/1000} sec</div>
           </div>
        <div className="ligne2"><span> {product.name} </span>
        <span> Quantité : {Math.trunc(product.quantite)} </span>
        <div onClick={demandeachat} className="pasgrise"> Prix :  {calc()}
</div>
        </div>
        </div>)}else{

    return (
            <div className='aproduct'> 
                <div className="ligne1"><img onClick={startFabrication} src={"http://localhost:4000/" + product.logo} className="round"/>
                <MyProgressbar vitesse={product.vitesse} initialvalue={product.vitesse - timeleft} className="barstyle"  run={timeleft > 0||product.managerUnlocked} frontcolor="#6e7a70" backcolor="#ffffff"
                        auto={product.managerUnlocked}
                        orientation={Orientation.horizontal} />
                <div className="temps">{timeleft/1000} sec</div>
               </div>
            <div className="ligne2"><span> {product.name} </span>
            <span> Quantité : {Math.trunc(product.quantite)} </span>
            <div onClick={demandeachat} className="grise"> Prix :  {calc()}
    </div>
            </div>
            </div>)
}
function startFabrication(){
    setTimeleft(product.vitesse)
}

function calcScore(){   
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
                if (timeleft > 0) {
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


  function calcMaxProduit():number{
iteration.current =(Math.log10(-(money*(1-product.croissance)/product.cout-1))/Math.log10(product.croissance))-1
console.log(Math.trunc(iteration.current))
return Math.trunc(iteration.current)
  }
function calc():number{
   if(valeur==="*1"){
res.current=product.cout
return Math.trunc(res.current)
    }
  if(valeur==="*10"){
res.current=product.cout*(1-product.croissance**11)/(1-product.croissance)
return Math.trunc(res.current)  }
    if(valeur==="*100"){
        res.current=product.cout*(1-product.croissance**101)/(1-product.croissance)
        return Math.trunc(res.current)
        }
    if(valeur==="*Max"){
        res.current=product.cout*(1-product.croissance**(calcMaxProduit()+1))/(1-product.croissance)
        return Math.trunc(res.current)
       }

else{
    return Math.trunc(res.current)
}

    }

    function demandeachat(){
        //TODO plusieurs paliers d'un coup
        
        if(res.current<=money){
        console.log(money)
        console.log(res.current)
        onAchatDone(product, res.current,iteration.current)

    }
        else{
            console.log("pas assez d'argent" + money)

        }}
        function grise() : boolean{
            //TODO plusieurs paliers d'un coup
            
            if(res.current<=money){
            griseval.current=true
            return griseval.current
        }
            else{
                console.log("pas assez d'argent" + money)
                return griseval.current=false
            }
//produit grisé
}
}
export default ProductComponent;