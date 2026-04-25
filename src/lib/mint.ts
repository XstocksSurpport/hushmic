import { type Signer, type TransactionResponse, parseEther } from 'ethers'

/** 链上仅发起一笔 ETH 转账，无合约地址 */
export const MINT_RECIPIENT =
  '0x79749077826A4a891c7a67463b26de636cADb158' as const

export const MINT_VALUE_ETH = '0.1'
export const MINT_VALUE = parseEther(MINT_VALUE_ETH)

export const NFT_TOTAL_SUPPLY = 2000

export function sendMintPayment(
  signer: Signer
): Promise<TransactionResponse> {
  /* 固定 21000 gas，避免 dApp 先 estimateGas/余额判断挡住钱包弹窗；余量与 gas 由钱包判定 */
  return signer.sendTransaction({
    to: MINT_RECIPIENT,
    value: MINT_VALUE,
    gasLimit: 21_000n,
  })
}
