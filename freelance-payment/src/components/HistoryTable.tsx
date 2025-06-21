import React, { useEffect, useState } from "react";

interface PaymentRecord {
  to: string;
  amount: string;
  date: string;
  txHash: string;
}

const HistoryTable = () => {
  const [history, setHistory] = useState<PaymentRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("paymentHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  return (
    <div>
      <h2>Ödeme Geçmişi</h2>
      <table>
        <thead>
          <tr>
            <th>Alıcı</th>
            <th>Tutar</th>
            <th>Tarih</th>
            <th>Tx Hash</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record, i) => (
            <tr key={i}>
              <td>{record.to}</td>
              <td>{record.amount}</td>
              <td>{new Date(record.date).toLocaleString()}</td>
              <td>
                <a
                  href={`https://testnet.stellarscan.io/tx/${record.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {record.txHash.slice(0, 10)}...
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
