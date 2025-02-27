import "@solana/wallet-adapter-react-ui/styles.css"; // ✅ Importar estilos aquí
import WalletProvider from "@/components/WalletProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body>
                <WalletProvider>{children}</WalletProvider>
            </body>
        </html>
    );
}
