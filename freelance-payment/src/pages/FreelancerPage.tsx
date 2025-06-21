import React, { useState, useEffect } from "react";
import { getBalance, createWallet } from "../services/stellar";

const FreelancerPage = () => {
  const [wallet, setWallet] = useState<{ publicKey: string; secretKey: string } | null>(null);
  const [balance, setBalance] = useState<string>("0");

  useEffect(() => {
    const storedWallet = localStorage.getItem("freelancerWallet");
    if (storedWallet) {
      const parsed = JSON.parse(storedWallet);
      setWallet(parsed);
    } else {
      const newWallet = createWallet();
      setWallet(newWallet);
      localStorage.setItem("freelancerWallet", JSON.stringify(newWallet));
    }
  }, []);

  useEffect(() => {
    if (wallet) {
      getBalance(wallet.publicKey).then(setBalance);
    }
  }, [wallet]);

  return (
    <div>
      <h1>Freelancer Cüzdan</h1>
      {wallet && (
        <>
          <p>Cüzdan Adresi: {wallet.publicKey}</p>
          <p>Bakiye: {balance} XLM</p>
        </>
      )}
    </div>
  );
};

export default FreelancerPage;
