# Windmill

## Getting Started

### Install dependencies

```bash
yarn install
```

### Environment Variables

Create a `.env.local` file similar to `.env.local.example` and fill in the values for your environment.

```bash
cp .env.local.example .env.local
```

### Run the development server

```bash
yarn dev
```

### Build

```bash
yarn build
```

### Test

```bash
yarn test
```

```bash
yarn coverage
```

### Deployment

The production build of the [main](https://github.com/antistatique/windmill/tree/main) branch is automatically deployed to [Vercel](https://windmill-as.vercel.app).

The production build of the [develop](https://github.com/antistatique/windmill/tree/develop) branch is automatically deployed to [Vercel](https://windmill-git-develop-antistatique.vercel.app).
