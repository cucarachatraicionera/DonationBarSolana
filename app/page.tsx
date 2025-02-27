import WalletButton from "@/components/WalletButton";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
    return (
        <main style={{ textAlign: "center", padding: "50px" }}>
            <h1>🎉 Barra de Recaudación USDT 🎉</h1>
            <p>Conéctate con tu billetera Phantom y dona 0.1 USDT.</p>
            <WalletButton />
            <ProgressBar />
        </main>
    );
}
