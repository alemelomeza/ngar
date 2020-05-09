const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')

const typeDefs = gql`
    type User {
        id: ID
        login: String
        avatar_url: String
    }

    type Query {
        users: [User]
    }
`
const resolvers = {
    Query: {
        users: async () => {
            try {
                const users = await axios.get('https://api.github.com/users')

                return users.data.map(({id, login, avatar_url}) => ({id, login, avatar_url}))
            } catch (error) {
                throw error
            }
        }
    }
}

const servre = new ApolloServer({
    typeDefs,
    resolvers
})

servre.listen().then(({url}) => console.log(`Server ready at ${url}`))