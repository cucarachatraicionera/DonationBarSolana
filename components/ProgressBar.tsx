"use client";

import { useEffect, useState } from "react";
import { getUSDTBalance } from "@/utils/solanaUtils";

const RECIPIENT_WALLET = "4azC8sEXgLKZx8bxM56utrxT8Kn15qhPDFdcUrBxEfKU"; // Dirección de recaudación en Solana
const GOAL_USDT = 100; // Meta de 100 USDT

const ProgressBar = () => {
    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        const fetchBalance = async () => {
            const currentBalance = await getUSDTBalance(RECIPIENT_WALLET);
            setBalance(currentBalance);
        };

        fetchBalance();
    }, []);

    const progress = Math.min((balance / GOAL_USDT) * 100, 100);

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>📊 Recaudación: {balance.toFixed(2)} USDT / {GOAL_USDT} USDT</h2>
            <div
                style={{
                    width: "80%",
                    maxWidth: "500px",
                    height: "30px",
                    backgroundColor: "#ddd",
                    borderRadius: "15px",
                    margin: "10px auto",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        width: `${progress}%`,
                        height: "100%",
                        backgroundColor: "#4CAF50",
                        borderRadius: "15px",
                        transition: "width 0.5s ease-in-out",
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
