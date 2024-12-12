import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
getExplorerLink,
getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const DECIMALS = 6;
const AMOUNT = 9;
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`User account loaded: ${user.publicKey.toBase58()}`);

const tokenMint = new PublicKey("H7AUUj7GH2qkT9ayQ8NuivZdBUQm4YdPLJj3Pq7qS6Bp");

const recipientAssociatedTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMint,
    user.publicKey
    );

const transactionSignature = await mintTo(
    connection,
    user,
    tokenMint,
    recipientAssociatedTokenAccount.address,
    user,
    AMOUNT * 20 ** DECIMALS,
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`Success! Mint Token Transaction: ${link}`);
