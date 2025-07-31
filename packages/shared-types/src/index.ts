// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// User Types
export interface User {
  id: string
  address: string
  createdAt: string
  updatedAt: string
}

// X402 Payment Types
export interface X402Payment {
  id: string
  userId: string
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
  transactionHash?: string
  blockNumber?: number
  createdAt: string
  updatedAt: string
}

export interface CreatePaymentRequest {
  amount: number
  currency: string
  recipientAddress: string
  metadata?: Record<string, any>
}

export interface PaymentResponse {
  payment: X402Payment
  transactionId: string
}

// Staking Types
export interface StakePosition {
  id: string
  userId: string
  amount: number
  stakedAt: string
  unstakedAt?: string
  rewards: number
  status: 'active' | 'unstaking' | 'unstaked'
}

export interface StakeRequest {
  amount: number
  duration?: number // in days
}

// Tokenomics Types
export interface TokenMetrics {
  totalSupply: number
  circulatingSupply: number
  stakedAmount: number
  stakingRewardRate: number
  currentPrice?: number
}

// Protocol Types
export interface ProtocolStats {
  totalTransactions: number
  totalVolume: number
  activeUsers: number
  totalStaked: number
  averageTransactionTime: number
}

// Error Types
export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
}

// Authentication Types
export interface AuthRequest {
  address: string
  signature: string
  message: string
}

export interface AuthResponse {
  user: User
  token: string
  expiresAt: string
}

// Export all types
export * from './index' 