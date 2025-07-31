// Environment configurations
export const ENV = {
  development: 'development',
  production: 'production',
  test: 'test',
} as const

export type Environment = keyof typeof ENV

// API configurations
export const API_CONFIG = {
  baseUrl: process.env.API_BASE_URL || 'http://localhost:3001',
  timeout: 30000,
  retries: 3,
} as const

// Blockchain configurations
export const BLOCKCHAIN_CONFIG = {
  networks: {
    mainnet: {
      chainId: 1,
      name: 'Ethereum Mainnet',
      rpcUrl: process.env.MAINNET_RPC_URL || '',
    },
    sepolia: {
      chainId: 11155111,
      name: 'Sepolia Testnet',
      rpcUrl: process.env.SEPOLIA_RPC_URL || '',
    },
  },
  contracts: {
    x402: {
      mainnet: process.env.X402_CONTRACT_MAINNET || '',
      sepolia: process.env.X402_CONTRACT_SEPOLIA || '',
    },
    staking: {
      mainnet: process.env.STAKING_CONTRACT_MAINNET || '',
      sepolia: process.env.STAKING_CONTRACT_SEPOLIA || '',
    },
  },
} as const

// Database configurations
export const DATABASE_CONFIG = {
  connectionTimeout: 30000,
  queryTimeout: 60000,
  maxConnections: 10,
} as const

// Security configurations
export const SECURITY_CONFIG = {
  jwtExpiresIn: '24h',
  bcryptRounds: 12,
  rateLimits: {
    api: 100, // requests per minute
    auth: 5,  // auth attempts per minute
  },
} as const

// Application configurations
export const APP_CONFIG = {
  name: 'Meridian Protocol',
  version: '1.0.0',
  description: 'The staked-access protocol for x402 payments',
  supportEmail: 'support@meridian.protocol',
} as const

// Feature flags
export const FEATURE_FLAGS = {
  enableStaking: process.env.ENABLE_STAKING === 'true',
  enableNotifications: process.env.ENABLE_NOTIFICATIONS === 'true',
  enableAnalytics: process.env.ENABLE_ANALYTICS === 'true',
  maintenanceMode: process.env.MAINTENANCE_MODE === 'true',
} as const

// Color palette (matching your Tailwind config)
export const COLORS = {
  meridian: {
    50: '#BBF2D8',
    100: '#9BF2CA',
    200: '#48D995',
    300: '#27F293',
    400: '#11D97C',
    500: '#0FC970',
    600: '#0DB863',
    700: '#0BA656',
    800: '#099548',
    900: '#07843B',
  },
} as const

export * from './index' 