This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Portfolio AI chat

The floating assistant appears on the home page and project pages. It answers using the portfolio's project data and profile information.

Copy `.env.example` to `.env.local`, set `OPENAI_API_KEY`, and restart the development server. Set the same server-side environment variable in your deployment settings. `OPENAI_MODEL` defaults to `gpt-5.4-mini`; overrides must support `reasoning.effort: none`. The key is used only by `/api/chat` and is never included in the browser bundle.

Without a key, chat shows a contact fallback instead of generating replies. No live model response can be verified until a valid key is configured. Conversations stay in page memory and requests use `store: false`. The endpoint limits conversation length, reply length, and bursts per server instance; configure deployment-level rate and spend limits for public hosting.

The integration uses the [OpenAI Responses API](https://developers.openai.com/api/docs/guides/text).

Run the endpoint checks with `node --experimental-default-type=module --test tests/chat-route.test.mjs`. These use a mocked AI provider and do not make paid requests.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
