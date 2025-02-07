import React, { createContext, useContext, useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, AccountLayout } from "@solana/spl-token";

const USDC_MINT_ADDRESS = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");

const BalanceContext = createContext<number | null>(null);

export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchUSDCBalance = async () => {
      if (publicKey) {
        const connection = new Connection("https://api.devnet.solana.com");
        const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID,
        });

        let usdcBalance = 0;
        tokenAccounts.value.forEach((accountInfo) => {
          const accountData = AccountLayout.decode(accountInfo.account.data);
          if (new PublicKey(accountData.mint).equals(USDC_MINT_ADDRESS)) {
            usdcBalance = Number(accountData.amount) / 1e6;
          }
        });

        setBalance(usdcBalance);
      }
    };

    fetchUSDCBalance();
  }, [publicKey]);

  return (
    <BalanceContext.Provider value={balance}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalanceContext = () => {
  const context = useContext(BalanceContext);
  if (context === undefined) {
    throw new Error("useBalanceContext must be used within a BalanceProvider");
  }
  return context;
}; 