function saveWorld(context) {
    const fs = require('fs');
    fs.writeFile("userworlds/" + context.user + "-world.json",
        JSON.stringify(context.world), err => {
            if (err) {
                console.error(err)
                throw new Error(
                    `Erreur d'écriture du monde coté serveur`)
            }
        })
}

function calculerRevenu(context) {
    //calcule le temps écoulé depuis la dernière sauvegarde
    let now = Date.now()
    let elapsed = now - context.world.lastupdate
    context.world.products.forEach(p => {
        //Ceux qui ont un manager
        if (!p.managerUnlocked) {
            //Le temps écoulé est assez grand donc la production est fini
            if (p.timeleft > 0 && p.timeleft < elapsed) {
                p.timeleft = 0
                p.quantite += 1
                //j'ajoute l'argent
                context.world.money += p.revenu * p.quantite
            }
            else {
                //le temps écoulé n'est pas assez grand pour finir la production, on met à jour le temps restant
                if (p.timeleft > 0) {
                    p.timeleft -= elapsed
                }
            }
        }//Ceux qui ont manager
        else {
            //combien de fois vitesse a pu se produire
            let nb = Math.floor(elapsed / p.vitesse)
            p.quantite += nb
            p.timeleft = p.vitesse - (elapsed % p.vitesse)
            context.world.money += p.revenu * p.quantite * nb
        }
    })
    context.world.lastupdate = now
}


module.exports = {
    Query: {
        getWorld(parent, args, context, info) {
            saveWorld(context)
            return context.world
        }
    },
    Mutation: {
        acheterQtProduit(parent, args, context) {
            calculerRevenu(context)
            let produit = context.world.products.find(p => p.id == args.id)
            if (!produit) {
                throw new Error(
                    `Le produit avec l'id ${args.id} n'existe pas`)
            }
            else {
                produit.quantite += args.quantite
                U1 = produit.cout
                quantite = args.quantite
                Uq = U1 * (1 - Math.pow(produit.croissance, quantite)) / (1 - produit.croissance)
                produit.cout = produit.cout * Math.pow(produit.croissance, quantite)
                console.log(Uq, context.world.money)
            }
            saveWorld(context)
            return produit
        },

        lancerProductionProduit(parent, args, context) {
            calculerRevenue(context)
            let produit = context.world.products.find(p => p.id == args.id)
            if (!produit) {
                throw new Error(
                    `Le produit avec l'id ${args.id} n'existe pas`)
            }
            else {
                produit.timeleft = produit.vitesse
            }
            saveWorld(context)
            return produit
        },
        engagerManager(parent, args, context) {
            calculerRevenue(context)
            let manager = context.world.managers.find(m => m.name == args.name)
            manager.unlocked = true
            context.world.money -= manager.seuil
            context.world.products.find(p => p.id == manager.idcible).managerUnlocked = true
            saveWorld(context)
            return manager
        },


    }

}
