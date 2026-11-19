# Kiln

A tiny ceramics shop: browse, search, add to cart, check out with a coupon, see your orders.
No dependencies.

Kiln is the demo target for [Gremlin](https://github.com/SCARPxVeNOM/gremlin): it has real bugs in it, and its issues are
reproduced, fixed and proven by Kane CLI. Label an issue `gremlin` and Gremlin takes it from there: Kane reproduces it in a
real browser, a coding agent fixes it, Kane watches the fix work, and a pull request opens with Kane's before and after.

```bash
npm start     # http://localhost:4000
npm run dev   # same, restarting on every change
```

You don't need to start it for Gremlin: any command that needs the shop starts it (`app.start` in
`gremlin.config.yaml`) and restarts it after an agent changes the code. If you run it yourself, use `npm run dev` so
Kane always sees the latest code.

Routes: `/`, `/product/:slug`, `/cart`, `/checkout`, `/order/:id`, `/orders`, `/search?q=`.
Coupons: `WELCOME10`, `KILN20`.
