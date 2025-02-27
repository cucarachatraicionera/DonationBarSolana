import WalletButton from "@/components/WalletButton";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
    return (
        <main style={{ textAlign: "center", padding: "50px" }}>
            <h1>🎉 Barra de Recaudación SOL 🎉</h1>
            <p>Conéctate con tu billetera Phantom y dona 0.1 SOL.</p>
            <WalletButton />
            <ProgressBar />
        </main>
    );
}
