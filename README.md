# Meridian Protocol

The staked-access protocol for x402 payments.

## Project Structure

```
meridian-monorepo/
├── apps/
│   ├── frontend/          # Next.js frontend application
│   └── backend/           # Backend API
├── packages/
│   ├── shared-types/      # Shared TypeScript types
│   ├── config/           # Shared configurations
│   └── ui-components/    # Shared UI components
├── turbo.json            # Turborepo configuration
├── pnpm-workspace.yaml   # PNPM workspace configuration
└── package.json          # Root package.json
```

## Getting Started

Prerequisites:
- Node.js 20+
- PNPM 9+

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build all packages
pnpm build
```

## Packages

### Frontend
Next.js application located in `apps/frontend/`.

Commands:
```bash
pnpm dev --filter=@meridian/frontend
pnpm build --filter=@meridian/frontend
```

### Shared Types
TypeScript type definitions in `packages/shared-types/`.

```typescript
import { X402Payment, ApiResponse } from '@meridian/shared-types'
```

### Shared Config
Configuration constants in `packages/config/`.

```typescript
import { API_CONFIG, BLOCKCHAIN_CONFIG } from '@meridian/config'
```

## Development

```bash
# Start all applications
pnpm dev

# Start specific application
pnpm dev --filter=@meridian/frontend
pnpm dev --filter=@meridian/backend

# Build specific package
pnpm build --filter=@meridian/shared-types
pnpm build --filter=@meridian/frontend

# Type checking
pnpm type-check
pnpm type-check --filter=@meridian/frontend

# Linting
pnpm lint
pnpm lint --filter=@meridian/frontend
```

## Backend Integration

The backend can import shared types and config:

```typescript
// Backend API route
import { ApiResponse, X402Payment } from '@meridian/shared-types'
import { API_CONFIG } from '@meridian/config'

export async function getPayments(): Promise<ApiResponse<X402Payment[]>> {
  return {
    success: true,
    data: payments
  }
}
```

```typescript
// Frontend usage
import { apiService } from '@/lib/api'

const { data: payments } = await apiService.getPayments()
```

## Adding Packages

Create a new directory in `packages/` with a `package.json` file using the `@meridian/package-name` naming convention.

```bash
mkdir packages/new-package
cd packages/new-package
npm init -y
# Edit package.json to set name to "@meridian/new-package"
``` 