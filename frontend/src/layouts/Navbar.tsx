import React, { useState } from 'react';
import logo from '../assets/images/logo.svg';
import solanaLogo from '../assets/images/solana.png';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from "../contexts/WalletModalProvider"
import userAvatar from '../assets/images/users/avatar1.png';
import TermAgreementModal from '../components/TermAgreementModal';
import { useModalOpenContext } from '../contexts/ModalOpenContext';
import { useBalanceContext } from '../contexts/BalanceContext';
import DepositModal from '../components/DepositModal';
import DepositSuccessModal from '../components/DepositSuccessModal';
import DepositFailedModal from '../components/DepositFailedModal';
import WithdrawModal from '../components/WithdrawModal';
import WithdrawSuccessModal from '../components/WithdrawSuccessModal';
import WithdrawFailedModal from '../components/WithdrawFailedModal';

const Navbar: React.FC = () => {
  const { connecting, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const { 
    setIsManageWalletDropdownVisible,
    depositModalVisible,
    setDepositModalVisible,
    withdrawModalVisible,
    setWithdrawModalVisible
  } = useModalOpenContext();
  const balance = useBalanceContext();
  const [isTermAgreementModalOpen, setIsTermAgreementModalOpen] = useState(true);
  const [isDepositSuccessModalOpen, setIsDepositSuccessModalOpen] = useState(false);
  const [isDepositFailedModalOpen, setIsDepositFailedModalOpen] = useState(false);
  const [depositedAmount, setDepositedAmount] = useState<number>(0);
  const [transactionLink, setTransactionLink] = useState<string>("");
  const [withdrewAmount, setWithdrewAmount] = useState<number>(0);
  const [isWithdrawSuccessModalOpen, setIsWithdrawSuccessModalOpen] = useState(false);
  const [isWithdrawFailedModalOpen, setIsWithdrawFailedModalOpen] = useState(false);

  const handleConnect = async () => {
    setVisible(true);
  };

  const handleOpenManageWalletDropdown = () => {
    setIsManageWalletDropdownVisible(true);
  };

  const depositResultCallback = (result: boolean, depositedAmount?: number, transactionLink?: string) => {
    if (result) {
      setDepositedAmount(depositedAmount ?? 0);
      setTransactionLink(transactionLink ?? "");
      setIsDepositSuccessModalOpen(true);
    } else {
      setIsDepositFailedModalOpen(true);
    }
  };

  const withdrawResultCallback = (result: boolean, withdrewAmount?: number, transactionLink?: string) => {
    if (result) {
      setWithdrewAmount(withdrewAmount ?? 0);
      setTransactionLink(transactionLink ?? "");
      setIsWithdrawSuccessModalOpen(true);
    } else {
      setIsWithdrawFailedModalOpen(true);
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <img src={logo} alt="Logo" className="logo-image h-full" />
          <div className="flex items-center gap-4">
            <button className="rounded-lg py-2 px-3 bg-card-primary text-gray-primary">Crypto</button>
            <button className="rounded-lg py-2 px-3 text-gray-secondary">Docs</button>
          </div>
        </div>
        <div>
          {!connected && (
            <div className="flex justify-end items-center gap-2">
              <div>
                <img src={solanaLogo} alt="Logo" className="w-[22px] h-5" />
              </div>
              <button
                className="bg-yellow p-2 rounded-lg text-black text-base leading-5 font-oxanium font-semibold"
                onClick={handleConnect}
              >
                {connecting ? 'Connecting' : 'Connect'}
              </button>
            </div>
          )}
          {connected && (
            <div className="flex justify-end items-center gap-2">
              <p className="text-gray-primary text-base leading-tight p-2 rounded-lg hover:bg-card-primary hover:text-gray-secondary">$ {balance !== null ? balance.toFixed(2) : "0.00"}</p>
              <button className="w-9 h-9 rounded-full overflow-hidden" onClick={handleOpenManageWalletDropdown}>
                <img src={userAvatar} alt="User Avatar" className="w-full h-full object-cover" />
              </button>
            </div>
          )}
        </div>
      </nav>
      {isTermAgreementModalOpen && <TermAgreementModal setOpen={setIsTermAgreementModalOpen} />}
      {depositModalVisible && <DepositModal callback={depositResultCallback} setOpen={setDepositModalVisible} />}
      {isDepositSuccessModalOpen &&
        <DepositSuccessModal
          depositedAmount={depositedAmount}
          transactionLink={transactionLink}
          setOpen={setIsDepositSuccessModalOpen}
        />
      }
      {isDepositFailedModalOpen && <DepositFailedModal setOpen={setIsDepositFailedModalOpen} />}
      {withdrawModalVisible && <WithdrawModal callback={withdrawResultCallback} setOpen={setWithdrawModalVisible} />}
      {isWithdrawSuccessModalOpen &&
        <WithdrawSuccessModal
          withdrewAmount={withdrewAmount}
          transactionLink={transactionLink}
          setOpen={setIsWithdrawSuccessModalOpen}
        />
      }
      {isWithdrawFailedModalOpen && <WithdrawFailedModal setOpen={setIsWithdrawFailedModalOpen} />}
    </>
  );
};

export default Navbar;
