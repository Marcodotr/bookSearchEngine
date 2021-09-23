const { buildSchemaFromTypeDefinitions } = require('graphql-tools');
const { Book, User } = require('../models')

const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        user: async (parent, {_id}) => {
            const params = _id ? { _id } : {};
            return User.find(params)
        },
        
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args)
            return user;
        },
        login: async (parent, args) => {
            const user = await User.findOne(
                { $or: [{ username: args.username }, 
                { email: body.email }]}
            );
            
            const correctPw = await user.isCorrectPassword(args.password)

            return {
                user,
                correctPw
            }
        }
    }
}
module.exports = resolvers