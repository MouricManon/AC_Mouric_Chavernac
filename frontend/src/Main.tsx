import { useState } from 'react'
import {World} from './world'
type MainProps = {
    loadworld: World
    username: string
    }

function Main({ loadworld, username } : MainProps) {
    const [world, setWorld] = useState(JSON.parse(JSON.stringify(loadworld)) as
World)
    return (<div>Je suis le main</div>)
}
export default Main;