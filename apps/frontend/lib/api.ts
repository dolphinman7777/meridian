import { 
  ApiResponse, 
  X402Payment, 
  CreatePaymentRequest, 
  PaymentResponse,
  User,
  AuthRequest,
  AuthResponse,
  ProtocolStats,
  TokenMetrics 
} from '@meridian/shared-types'
import { API_CONFIG } from '@meridian/config'

class ApiService {
  private baseUrl: string
  private timeout: number

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl
    this.timeout = API_CONFIG.timeout
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      clearTimeout(timeoutId)
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Authentication methods
  async authenticate(authData: AuthRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(authData),
    })
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/me')
  }

  // Payment methods
  async createPayment(paymentData: CreatePaymentRequest): Promise<ApiResponse<PaymentResponse>> {
    return this.request<PaymentResponse>('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    })
  }

  async getPayments(): Promise<ApiResponse<X402Payment[]>> {
    return this.request<X402Payment[]>('/payments')
  }

  async getPayment(id: string): Promise<ApiResponse<X402Payment>> {
    return this.request<X402Payment>(`/payments/${id}`)
  }

  // Protocol statistics
  async getProtocolStats(): Promise<ApiResponse<ProtocolStats>> {
    return this.request<ProtocolStats>('/stats/protocol')
  }

  async getTokenMetrics(): Promise<ApiResponse<TokenMetrics>> {
    return this.request<TokenMetrics>('/stats/tokenomics')
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.request<{ status: string; timestamp: string }>('/health')
  }
}

// Export singleton instance
export const apiService = new ApiService()

// Export types for easy import
export type {
  ApiResponse,
  X402Payment,
  CreatePaymentRequest,
  PaymentResponse,
  User,
  AuthRequest,
  AuthResponse,
  ProtocolStats,
  TokenMetrics
} from '@meridian/shared-types' 