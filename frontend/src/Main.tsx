import { useEffect, useState } from 'react'
import { Product, World, Pallier } from './world'
import ProductComponent from './Product'
import Manager from './Manager';
import Unlock from './Unlock';
import AllUnlocks from './AllUnlocks';
import CashUpgrade from './CashUpgrade';
import AngelsUpgrades from './AngelsUpgrades';
import Anges from './Anges';
import { transform } from "./utils";
import "./Main.css"
import { Badge } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import { Snackbar } from '@material-ui/core';
//pb dans l'ajout de l'argent apres *MAx
type MainProps = {
    loadworld: World
    username: string
}

function Main({ loadworld, username }: MainProps) {
    const [world, setWorld] = useState(JSON.parse(JSON.stringify(loadworld)) as World)
    const [valeur, setValeur] = useState("*1");
    const [click, setClick] = useState(1);
    const [showManagers, setShowManager] = useState(false);
    const [showUnlocks, setShowUnlocks] = useState(false);
    const [showAllUnlocks, setShowAllUnlocks] = useState(false);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [showAngels, setShowAngels] = useState(false);
    const [showAngelsUpgrade, setShowAngelsUpgrade] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");


    function addToScore(gain: number): void {
        world.money = world.money+ (gain*(1+world.activeangels*world.angelbonus/100))
        world.score= world.score+ (gain*(1+world.activeangels*world.angelbonus/100))
        setWorld({ ...world })
    }
    function buyToScore(res: number): void {
        world.money -= res
        //On met à jour le monde
        setWorld({ ...world })
    }

    function buyManagerToScore(manager: Pallier, res: number): void {
        world.money -= res
        world.managers.forEach(m => {
            if (m.name === manager.name) {
                m.unlocked = true
            }
        })
        //world.activeangels += manager.angelbonus
        //world.angelbonus += manager.angelbonus
        //world.managers.push(manager)
        world.products.forEach(product => {
            if (product.id === manager.idcible) {
                product.managerUnlocked = true
                world.money -= product.revenu * product.quantite
            }
        })
        setWorld({ ...world })
    }
    function buyUpgradeToScore(cash: Pallier, res: number): void {
        world.money -= res
        cash.unlocked = true  
        world.products.forEach(p => {
            if (p.id === cash.idcible) {
                if (cash.typeratio === "vitesse") {
                    p.vitesse = p.vitesse / cash.ratio
                }
                if (cash.typeratio === "gain") {
                    console.log("je suis le revenu"+p.revenu)
                    console.log("je suis le ratio"+cash.ratio)
                    p.revenu = p.revenu * cash.ratio
                    console.log("je suis le revenu"+p.revenu)
                }
                if (cash.typeratio === "ange") {
                    world.angelbonus += cash.ratio
                }
            }})
        setWorld({ ...world })
    }

    function buyAngelUpgradeToScore(angelup: Pallier, res: number): void {
        world.activeangels -= res
        angelup.unlocked = true  
        world.products.forEach(p => {
                if (angelup.typeratio === "vitesse") {
                    p.vitesse = p.vitesse / angelup.ratio
                }
                if (angelup.typeratio === "gain") {
                    p.revenu = p.revenu * angelup.ratio
                }
                if (angelup.typeratio === "ange") {
                    world.angelbonus += angelup.ratio
                }
            })
        setWorld({ ...world })
    }



    function onAchatDone(p: Product, res: number, iteration: number) {
        // calcul de la somme obtenue par la production du produit
        if (valeur === "*1") {
            p.cout = p.cout * p.croissance
            p.quantite = p.quantite + 1


        }

        if (valeur === "*10") {
            p.cout = p.cout * p.croissance ** 10
            p.quantite = p.quantite + 10

        }
        if (valeur === "*100") {
            p.cout = p.cout * p.croissance ** 100
            p.quantite = p.quantite + 100
        }
        if (valeur === "*Max") {
            p.cout = p.cout * p.croissance ** iteration
            p.quantite = p.quantite + iteration

        }
        p.paliers.forEach(pallier => {
            if (pallier.seuil <= p.quantite && pallier.unlocked == false) {
                setOpen(true)
                pallier.unlocked = true
                if (pallier.typeratio === "vitesse") {
                    p.vitesse = p.vitesse / pallier.ratio
                }
                if (pallier.typeratio === "gain") {
                    p.revenu = p.revenu * pallier.ratio
                }
                if (pallier.typeratio === "ange") {
                    world.angelbonus += pallier.ratio
                }
                setMessage(p.name + " " + pallier.typeratio + " X " + pallier.ratio)
            }
        })
      
        let drap = true
        world.allunlocks.forEach(all => {
            world.products.forEach(p => {
                if (all.seuil > p.quantite || all.unlocked == true) {
                    drap = false
                }
            })
            if (drap == true) {
                setOpen(true)
                all.unlocked = true
                if (all.typeratio === "vitesse") {
                    p.vitesse = p.vitesse / all.ratio
                }
                if (all.typeratio === "gain") {
                    p.revenu = p.revenu * all.ratio
                }
                if (all.typeratio === "ange") {
                    world.angelbonus += all.ratio
                }
                setMessage("Amélioration pour tous les unlocks : " + all.typeratio + " X " + all.ratio)
            }
        }
        )
        // ajout de la somme à l’argent possédé
        buyToScore(res)

    }
    function onProductionDone(p: Product, nb: number): void {
        // calcul de la somme obtenue par la production du produit
        let gain = p.revenu * p.quantite * (1 + world.activeangels * world.angelbonus / 100) * nb
        // ajout de la somme à l’argent possédé
        addToScore(gain)
    }
    function achat() {
        setClick(click + 1)
        if (click % 4 == 0) {
            setValeur("*1")
        }
        if (click % 4 == 1) {
            setValeur("*10")
        }
        if (click % 4 == 2) {
            setValeur("*100")
        }
        if (click % 4 == 3) {
            setValeur("*Max")
        }
    }
    useEffect(() => {
        setWorld(JSON.parse(JSON.stringify(loadworld)) as World)
    }, [loadworld])

    function showmanager() {
        setShowManager(!showManagers)
        console.log(world.products)
    }
    function showunlocks() {
        console.log(showUnlocks)
        setShowUnlocks(!showUnlocks)
    }
    function showallunlocks() {
        console.log(showAllUnlocks)
        setShowAllUnlocks(!showAllUnlocks)
    }
    function showupgrade() {
        console.log(showUpgrade)
        setShowUpgrade(!showUpgrade)
    }

    function showangels() {
        setShowAngels(!showAngels)
    }

    function showangelsupgrade() {
        setShowAngelsUpgrade(!showAngelsUpgrade)
    }
    function affichagemanager(): JSX.Element {
        if (showManagers) {

            return (
                <Manager username={username} money={world.money} world={world} showManagers={showmanager} buyManagerToScore={buyManagerToScore}></Manager>
            )
        }
        else {
            return (<div></div>)
        }
    }
    function affichageupgrade(): JSX.Element {
        if (showUpgrade) {

            return (
                <CashUpgrade username={username} money={world.money} world={world} showUpgrade={showupgrade} buyUpgradeToScore={buyUpgradeToScore}></CashUpgrade>
            )
        }
        else {
            return (<div></div>)
        }
    }
    function affichageunlocks(): JSX.Element {
        if (showUnlocks) {

            return (
                <Unlock money={world.money} world={world} showUnlocks={showunlocks}></Unlock>
            )
        }
        else {
            return (<div></div>)
        }
    }
    function affichageallunlocks(): JSX.Element {
        if (showAllUnlocks) {

            return (
                <AllUnlocks money={world.money} world={world} showAllUnlocks={showallunlocks} ></AllUnlocks>
            )
        }
        else {
            return (<div></div>)
        }
    }
    function affichageangels(): JSX.Element {
        if (showAngels) {

            return (
                <Anges  username={username} score={world.score}  world={world} showAngels={showangels}></Anges>
            )
        }
        else {
            return (<div></div>)
        }
    }

    function affichageangelsupgrade(): JSX.Element {
        if (showAngelsUpgrade) {
console.log("test")
            return (
                <AngelsUpgrades  username={username} money={world.money} world={world} showAngelUpgrade={showangelsupgrade} buyAngelUpgradeToScore={buyAngelUpgradeToScore}></AngelsUpgrades>
            )
        }
        else {
            return (<div></div>)
        }
    }

    function snackbar(): JSX.Element {
        if (open) {
            return (<Snackbar
                message={message}
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
            />)
        }
        else {
            return (<div></div>)
        }
    }


    return (<div>
        <div className="header">
        <div className="lesboutons">
        <div><Badge badgeContent={world.managers.filter(manager => !manager.unlocked && world.money > manager.seuil).length} color="primary"> <button className="leboutonm" onClick={showmanager}>Managers</button>{affichagemanager()}</Badge>
        </div>
        <div><button className="leboutonu" onClick={showunlocks}>Unlocks</button>{affichageunlocks()}
        </div>
        <div><button className="leboutonall" onClick={showallunlocks}>All Unlocks</button>{affichageallunlocks()}
        </div>
        <div><Badge badgeContent={world.upgrades.filter(cash => !cash.unlocked && world.money > cash.seuil).length} color="primary"><button className="leboutonup" onClick={showupgrade}>Upgrades</button>{affichageupgrade()} </Badge>
        </div>
        <div><button className="leboutonange" onClick={showangels}>Angels</button>{affichageangels()}</div>
        <div><Badge badgeContent={world.angelupgrades.filter(ange => !ange.unlocked && world.activeangels > ange.seuil).length} color="primary"><button className="leboutonaup" onClick={showangelsupgrade}>Angels Upgrades</button>{affichageangelsupgrade()} </Badge></div>
        </div>
        <div className="lereste">
        <div className="presentation"><div ><img className="imagepres" src={"http://localhost:4000/" + world.logo} /> </div>
            <div className="nompres">  <span> {world.name} </span></div></div></div></div>
        <div className="lesdeux"> <div className="score">  <span dangerouslySetInnerHTML={{ __html: transform(Math.round(world.money * 100) / 100) }} /> $</div>
            <div className="comm"> <span onClick={achat} >{valeur}</span> </div></div>
        <div className='lesprod'>
            <ProductComponent username={username} money={world.money} valeur={valeur} product={world.products[0]} onProductionDone={onProductionDone} onAchatDone={onAchatDone} />
            <ProductComponent username={username} money={world.money} valeur={valeur} product={world.products[1]} onProductionDone={onProductionDone} onAchatDone={onAchatDone} />
            <ProductComponent username={username} money={world.money} valeur={valeur} product={world.products[2]} onProductionDone={onProductionDone} onAchatDone={onAchatDone} />
            <ProductComponent username={username} money={world.money} valeur={valeur} product={world.products[3]} onProductionDone={onProductionDone} onAchatDone={onAchatDone} />
            <ProductComponent username={username} money={world.money} valeur={valeur} product={world.products[4]} onProductionDone={onProductionDone} onAchatDone={onAchatDone} />
            <ProductComponent username={username} money={world.money} valeur={valeur} product={world.products[5]} onProductionDone={onProductionDone} onAchatDone={onAchatDone} /></div>
        <div> {snackbar()}</div>  </div>)
}
export default Main;