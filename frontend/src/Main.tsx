import { useEffect, useState } from 'react'
import { Product, World } from './world'
import ProductComponent from './Product'
import {transform} from "./utils";

type MainProps = {
    loadworld: World
    username: string
}

function Main({ loadworld, username }: MainProps) {
    const [world, setWorld] = useState(JSON.parse(JSON.stringify(loadworld)) as
        World)

        function addToScore(gain: number): void {
            world.money += gain
        }
        function onProductionDone(p: Product, nb: number): void {
            // calcul de la somme obtenue par la production du produit
            let gain =p.revenu * p.quantite * (1 + world.activeangels * world.angelbonus / 100)*nb
            // ajout de la somme à l’argent possédé
            addToScore(gain)
        }
    useEffect(() => {
        setWorld(JSON.parse(JSON.stringify(loadworld)) as World)
    }, [loadworld])


    return (<div><img src={"http://localhost:4000/" + world.logo} />
        <span> {world.name} </span>
        <span dangerouslySetInnerHTML={{ __html: transform(world.money) }} />
        <ProductComponent product={world.products[0]} onProductionDone={onProductionDone}/>
        <ProductComponent product={world.products[1]} onProductionDone={onProductionDone}/>
        <ProductComponent product={world.products[2]} onProductionDone={onProductionDone}/>
        <ProductComponent product={world.products[3]} onProductionDone={onProductionDone}/>
        <ProductComponent product={world.products[4]} onProductionDone={onProductionDone}/>
        <ProductComponent product={world.products[5]} onProductionDone={onProductionDone}/></div>
    )

}
export default Main;