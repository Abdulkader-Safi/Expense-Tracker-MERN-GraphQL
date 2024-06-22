import { mergeTypeDefs } from "@graphql-tools/merge";

import transactionTypeDef from "./transaction.typeDefs.js";
import userTypeDef from "./user.typeDefs.js";

const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef]);

export default mergedTypeDefs;
