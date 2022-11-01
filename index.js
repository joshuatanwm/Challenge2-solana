// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmRawTransaction,
    sendAndConfirmTransaction
} = require("@solana/web3.js");

const DEMO_FROM_SECRET_KEY = new Uint8Array(
    [
        6, 255, 248, 170, 191, 140, 226,  22, 226,  80, 225,
       40, 179, 124, 220,  72, 193,  41, 217,  86, 160, 159,
      190, 238, 205, 122,   4, 150, 109, 119, 145, 214, 120,
       88,  74,  23,  98, 254, 142,  70, 202, 159, 124, 216,
      237,  87, 241, 150, 252, 191, 106,  57,   3, 232,  71,
       53,  89, 115, 190, 166, 142, 148,  81, 191
      ]            
);

const getWalletBalance = async () => {
    try {
        // Connect to the Devnet
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        console.log("Connection object is:", connection);

        // Make a wallet (keypair) from privateKey and get its balance
        const myWallet = await Keypair.fromSecretKey(privateKey);
        const walletBalance = await connection.getBalance(
            new PublicKey(newPair.publicKey)
        );
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const transferSol = async() => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Get Keypair from Secret Key
    var from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);

    // Other things to try: 
    // 1) Form array from userSecretKey
    // const from = Keypair.fromSecretKey(Uint8Array.from(userSecretKey));
    // 2) Make a new Keypair (starts with 0 SOL)
    // const from = Keypair.generate();

    // Generate another Keypair (account we'll be sending to)
    const to = Keypair.generate();

    

    // Aidrop 2 SOL to Sender wallet
    console.log("Airdopping some SOL to Sender wallet!");
    const fromAirDropSignature = await connection.requestAirdrop(
        new PublicKey(from.publicKey),
        2 * LAMPORTS_PER_SOL
    );

    // Latest blockhash (unique identifer of the block) of the cluster
    let latestBlockHash = await connection.getLatestBlockhash();

    // Confirm transaction using the last valid block height (refers to its time)
    // to check for transaction expiration
    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: fromAirDropSignature
    });

    console.log("Airdrop completed for the Sender account");

    const senderBalance = await connection.getBalance(
        PublicKey(to.publicKey)
    );
    console.log(`Sender Balance: ${parseInt(senderBalance) / LAMPORTS_PER_SOL} SOL`);

    // Send money from "from" wallet and into "to" wallet
//     var transaction = new Transaction().add(
//         SystemProgram.transfer({
//             fromPubkey: from.publicKey,
//             toPubkey: to.publicKey,
//             lamports: LAMPORTS_PER_SOL / 100
//         })
//     );

//     // Sign transaction
//     var signature = await sendAndConfirmTransaction(
//         connection,
//         transaction,
//         [from]
//     );
//     console.log('Signature is ', signature);
}

transferSol();
