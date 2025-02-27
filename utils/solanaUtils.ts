import { Connection, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } from "@solana/spl-token";

import { getAccount } from "@solana/spl-token";

const USDT_MINT_ADDRESS = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"); // Dirección del token USDT en Solana

//Leer USDT

export const getUSDTBalance = async (walletAddress: string): Promise<number> => {
    try {
        const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
        const walletPublicKey = new PublicKey(walletAddress);

        // Obtener la dirección de la cuenta asociada de USDT
        const tokenAccountAddress = await getAssociatedTokenAddress(USDT_MINT_ADDRESS, walletPublicKey);

        // Obtener la información de la cuenta de USDT
        const tokenAccountInfo = await getAccount(connection, tokenAccountAddress);

        // Devolver el balance en USDT (dividir por 10^6 porque USDT tiene 6 decimales)
        return Number(tokenAccountInfo.amount) / 1e6;
    } catch (error) {
        console.error("Error al obtener el saldo de USDT:", error);
        return 0;
    }
};


//Enviar usdt

export const sendUSDT = async (wallet: WalletContextState, recipientAddress: string) => {
    if (!wallet || !wallet.publicKey) {
        alert("Conecta tu billetera primero");
        return;
    }

    try {
        const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

        const senderPublicKey = wallet.publicKey;
        const recipientPublicKey = new PublicKey(recipientAddress);

        // Obtener la dirección de la cuenta asociada de USDT del usuario
        const senderTokenAccount = await getAssociatedTokenAddress(USDT_MINT_ADDRESS, senderPublicKey);
        const recipientTokenAccount = await getAssociatedTokenAddress(USDT_MINT_ADDRESS, recipientPublicKey);

        // Crear la transacción para transferir USDT
        const transaction = new Transaction().add(
            createTransferInstruction(
                senderTokenAccount,
                recipientTokenAccount,
                senderPublicKey,
                1_000_000, // 1 USDT (6 decimales en Solana)
                [],
                TOKEN_PROGRAM_ID
            )
        );

        // Enviar y firmar la transacción
        const signature = await wallet.sendTransaction(transaction, connection);
        console.log("Transacción enviada con éxito:", signature);
        alert(`Transacción de USDT enviada: ${signature}`);
    } catch (err) {
        console.error("Error al enviar USDT:", err);
        alert("Error al enviar USDT");
    }
};


//Funcion para ver balance de una cuenta
export const getBalance = async (recipientAddress: string): Promise<number> => {
    try {
        const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
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
        const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

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
