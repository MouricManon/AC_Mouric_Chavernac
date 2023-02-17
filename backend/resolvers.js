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

function calculerRevenue(context) {
    let scoreTemp = context.world.money
    //calcule le temps écoulé depuis la dernière sauvegarde
    let now = Date.now()
    let elapsed = now - context.world.lastupdate
    context.world.products.forEach(p => {
        //Ceux qui ont un manager
        if (!p.managerUnlocked) {
            console.log("Le produit ", p.name, " n'a pas de manager")
            //Le temps écoulé est assez grand donc la production est fini
            if (p.timeleft > 0 && p.timeleft < elapsed) {
                console.log("Le produit ", p.name, " a réussi à créer un exemplaire")
                p.timeleft = 0
                //p.quantite += 1
                //j'ajoute l'argent
                context.world.money += p.revenu * p.quantite
            } else {
                //le temps écoulé n'est pas assez grand pour finir la production, on met à jour le temps restant
                if (p.timeleft > 0) {
                    p.timeleft -= elapsed
                }
            }
        }//Ceux qui ont manager
        else {
            console.log("Le produit ", p.name, " a un manager")
            //combien de fois vitesse a pu se produire
            let nb = Math.floor(elapsed / p.vitesse)
            console.log("Le produit ", p.name, " a produit ", nb, " exemplaires")
            p.timeleft = p.vitesse - (elapsed % p.vitesse)
            context.world.money += p.revenu * p.quantite * nb
        }
    })
    context.world.score += context.world.money - scoreTemp
    context.world.lastupdate = now
}

function unlockSeuil(context, args) {
    let produit = context.world.products.find(p => p.id === args.id)
    produit.palliers.forEach(p => {
        if ((!p.unlocked) && (produit.quantite + args.quantite >= p.seuil)) {
            p.unlocked !== p.unlocked
            switch (p.typeratio) {
                case "vitesse":
                    produit.vitesse /= p.ratio
                    break
                case "gain":
                    produit.revenu *= p.ratio
                    break
                case "ange":
                    context.world.angelbonus += p.ratio
                    break
            }
        }
    })
    //TODO les paliers commun à tous les produits
}

module.exports = {
    Query: {
        getWorld(parent, args, context) {
            calculerRevenue(context)
            saveWorld(context)
            return context.world
        }
    },
    Mutation: {
        acheterQtProduit(parent, args, context) {
            calculerRevenue(context)
            let produit = context.world.products.find(p => p.id === args.id)
            if (!produit) {
                throw new Error(
                    `Le produit avec l'id ${args.id} n'existe pas`)
            } else {
                unlockSeuil(context, args)
                produit.quantite += args.quantite
                U1 = produit.cout
                quantite = args.quantite
                Uq = U1 * (1 - Math.pow(produit.croissance, quantite)) / (1 - produit.croissance)
                context.world.money -= Uq
                produit.cout = produit.cout * Math.pow(produit.croissance, quantite)
                console.log("cout de un exemplaire", U1)
                console.log("quantité demandée", quantite)
                console.log("prix total", Uq)
                console.log("nouveau prix", produit.cout)
            }
            saveWorld(context)
            return produit
        },

        lancerProductionProduit(parent, args, context) {
            calculerRevenue(context)
            let produit = context.world.products.find(p => p.id === args.id)
            if (!produit) {
                throw new Error(
                    `Le produit avec l'id ${args.id} n'existe pas`)
            } else {
                produit.timeleft = produit.vitesse
            }
            saveWorld(context)
            return produit
        },
        engagerManager(parent, args, context) {
            calculerRevenue(context)
            let manager = context.world.managers.find(m => m.name === args.name)
            manager.unlocked = true
            context.world.money -= manager.seuil
            context.world.products.find(p => p.id === manager.idcible).managerUnlocked = true
            saveWorld(context)
            return manager
        },
        acheterCashUpgrade(parent, args, context) {
            calculerRevenue(context)
            let upgrade = context.world.upgrades.find(u => u.name === args.name)
            upgrade.unlocked !== upgrade.unlocked
            let produit = context.world.products.find(p => p.id === upgrade.idcible)
            switch (upgrade.typeratio) {
                case "vitesse":
                    produit.vitesse /= p.ratio
                    break
                case "gain":
                    produit.revenu *= p.ratio
                    break
                case "ange":
                    context.world.angelbonus += p.ratio
                    break
            }
            saveWorld(context)
            return upgrade
        },

        resetWorld(parent, args, context) {
            //TODO
            calculerRevenue(context)
            let world = context.world
            let ajout= 150 * Math.sqrt(world.score / Math.pow(10, 15)) - world.totalangels
            world.totalangels+=ajout
            world.activeangels+=ajout
            saveWorld(context)
            return (context.world)


        }


    }

}
