"use client";

import { useEffect, useState } from "react";
import { getBalance } from "@/utils/solanaUtils";

const RECIPIENT_WALLET = "4azC8sEXgLKZx8bxM56utrxT8Kn15qhPDFdcUrBxEfKU"; // Reemplaza con tu dirección de recaudación
const GOAL_SOL = 1; // Meta de 1 SOL

const ProgressBar = () => {
    const [balance, setBalance] = useState<number>(0);

    // Obtener el saldo inicial al cargar la página
    useEffect(() => {
        const fetchBalance = async () => {
            const currentBalance = await getBalance(RECIPIENT_WALLET);
            setBalance(currentBalance);
        };

        fetchBalance();
    }, []);

    // Calcular el porcentaje de la meta alcanzado
    const progress = Math.min((balance / GOAL_SOL) * 100, 100); // Límite al 100%

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>📊 Recaudación: {balance.toFixed(2)} SOL / {GOAL_SOL} SOL</h2>
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
