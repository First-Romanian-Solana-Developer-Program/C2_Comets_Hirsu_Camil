import "dotenv/config";
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers"
import { Connection, PublicKey, Transaction, clusterApiUrl } from "@solana/web3.js"
import { transfer, getOrCreateAssociatedTokenAccount } from "@solana/spl-token"

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`User account loaded: ${user.publicKey.toBase58()}`);

const recipient = new PublicKey("47fX22LwxRL6eRYLvUWPedeR5xWnyzmmPapV5R8fTPiQ");

const tokenMintAccount = new PublicKey("H7AUUj7GH2qkT9ayQ8NuivZdBUQm4YdPLJj3Pq7qS6Bp");

const MINOR_UNIT_PER_MAJOR_UNITS = Math.pow(10, 2);

console.log(`Attempting to send 1 token to ${recipient.toBase58()}`);

const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    user.publicKey
);

const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    recipient
);

const signature = await transfer(
    connection,
    user,
    sourceTokenAccount.address,
    destinationTokenAccount.address,
    user,
    1 * MINOR_UNIT_PER_MAJOR_UNITS
);

const explorerLink = getExplorerLink("transaction", signature, "devnet");

console.log(`Transaction confirmed, explorer link is: ${explorerLink}`);
