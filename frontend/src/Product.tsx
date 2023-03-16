import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { useInterval } from './MyInterval';
import MyProgressbar, { Orientation } from './MyProgressBar';
import "./product.css"
import "./MyProgressBar.css"
import { transform } from "./utils";
import { Product } from './world'
import { time } from 'console';
import { gql, useMutation} from '@apollo/client';
const LANCER_PRODUCTION = gql`
mutation lancerProductionProduit($id: Int!) {
lancerProductionProduit(id: $id) {
id
}
}`
const ACHETER_QTE = gql`
mutation acheterQtProduit($id: Int!,$quantite: Int!) {
acheterQtProduit(id: $id, quantite: $quantite) {
id
}
}`

type ProductProps = {
    product: Product
    onProductionDone: (product: Product, nb: number) => void
    valeur: string
    money: number
    username: string
    onAchatDone: (product: Product, res: number, iteration: number) => void
}

//hook de type ref
function ProductComponent(this: any, { username, product, onProductionDone, valeur, money, onAchatDone }: ProductProps) {
    //const client = useApolloClient();
    const [lancerProduction] = useMutation(LANCER_PRODUCTION,
        { context: { headers: { "x-user": username }},
        onError: (error): void => {
        // actions en cas d'erreur
        }
        })
        const [acheterQtProduit] = useMutation(ACHETER_QTE,
            { context: { headers: { "x-user": username }},
            onError: (error): void => {
            // actions en cas d'erreur
            }
            })
       
        
    const lastupdate = useRef(Date.now())
    const [timeleft, setTimeleft] = useState(product.timeleft);
    const res = useRef(0);
    const iteration = useRef(0);
    const griseval = useRef(false);
    useInterval(() => calcScore(), 100);
    
    if (grise()) {
        return (
            <div className='aproduct'>
                <div className="ligne1"><img onClick={startFabrication} src={"http://localhost:4000/" + product.logo} className="round" />
                    <MyProgressbar vitesse={product.vitesse} initialvalue={product.vitesse - timeleft} className="barstyle" run={(timeleft > 0 || (product.managerUnlocked && timeleft == 0))} frontcolor="#6e7a70" backcolor="#ffffff"
                        auto={product.managerUnlocked}
                        orientation={Orientation.horizontal} />
                    <div className="temps">{timeleft / 1000} sec</div>
                </div>
                <div className="ligne2"><span> {product.name} </span>
                    <span> Quantité : {Math.trunc(product.quantite)} </span>
                    <div onClick={demandeachat} className="pasgrise"> Prix : { <span dangerouslySetInnerHTML={{ __html: transform(Math.round(calc() * 100) / 100) }}/>}  {valeur==="*Max" && <span> pour {Math.trunc(iteration.current)}</span>}
                    </div>
                </div>
            </div>)
    } else {

        return (
            <div className='aproduct'>
                <div className="ligne1"><img onClick={startFabrication} src={"http://localhost:4000/" + product.logo} className="round" />
                    <MyProgressbar vitesse={product.vitesse} initialvalue={product.vitesse - timeleft} className="barstyle" run={timeleft > 0 || product.managerUnlocked} frontcolor="#6e7a70" backcolor="#ffffff"
                        auto={product.managerUnlocked}
                        orientation={Orientation.horizontal} />
                    <div className="temps">{timeleft / 1000} sec</div>
                </div>
                <div className="ligne2"><span> {product.name} </span>
                    <span> Quantité : {Math.trunc(product.quantite)} </span>
                    <div onClick={demandeachat} className="grise"> Prix : { <span dangerouslySetInnerHTML={{ __html: transform(Math.round(calc() * 100) / 100) }}/>}
                    </div>
                </div>
            </div>)
    }
    function startFabrication() {
        if (timeleft == 0) {
            setTimeleft(product.vitesse)
            lancerProduction({ variables: { id: product.id } });
            
        }
        else {
            console.log("Le produit ", product.name, " est déjà en production")
        }
    }

    function calcScore() {
        let now = Date.now()
        let tempsecoule = now - lastupdate.current;
        lastupdate.current = now
        if (!product.managerUnlocked) {
            //Le temps écoulé est assez grand donc la production est fini
            if (timeleft > 0 && timeleft < tempsecoule) {
                console.log("Le produit ", product.name, " a réussi à créer un exemplaire")
                setTimeleft(0);
                onProductionDone(product, 1);
            } else {
                //le temps écoulé n'est pas assez grand pour finir la production, on met à jour le temps restant
                if (timeleft > 0) {
                    setTimeleft(timeleft - tempsecoule);
                }
            }
        }//Ceux qui ont manager
        else {
            /*  if (timeleft==0){
              //combien de fois vitesse a pu se produire
              let nb = Math.floor(tempsecoule / product.vitesse)
              console.log("Le produit ", product.name, " a produit ", nb, " exemplaires")
              
              setTimeleft(product.vitesse - (tempsecoule % product.vitesse))
              
              onProductionDone(product,nb);}
             
              if (tempsecoule<timeleft && timeleft>0){
                 
                  
              }*/

            if (tempsecoule < timeleft) {
                setTimeleft(timeleft - tempsecoule);
            }
            else {
                setTimeleft(product.vitesse-(tempsecoule-timeleft));
                onProductionDone(product, 1);
            }



        }
    }

    function calcMaxProduit(): number {
        iteration.current = (Math.log10(-(money * (1 - product.croissance) / product.cout - 1)) / Math.log10(product.croissance))
        console.log(Math.trunc(iteration.current))
        return Math.trunc(iteration.current)
    }
    function calc(): number {
        if (valeur === "*1") {
            res.current = product.cout
            return res.current
        }
        if (valeur === "*10") {
            res.current = product.cout * (1 - product.croissance ** 10) / (1 - product.croissance)
            return res.current
        }
        if (valeur === "*100") {
            res.current = product.cout * (1 - product.croissance ** 100) / (1 - product.croissance)
            return res.current
        }
        if (valeur === "*Max") {
            res.current = product.cout * (1 - product.croissance ** (calcMaxProduit())) / (1 - product.croissance)
            return res.current
        }

        else {
            return res.current
        }

    }

    function demandeachat() {
        //TODO plusieurs paliers d'un coup

        if (res.current <= money && money>0) {
            if (valeur === "*1") {
            acheterQtProduit({ variables: { id: product.id, quantite:1} });
             onAchatDone(product, res.current, 1)
            }
            if (valeur === "*10") {
                acheterQtProduit({ variables: { id: product.id, quantite:10 } });
                onAchatDone(product, res.current, 10)
            }
            if (valeur === "*100") {
                acheterQtProduit({ variables: { id: product.id, quantite:100} });
                onAchatDone(product, res.current, 100)
            }
            if (valeur === "*Max") {
                acheterQtProduit({ variables: { id: product.id, quantite:calcMaxProduit()} });
                onAchatDone(product, res.current, calcMaxProduit())
            }
            
           
           

        }
        else {
            console.log("pas assez d'argent" + money)

        }
    }
    function grise(): boolean {
        //TODO plusieurs paliers d'un coup

        if (res.current <= money && money>0 && res.current >0 ) {
            griseval.current = true
            return griseval.current
        }
        else {
            return griseval.current = false
        }
        //produit grisé
    }
}
export default ProductComponent;