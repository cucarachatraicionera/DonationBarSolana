import { Connection, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";


//Funcion para ver balance de una cuenta
export const getBalance = async (recipientAddress: string): Promise<number> => {
    try {
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");
        const publicKey = new PublicKey(recipientAddress);
        const balance = await connection.getBalance(publicKey);
        return balance / 1e9; // Convertir lamports a SOL
    } catch (error) {
        console.error("Error al obtener el saldo:", error);
        return 0;
    }
};

//Funcion para enviar balance
export const sendSol = async (wallet: WalletContextState, recipientAddress: string) => {
    if (!wallet || !wallet.publicKey) {
        alert("Conecta tu billetera primero");
        return;
    }

    try {
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(recipientAddress),
                lamports: 0.1 * 1e9, // 0.1 SOL en lamports
            })
        );

        const signature = await wallet.sendTransaction(transaction, connection);
        console.log("Transacción enviada con éxito:", signature);
        alert(`Transacción enviada: ${signature}`);
    } catch (err) {
        console.error("Error al enviar SOL:", err);
        alert("Error al enviar SOL");
    }
};
