const {AuthenticationError} = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getSingleUser: async (parent, args, context) => {
            const foundUser = User.findOne({_id: context.user._id})
            if (!foundUser) {
                throw new AuthenticationError("Couldn't find user")
            }

            return foundUser;
        }
    },

    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if (!user) {
                throw new AuthenticationError('Invalid Credentials');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Invalid Credentials');
            }

            const token = signToken(user);
            return {token, user};
        },
        saveBook: async (parent, args, context) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: { savedBooks: args }},
                    {new: true, runValidators: true}
                );
                return updatedUser;
            } catch (err) {
                return err;
            }
        },
        deleteBook: async (parent, args, context) => {
            try{
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId: args.bookId}}},
                    {new: true}
                );
                if (!updatedUser) {
                    throw new AuthenticationError('Could not update user')
                };
                return updatedUser;
            } catch (err) {
                console.log(err);
            }
        }
    }
}

module.exports = resolvers;