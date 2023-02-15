import { useEffect, useState } from 'react'
import { World } from './world'
import ProductComponent from './Product'
import {transform} from "./utils";

type MainProps = {
    loadworld: World
    username: string
}

function Main({ loadworld, username }: MainProps) {
    const [world, setWorld] = useState(JSON.parse(JSON.stringify(loadworld)) as
        World)


    useEffect(() => {
        setWorld(JSON.parse(JSON.stringify(loadworld)) as World)
    }, [loadworld])


    return (<div><img src={"http://localhost:4000/" + world.logo} />
        <span> {world.name} </span>
        <span dangerouslySetInnerHTML={{ __html: transform(world.money) }} />
        <ProductComponent product={world.products[0]} />
        <ProductComponent product={world.products[1]} />
        <ProductComponent product={world.products[2]} />
        <ProductComponent product={world.products[3]} />
        <ProductComponent product={world.products[4]} />
        <ProductComponent product={world.products[5]} /></div>
    )
}
export default Main;