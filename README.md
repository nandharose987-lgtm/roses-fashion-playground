# Rose's Fashion Playground

My personal website for **Fabric to Fashion Essentials** (Master's in Fashion Entrepreneurship).
Built with **React** (using Vite), hosted on **Vercel**.

## What's in this folder

| Folder / file | What it is |
|---|---|
| `src/components/` | One file per section of the website (Hero, About, Work, Life, BigIdea, Contact…) |
| `src/content.js` | The work cards, map stops, drop ideas and drawings. Edit words here. |
| `src/assets/` | All the photos |
| `src/styles.css` | Colours, fonts and layout |
| `api/board.js` | The small backend that saves "Back this idea" and the notes |

## Going live (the short version)

1. **GitHub** keeps the code. **Vercel** turns the code into a real website.
2. On [vercel.com](https://vercel.com), sign in **with GitHub**, click **Add New → Project**, pick this repository and click **Deploy**. Vercel works out that it's a Vite/React site by itself.
3. To switch on "Back this idea" and the notes: in your Vercel project open **Storage → Create Database → Upstash (Redis) → Continue**, connect it to this project, then go to **Deployments** and click **Redeploy**.
4. Every time a change is pushed to GitHub, Vercel updates the website automatically.

## Running it on a computer (optional)

```bash
npm install
npm run dev
```

Then open the link it prints (usually http://localhost:5173). The notes need Vercel to work, so locally they show "not switched on yet". That's expected.

## Removing a note

Notes are stored in Upstash. In Vercel go to **Storage → your database → Open in Upstash → Data Browser**, open the `notes` list and delete the one you don't want.
