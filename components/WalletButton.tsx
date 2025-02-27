"use client"; // Necesario para que funcione con Next.js 13+
import { useWallet } from "@solana/wallet-adapter-react";  // Correcto

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { sendSol } from "../utils/solanaUtils";

const WalletButton = () => {
    const wallet = useWallet();

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <WalletMultiButton />
            {wallet.connected && (
                <button
                    onClick={() => sendSol(wallet, "4azC8sEXgLKZx8bxM56utrxT8Kn15qhPDFdcUrBxEfKU")}
                    style={{
                        marginTop: "10px",
                        padding: "10px 20px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Donar 0.1 SOL
                </button>
            )}
        </div>
    );
};

export default WalletButton;
