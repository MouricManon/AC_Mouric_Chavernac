let world = require("./world")

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
        //Ceux qui n'ont pas de manager
        if (!p.managerUnlocked) {
            //console.log("Le produit ", p.name, " n'a pas de manager")
            //Le temps écoulé est assez grand donc la production est fini
            if (p.timeleft > 0 && p.timeleft < elapsed) {
                //console.log("Le produit ", p.name, " a réussi à créer un exemplaire")
                p.timeleft = 0
                    //j'ajoute l'argent
                context.world.money += p.revenu * p.quantite * (1 + context.world.activeangels * context.world.angelbonus / 100)
            } else {
                //le temps écoulé n'est pas assez grand pour finir la production, on met à jour le temps restant
                if (p.timeleft > 0) {
                    p.timeleft -= elapsed
                }
            }
        } //Ceux qui ont manager
        else {
            //console.log("Le produit ", p.name, " a un manager")
            //combien de fois vitesse a pu se produire
            let nb = Math.floor(elapsed / p.vitesse)
                //console.log("Le produit ", p.name, " a produit ", nb, " exemplaires")
            p.timeleft = p.vitesse - (elapsed % p.vitesse)
            context.world.money += p.revenu * p.quantite * nb * (1 + context.world.activeangels * context.world.angelbonus / 100)
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
        //les paliers commun à tous les produits
        //Je parcours tous les paliers et pour chaque je récupère le seuil et parcoure tous les produits sauf celui en amélioration, et j'utilise un drapeau
    let drap = true
    context.world.allunlocks.forEach(p => {
        if ((!p.unlocked) && (drap)) {
            context.world.products.forEach(prod => {
                if (prod.id !== produit.id) {
                    if (prod.quantite < p.seuil) {
                        drap = false
                    }
                }
            })
            if ((drap) && (produit.quantite + args.quantite >= p.seuil)) {
                p.unlocked = true
                    //Le bonus est appliqué à tous les produits
                context.world.products.forEach(prod => {
                    switch (p.typeratio) {
                        case "vitesse":
                            prod.vitesse /= p.ratio
                            break
                        case "gain":
                            prod.revenu *= p.ratio
                            break
                        case "ange":
                            context.world.angelbonus += p.ratio
                            break
                    }
                })
            }
        }
    })
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
                //unlockSeuil(context, args)
                console.log("ici, oui, là")
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
                saveWorld(context)

            }
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
            calculerRevenue(context)
            let ajout = 150 * Math.sqrt(world.score / Math.pow(10, 15)) - world.totalangels
            context.world.totalangels += ajout
            context.world.activeangels += ajout

            //On réinitialise le monde
            let activeangels = context.world.activeangels
            context.world = world
            context.world.activeangels = activeangels
            saveWorld(context)
            console.log(context.world.activeangels)
            return (context.world)
        },

        acheterAngelUpgrade(parent, args, context) {
            calculerRevenue(context)
            let angelUpgrade = context.world.angelupgrades.find(u => u.name === args.name)
            angelUpgrade.unlocked = true
            context.world.activeangels -= angelUpgrade.seuil
            switch (angelUpgrade.typeratio) {
                case "vitesse":
                    context.world.products.forEach(p => p.vitesse /= angelUpgrade.ratio)
                    break
                case "gain":
                    context.world.products.forEach(p => p.revenu *= angelUpgrade.ratio)
                    break
                case "angel":
                    context.world.angelbonus += angelUpgrade.ratio
                    break
            }
        }
    }
}