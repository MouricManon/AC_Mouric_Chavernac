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

module.exports = {
    Query: {
        getWorld(parent, args, context, info) {
            saveWorld(context)
            return context.world
        }
    },
    Mutation: {
        acheterQtProduit(args, context) {
            if (context.world.products.find(p => p.id == args.id) == null) {
                throw new Error(
                    `Le produit avec l'id ${args.id} n'existe pas`)
            }
            else {
                context.world.products.find(p => p.id == args.id).quantite += args.quantite
                //le prix n'est pas le même si pour chaque quantité
                context.world.money -= args.quantite * context.world.products.find(p => p.id == args.id).cout
            }
            saveWorld(context)
            return context.world
        },

        lancerProductionProduit(args, context) {
            if (context.world.products.find(p => p.id == args.id) == null) {
                throw new Error(
                    `Le produit avec l'id ${args.id} n'existe pas`)
            }
            else {
                context.world.products.find(p => p.id == args.id).timeleft = context.world.products.find(p => p.id == args.id).vitesse
            }
            saveWorld(context)
            return context.world
        },
        engagerManager(args, context) {
            context.world.managers.find(m => m.name == args.name).unlocked = true
            context.world.products.find(p => p.id == context.world.managers.find(m => m.name == args.name).idcible).managerUnlocked = true
            saveWorld(context)
            return context.world
        }
    }
}