import { createMint, getOrCreateAssociatedTokenAccount } from "@solana/spl-token"
import "dotenv/config"
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers"

import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js"

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`User account loaded: ${user.publicKey.toBase58()}`);

const tokenMintAccount = new PublicKey("H7AUUj7GH2qkT9ayQ8NuivZdBUQm4YdPLJj3Pq7qS6Bp");
const recipient = new PublicKey("47fX22LwxRL6eRYLvUWPedeR5xWnyzmmPapV5R8fTPiQ");

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    recipient,
);
   


const link = getExplorerLink("address", tokenAccount.address.toBase58(), "devnet");

console.log(`Token mint created: ${link}`);
