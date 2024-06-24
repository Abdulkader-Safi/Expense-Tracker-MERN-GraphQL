import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) {
          throw new Error("Unauthorized");
        }

        const userId = context.getUser()._id;
        const transactions = await Transaction.find({ user: userId });

        return transactions;
      } catch (error) {
        console.error("Error in login:", err);
        throw new Error(err.message || "Internal server error");
      }
    },

    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);

        return transaction;
      } catch (error) {
        console.error("Error in login:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },

  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();

        return newTransaction;
      } catch (error) {
        console.error("Error in login:", err);
        throw new Error(err.message || "Internal server error");
      }
    },

    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          {
            new: true,
          },
        );

        return updatedTransaction;
      } catch (error) {
        console.error("Error in login:", err);
        throw new Error(err.message || "Internal server error");
      }
    },

    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deletedTransaction =
          await Transaction.findByIdAndDelete(transactionId);
        return deletedTransaction;
      } catch (err) {
        console.error("Error deleting transaction:", err);
        throw new Error("Error deleting transaction");
      }
    },
  },
  Transaction: {
    user: async (parent) => {
      const userId = parent.userId;
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        console.error("Error getting user:", err);
        throw new Error("Error getting user");
      }
    },
  },
};

export default transactionResolver;
