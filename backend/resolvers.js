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
            const product = context.world.products.find(
                p => p.id == args.id)
            saveWorld(context)
            return context.world
        }

    }
};