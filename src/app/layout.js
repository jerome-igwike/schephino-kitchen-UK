import "./globals.css";
import BottomNav from "../components/layout/BottomNav";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { CartProvider } from "../lib/CartContext";

export const metadata = {
  title: "Schephino's Kitchen - Premium Nigerian Cuisine in the UK",
  description: "Experience authentic Nigerian flavors elevated to perfection. Premium dishes crafted by master chefs using traditional recipes and the finest ingredients.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[var(--cream-primary)] text-[var(--text-dark)] pb-20 lg:pb-0">
        <CartProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
