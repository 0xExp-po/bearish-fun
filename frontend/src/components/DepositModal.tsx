import { useState } from "react";
import Modal from "./ui/Modal"
import Button from "./ui/Button";

const DepositModal = ({
  callback,
  setOpen,
  insufficientBalance = false
}: Props) => {
  const [depositAmount, setDepositAmount] = useState<string>("0");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [insufficientWalletBalance, _setInsufficientWalletBalance] = useState(true);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDeposit = () => {
    console.log(`Depositing: $${depositAmount}`);
    setOpen(false);
    callback(true, Number(depositAmount), "https://solana.com");
    // callback(false)
  };

  return (
    <Modal title="Deposit" onClose={() => setOpen(false)}>
      <div className="flex flex-col gap-6">
        {insufficientBalance && 
          <p className="text-base leading-tight text-negative-light">You don’t have enough funds in your balance to place this bet. Deposit more or reduce your bet to continue.</p>
        }
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-base leading-tight text-gray-secondary">
            <div><p>Deposit amount</p></div>
            <div className="flex gap-2">
              <p>$ 14.14</p>
              <p className="font-bold text-accent">Max</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className={`flex justify-between items-center border ${insufficientWalletBalance ? 'border-negative-light' : 'border-gray-tertiary'} rounded-lg p-2 text-base leading-tight`}>
              <div className="flex items-center gap-2 text-gray-secondary">
                <p>$</p>
                <input type="text" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} className="w-full" />
              </div>
              <p className="text-gray-tertiary">USDC</p>
            </div>
            {insufficientWalletBalance &&
              <p className="text-xs text-negative-light text-left">Not enough funds in your connected wallet.</p>
            }
          </div>
        </div>
        <div className="flex justify-between items-center text-base leading-tight">
          <p>Balance</p>
          <div className="flex items-center gap-2 text-gray-secondary">
            <p>$ 0.15</p>
            <img src="/src/assets/icons/arrow-right.png" alt="" className="" />
            <p>$ 14.29</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button title="Cancel" style="dark" className="py-4" onClick={handleCancel} />
          <Button title="Deposit" style="accent" className="py-4" disable={insufficientWalletBalance} onClick={handleDeposit} />
        </div>
        <div className="flex justify-between text-xs font-semibold">
          <p className="text-gray-secondary">Don’t have USDC on Solana?</p>
          <p className="text-accent">Swap or bridge here</p>
        </div>
      </div>
    </Modal>
  )
}

interface Props {
  callback: (result: boolean, depositedAmount?: number, transactionLink?: string) => void;
  setOpen: (open: boolean) => void;
  insufficientBalance?: boolean;
}

export default DepositModal