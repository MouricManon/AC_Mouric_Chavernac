const fs = require('fs').promises;

async function readUserWorld(user) {
    try {
        const data = await fs.readFile("userworlds/" + user + "-world.json");
        return JSON.parse(data);
    }
    catch (error) {
        return world
    }
}
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
// Construct a schema, using GraphQL schema language
const typeDefs = require("./schema")
// Provide resolver functions for your schema fields
const resolvers = require("./resolvers")
let world = require("./world")
const server = new ApolloServer({
    typeDefs, resolvers,
    context: async ({ req }) => ({
        world: await readUserWorld(req.headers["x-user"]),
        user: req.headers["x-user"]
    })
});
const app = express();
app.use(express.static('public'));
server.start().then(res => {
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at
http://localhost:4000${server.graphqlPath}`)
    );
})
