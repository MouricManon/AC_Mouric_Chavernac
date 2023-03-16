import React, { useState, useEffect } from 'react';
import "./Anges.css"
import { World, Pallier } from './world'
import { Snackbar } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import { transform } from "./utils";

const RESETWORLD = gql`
mutation ResetWorld{
resetWorld{
name
}
}`
type AngesProps = {
    world: World
    score: number
    username: string
    showAngels: () => void
}
function Anges(this: any, { username, world, score, showAngels }: AngesProps) {
    const [ajout, setAjout] = useState(0);
    const [dis, setDis] = useState(true);
    useEffect(() => {calcAnges()}, [score])
    const [reset] = useMutation(RESETWORLD,
        {
            context: { headers: { "x-user": username } },
            onError: (error): void => {
                // actions en cas d'erreur
            }
        })
    return (<div className="modale3">

        <h1 className="title1">Angels make you feel better !</h1>

        <img alt="ange logo" className="angeimage" src={"http://localhost:4000/icones/ange.png"} />
        <div className="nbAngesActifs">Anges actifs : {<span dangerouslySetInnerHTML={{ __html: transform(Math.round(world.activeangels * 100) / 100) }} />}</div>
        <div className="nbAngesrecoltes"> Vous pouvez récolter : {<span dangerouslySetInnerHTML={{ __html: transform(Math.round(ajout * 100) / 100) }} />} anges. </div>
        <button className="reset" disabled={dis} onClick={collecteanges}>
             Reset World</button>
        <img onClick={fermerAngels} src={"http://localhost:4000/icones/croix.png"} className="laCroix" />
    </div>)
    function fermerAngels() {
        showAngels()
    }

    function calcAnges(): number {
        setAjout(150 * Math.sqrt(score / Math.pow(10, 15)) - world.totalangels)
        if (ajout > 0) {
            setDis(false)
        } else {
            setDis(false)
        }
        return ajout
    }

    async function collecteanges() { 
        world.activeangels=world.activeangels+ajout 
        reset()
        await new Promise(resolve=>setTimeout(resolve, 1000))
       window.location.reload()
    }

  
}

export default Anges;