# <samp>GoLedger Challenge Web</samp>

<samp>The application serves as the frontend layer, communicating with a Hyperledger Fabric-based backend API that handles asset management and data persistence.</samp>
<samp>See more in challenge description.</samp>

<samp> 🎨 See the layout in [***Figma***](https://www.figma.com/design/RcixBYImRHpRlDCVXDxErS/Go-Ledger-Challenge?node-id=1-2&t=FHd6ngnbyU5wQYrj-1).</samp>

### ○ <samp>DEPLOY</samp>
 [![Netlify Status](https://api.netlify.com/api/v1/badges/9a3f54e8-c589-4c9b-aa0f-b15e92cbd67c/deploy-status)](https://hero-ensinio.netlify.app
)\
 <samp>Acesse o site **[aqui](https://tv-shows-goledger.netlify.app/)**.</samp>

## <samp>CORE STACK</samp>

| React | Next.js | TypeScript |
| :------------: | :---: | :------: |
| <samp>React 19</samp> | <samp>Next.js 16</samp> | <samp>TypeScript 5</samp> |

### <kbd></kbd> <samp>Data Fetching & State</samp>
- <samp>**React Query (@tanstack/react-query)** → Server state management, caching, and async data fetching</samp>
- <samp>**Native Fetch API** → HTTP requests (with abstraction layer)</samp>


### <kbd></kbd> <samp>UI & Design System</samp>

| Technology | Purpose |
|------------|---------|
| <samp>**CSS Modules**</samp> | Scoped and maintainable component styles |
| <samp>**Base UI**</samp> | Headless, accessible UI primitives |
| <samp>**Lucide React**</samp> | Modern icon library |
| <samp>**Fira Code**</samp> | Developer-friendly monospace font |


### <kbd></kbd> <samp>Developer Experience</samp>

| Technology | Purpose |
|------------|---------|
| <samp>**ESLint**</samp> | Static code analysis and linting |
| <samp>**Prettier**</samp> | Code formatting standardization |
| <samp>**Husky**</samp> | Git hooks automation |
| <samp>**lint-staged**</samp> | Run linters on staged files |
| <samp>**Jest**</samp> | Unit testing framework |
| <samp>**React Testing Library**</samp> | Component testing utilities |

---

## <samp>PROJECT STRUCTURE</samp>

- <samp>**App Router (Next.js)** → File-based routing with layouts and server components</samp>
- <samp>**Component-driven architecture** → Reusable and isolated UI components</samp>
- <samp>**Separation of concerns** → Services, hooks, and UI clearly divided</samp>
- <samp>**Scalable folder structure** → Designed for growth and maintainability</samp>

### <kbd></kbd> <samp>Proxy</samp>
<samp>All API requests are proxied through a catch-all route that handles communication with the backend.</samp>

| Route | Method | Description |
|-------|--------|-------------|
| <samp>`/api/[...path]`</samp> | <samp>GET, POST, PUT, PATCH, DELETE</samp> | <samp>Proxies to backend API</samp> |

```
challenge-web/
├── app/                   # Next.js App Router (pages, API routes, layouts)
├── services/              # API service layer (CRUD operations)
├── shared/                # Shared code (components, hooks, types, utils)
├── test/                  # Test utilities (mocks, wrapper)
├── public/                # Static assets
├── *.config.*             # Build & lint configuration
└── package.json           # Dependencies
```

### <kbd></kbd> <samp>Example: TV Shows Module Structure</samp>

```
app/(pages)/tv-shows/
├── (pages)/new/           # Create TV Show page
├── (pages)/[key]/         # TV Show detail page
├── (pages)/season/        # Season routes
├── (pages)/episode/       # Episode routes
├── components/            # TV Show components
└── hooks/                 # TV Show hooks
```

> <samp>Note: For full directory tree, see the actual file structure.</samp>

## <samp>RUN PROJECT</samp>

### <samp>1. Clone the Repository</samp>

```bash
git clone <repository-url>
cd goledger-challenge-web/challenge
```

### <samp>2. Install Dependencies</samp>

```bash
npm install
```

### <samp>3. Configure Environment Variables</samp>

<samp>Copy the example environment file and configure your settings:</samp>

```bash
cp .env.example .env
```

<samp>Edit `.env` with your API credentials:</samp>

```env
API_USERNAME=your_api_username
API_PASSWORD=your_api_password
API_BASE_URL=https://your-api-endpoint.com/api
NEXT_PUBLIC_SITE_URL=https://your-site-url.com
```

### <samp>4. Start the Development Server</samp>

```bash
npm run dev
```

<samp>Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.</samp>

## <samp>SCRIPTS</samp>

| Command | Description |
|---------|-------------|
| <samp>`npm run dev`</samp> | <samp>Start development server with hot reload</samp> |
| <samp>`npm run build`</samp> | <samp>Build optimized production bundle</samp> |
| <samp>`npm run start`</samp> | <samp>Start production server</samp> |
| <samp>`npm run lint`</samp> | <samp>Run ESLint checks</samp> |
| <samp>`npm run test`</samp> | <samp>Run Jest tests</samp> |
| <samp>`npm run test:watch`</samp> | <samp>Run tests in watch mode</samp> |
| <samp>`npm run format`</samp> | <samp>Format code with Prettier</samp> |

---

## <samp>TESTING</samp>

### <kbd></kbd> <samp>Run Tests</samp>

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage
```

### <kbd></kbd> <samp>Test Structure</samp>

```
test/
├── mocks/           # Mock data and API responses
├── wrapper.tsx      # Test wrapper with providers
└── *.test.tsx       # Component tests
```
