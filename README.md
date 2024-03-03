![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)

# Waktu Solat API | Malaysia Prayer Time API

> Formally 'MPT Server'

A Malaysia Prayer Time REST API server, originally build for [Malaysia Prayer Time](https://github.com/mptwaktusolat/app_waktu_solat_malaysia) app. Provide necessary data and procssing for the app features to work.

## Getting Started

### Prepare environment

> [!NOTE]
> If you didn't plan to use` /api/jadual_solat` endpoint, you may skip this step and proceed to [Start development server](#start-development-server)

Create `.env.local` at the root the project. Example environment vars are in the `.env.example` file. Or run:

```
cp .env.example .env.local
```

`/api/jadual_solat` will generate PDF based on the prayer data. To do so, it need to access Chrome. In development, you can use your local Chrome, but on Production, you need to setup the Chrome instance somewhere. I use https://www.browserless.io/ service.

Grab the API key and paste to `BROWSERLESS_TOKEN` key.

### Start development server


First, install the dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## (Optional) Make your own Firestore database instance

`/api/v2/solat` endpoint will fetch the prayer data from Firestore datatabase. To prepare the data needed, see https://github.com/mptwaktusolat/waktusolat-fetcher.


Once setup, set `FIREBASE_API_KEY` to your own Firebase API key.


## How are the prayer time data is updated every month? (Old method)

> [!NOTE]
> This method is used to update the `/solat` endpoint. Now that the endpoint is deprecated, I'll stop the automatic workflow soon. For latest method on fetching the prayer time, see [waktusolat-fetcher](https://github.com/mptwaktusolat/waktusolat-fetcher)


The data is updated automatically every month using GitHub Action. The overall flow is depicted in the diagram below.

```mermaid
flowchart TD
    A{{JAKIM}}
    A <--> C
    C[[Fetch latest prayer data]] --- D[(db.json)] & E[(log.json)] --> F(Commit & push)
    F -->|Vercel build triggered| G[Deployed to Vercel]
```

View the fetcher implementation [here](./fetcher).

### Deployment status

[![deploy live website](https://github.com/mptwaktusolat/mpt-server/actions/workflows/vercel-prod.yml/badge.svg)](https://github.com/mptwaktusolat/mpt-server/actions/workflows/vercel-prod.yml)
[![deploy preview website on branches](https://github.com/mptwaktusolat/mpt-server/actions/workflows/vercel-preview.yml/badge.svg)](https://github.com/mptwaktusolat/mpt-server/actions/workflows/vercel-preview.yml)

### API endpoints

#### Public usage

See https://api.waktusolat.app/docs

#### Internal usage (MPT App)
* **`POST`** `/api/feedback`