"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { sendUSDT, getUSDTBalance } from "@/utils/solanaUtils";
import { useState, useEffect } from "react";

const RECIPIENT_WALLET = "4azC8sEXgLKZx8bxM56utrxT8Kn15qhPDFdcUrBxEfKU";

const WalletButton = () => {
    const wallet = useWallet();
    const [balance, setBalance] = useState<number>(0);

    const updateBalance = async () => {
        const currentBalance = await getUSDTBalance(RECIPIENT_WALLET);
        setBalance(currentBalance);
    };

    useEffect(() => {
        updateBalance();
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <WalletMultiButton />
            {wallet.connected && (
                <>
                    <p>💰 Saldo recaudado: {balance.toFixed(2)} USDT</p> {/* ✅ Evita el error */}
                    <button
                        onClick={async () => {
                            await sendUSDT(wallet, RECIPIENT_WALLET);
                            updateBalance();
                        }}
                        style={{
                            marginTop: "10px",
                            padding: "10px 20px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        Donar 1 USDT
                    </button>
                </>
            )}
        </div>
    );
};

export default WalletButton;
