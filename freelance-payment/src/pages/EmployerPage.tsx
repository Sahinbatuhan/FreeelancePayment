import React, { useState } from "react";
import { sendPayment, createWallet, getBalance } from "../services/stellar";

const EmployerPage = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = React.useState<{ publicKey: string; secretKey: string } | null>(null);
  const [status, setStatus] = useState("");

  React.useEffect(() => {
    const storedWallet = localStorage.getItem("employerWallet");
    if (storedWallet) {
      setWallet(JSON.parse(storedWallet));
    } else {
      const newWallet = createWallet();
      setWallet(newWallet);
      localStorage.setItem("employerWallet", JSON.stringify(newWallet));
    }
  }, []);

  const handleSend = async () => {
    if (!wallet) return;
    try {
      // Burada gerçek email -> cüzdan dönüşümü lazım, örnek için direkt input e-posta değil cüzdan adresi varsayıyorum
      const toPublicKey = email; // Burası gerçek projede e-posta -> cüzdan lookup ile değişmeli
      setStatus("Ödeme gönderiliyor...");
      const result = await sendPayment(wallet.secretKey, toPublicKey, amount);
      setStatus("Ödeme başarılı: " + result.hash);

      // Geçmişi localStorage veya state'de tutabilirsin
      const history = JSON.parse(localStorage.getItem("paymentHistory") || "[]");
      history.push({ to: toPublicKey, amount, date: new Date().toISOString(), txHash: result.hash });
      localStorage.setItem("paymentHistory", JSON.stringify(history));
    } catch (error) {
      setStatus("Hata: " + (error as Error).message);
    }
  };

  return (
    <div>
      <h1>Employer Ödeme Sayfası</h1>
      <input
        type="text"
        placeholder="Freelancer Cüzdan Adresi (email değil)"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="Tutar"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={handleSend}>Gönder</button>
      <p>{status}</p>
    </div>
  );
};

export default EmployerPage;
