// Kiln: a tiny ceramics shop. Zero dependencies: `node server.js`.
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { products, coupons } from './data.js';

const PORT = Number(process.env.PORT ?? 4000);
const css = readFileSync(new URL('./public/styles.css', import.meta.url), 'utf8');
const clientJs = readFileSync(new URL('./public/app.js', import.meta.url), 'utf8');

// ---------------------------------------------------------------------------
// State (in memory: this is a demo shop)

const carts = new Map(); // sid -> Map(slug -> qty)
let orders = [];
let nextOrderId = 1041;

const money = (cents) => `$${(cents / 100).toFixed(2)}`;
const findProduct = (slug) => products.find((p) => p.slug === slug);

function cartFor(sid) {
  if (!carts.has(sid)) carts.set(sid, new Map());
  return carts.get(sid);
}

function cartLines(sid) {
  return [...cartFor(sid).entries()]
    .map(([slug, qty]) => ({ product: findProduct(slug), qty }))
    .filter((l) => l.product);
}

function cartTotals(sid, couponCode) {
  const lines = cartLines(sid);
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const coupon = couponCode ? coupons[couponCode] : undefined;
  const discount = coupon ? Math.round((subtotal * coupon.percent) / 100) : 0;
  const shipping = subtotal > 0 && subtotal < 6000 ? 600 : 0;
  return { lines, subtotal, discount, shipping, total: subtotal - discount + shipping, coupon };
}

// ---------------------------------------------------------------------------
// HTML

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function layout(sid, title, body) {
  const count = [...cartFor(sid).values()].reduce((a, b) => a + b, 0);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · Kiln</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><path d='M9 6h14l-2 6c3 2 4 5 4 8 0 5-4 8-9 8s-9-3-9-8c0-3 1-6 4-8z' fill='%23b4532a'/></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<header class="top">
  <a class="logo" href="/">Kiln<span>.</span></a>
  <form class="search" action="/search" method="get" role="search">
    <input type="search" name="q" placeholder="Search mugs, bowls, vases" aria-label="Search">
    <button type="submit">Search</button>
  </form>
  <nav>
    <a href="/orders">Orders</a>
    <a class="cart-link" href="/cart"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 7h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg><span class="count" data-cart-count>${count}</span></a>
  </nav>
</header>
<main>${body}</main>
<footer>Handmade in small batches · Free shipping over $60 · <a href="/orders">Your orders</a></footer>
<div class="toast" role="status" aria-live="polite"></div>
<script>${clientJs}</script>
</body>
</html>`;
}

function productArt(p, size = 220) {
  return `<svg class="art" viewBox="0 0 200 200" width="${size}" height="${size}" aria-hidden="true">
  <rect width="200" height="200" fill="${p.bg}"/>
  <ellipse cx="100" cy="168" rx="58" ry="9" fill="#00000014"/>
  ${p.shape === 'mug' ? `<path d="M60 60h70v80a20 20 0 0 1-20 20H80a20 20 0 0 1-20-20Z" fill="${p.glaze}"/><path d="M130 80c22 0 22 40 0 40" fill="none" stroke="${p.glaze}" stroke-width="10"/><path d="M60 60h70v14H60z" fill="#ffffff22"/>` : ''}
  ${p.shape === 'bowl' ? `<path d="M40 90h120a60 60 0 0 1-120 0Z" fill="${p.glaze}"/><ellipse cx="100" cy="90" rx="60" ry="10" fill="#ffffff2a"/>` : ''}
  ${p.shape === 'vase' ? `<path d="M85 40h30v20c25 15 30 45 22 75-5 20-20 28-37 28s-32-8-37-28c-8-30-3-60 22-75Z" fill="${p.glaze}"/><rect x="85" y="40" width="30" height="8" fill="#ffffff2a"/>` : ''}
  ${p.shape === 'plate' ? `<ellipse cx="100" cy="110" rx="75" ry="38" fill="${p.glaze}"/><ellipse cx="100" cy="106" rx="48" ry="22" fill="#ffffff22"/>` : ''}
</svg>`;
}

function card(p) {
  return `<a class="card" href="/product/${p.slug}">
  ${productArt(p)}
  <div class="meta"><h3>${esc(p.name)}</h3><span>${money(p.price)}</span></div>
  <p>${esc(p.blurb)}</p>
</a>`;
}

const pages = {
  home(sid) {
    return layout(
      sid,
      'Handmade ceramics',
      `<section class="hero">
  <p class="eyebrow">New kiln batch · Autumn</p>
  <h1>Ceramics for slow mornings.</h1>
  <p class="lede">Wheel-thrown mugs, bowls and vases, glazed by hand in small batches.</p>
</section>
<section class="grid">${products.map(card).join('')}</section>`,
    );
  },

  product(sid, slug) {
    const p = findProduct(slug);
    if (!p) return null;
    return layout(
      sid,
      p.name,
      `<section class="product">
  <div class="product-art">${productArt(p, 420)}</div>
  <div class="product-info">
    <p class="eyebrow">${esc(p.shape)}</p>
    <h1>${esc(p.name)}</h1>
    <p class="price">${money(p.price)}</p>
    <p>${esc(p.description)}</p>
    <button class="primary" data-add-to-cart="${p.slug}">Add to cart</button>
    <a class="ghost" href="/cart">View cart</a>
  </div>
</section>`,
    );
  },

  cart(sid) {
    const { lines, subtotal, shipping, total } = cartTotals(sid);
    if (!lines.length) {
      return layout(sid, 'Your cart', `<section class="narrow"><h1>Your cart</h1><p class="empty">Your cart is empty. <a href="/">Browse the shop</a></p></section>`);
    }
    return layout(
      sid,
      'Your cart',
      `<section class="narrow">
  <h1>Your cart</h1>
  <ul class="lines">
    ${lines
      .map(
        (l) => `<li>
      ${productArt(l.product, 72)}
      <div><strong>${esc(l.product.name)}</strong><span>${money(l.product.price)} each</span></div>
      <label class="qty">Quantity <input type="number" min="1" value="${l.qty}" data-qty="${l.product.slug}"></label>
      <button class="ghost" data-update="${l.product.slug}">Update</button>
      <span class="line-total">${money(l.product.price * l.qty)}</span>
    </li>`,
      )
      .join('')}
  </ul>
  <dl class="totals">
    <dt>Subtotal</dt><dd>${money(subtotal)}</dd>
    <dt>Shipping</dt><dd>${shipping ? money(shipping) : 'Free'}</dd>
    <dt class="grand">Total</dt><dd class="grand" data-total>${money(total)}</dd>
  </dl>
  <a class="primary block" href="/checkout">Checkout</a>
</section>`,
    );
  },

  checkout(sid) {
    const { lines, subtotal, shipping, total } = cartTotals(sid);
    if (!lines.length) {
      return layout(sid, 'Checkout', `<section class="narrow"><h1>Checkout</h1><p class="empty">Your cart is empty. <a href="/">Browse the shop</a></p></section>`);
    }
    return layout(
      sid,
      'Checkout',
      `<section class="checkout">
  <form id="checkout" novalidate>
    <h1>Checkout</h1>
    <label for="name">Full name</label>
    <input id="name" name="name" autocomplete="name" required>
    <label for="email">Email</label>
    <input id="email" name="email" type="email" autocomplete="email" required>
    <label for="phone">Phone (optional)</label>
    <input id="phone" name="phone" type="tel" autocomplete="tel">
    <label for="address">Address</label>
    <input id="address" name="address" autocomplete="street-address" required>
    <label for="city">City</label>
    <input id="city" name="city" autocomplete="address-level2" required>
    <label for="coupon">Coupon code</label>
    <div class="row">
      <input id="coupon" name="coupon" autocomplete="off">
      <button type="button" class="ghost" data-apply-coupon>Apply</button>
    </div>
    <p class="coupon-msg" data-coupon-msg></p>
    <p class="form-error" data-form-error></p>
    <button type="submit" class="primary block" data-place-order>Place order</button>
  </form>
  <aside class="summary">
    <h2>Order summary</h2>
    <ul>${lines.map((l) => `<li><span>${esc(l.product.name)} × ${l.qty}</span><span>${money(l.product.price * l.qty)}</span></li>`).join('')}</ul>
    <dl class="totals">
      <dt>Subtotal</dt><dd data-subtotal>${money(subtotal)}</dd>
      <dt>Discount</dt><dd data-discount>${money(0)}</dd>
      <dt>Shipping</dt><dd>${shipping ? money(shipping) : 'Free'}</dd>
      <dt class="grand">Total</dt><dd class="grand" data-total>${money(total)}</dd>
    </dl>
  </aside>
</section>`,
    );
  },

  order(sid, id) {
    const o = orders.find((x) => String(x.id) === id && x.sid === sid);
    if (!o) return null;
    return layout(
      sid,
      `Order #${o.id}`,
      `<section class="narrow confirm">
  <p class="eyebrow">Order confirmed</p>
  <h1>Thank you, ${esc(o.name)}!</h1>
  <p>Order <strong>#${o.id}</strong> is confirmed. A receipt is on its way to ${esc(o.email)}.</p>
  <dl class="totals"><dt class="grand">Total paid</dt><dd class="grand">${money(o.total)}</dd></dl>
  <a class="ghost" href="/orders">See all your orders</a>
</section>`,
    );
  },

  orders(sid) {
    const mine = orders.filter((o) => o.sid === sid);
    return layout(
      sid,
      'Your orders',
      `<section class="narrow">
  <h1>Your orders</h1>
  ${
    mine.length
      ? `<ul class="orders">${mine
          .map((o) => `<li><a href="/order/${o.id}">Order #${o.id}</a><span>${o.items} item${o.items === 1 ? '' : 's'}</span><span>${money(o.total)}</span></li>`)
          .join('')}</ul>`
      : '<p class="empty">No orders yet.</p>'
  }
</section>`,
    );
  },

  search(sid, q) {
    const term = q.trim().toLowerCase();
    const results = term ? products.filter((p) => `${p.name} ${p.blurb} ${p.shape}`.toLowerCase().includes(term)) : [];
    return layout(
      sid,
      `Search`,
      `<section class="narrow"><h1>Results for “${q}”</h1>
  ${results.length ? `<section class="grid">${results.map(card).join('')}</section>` : '<p class="empty">Nothing matched. Try “mug” or “bowl”.</p>'}
</section>`,
    );
  },

  notFound(sid) {
    return layout(sid, 'Not found', `<section class="narrow"><h1>Page not found</h1><p><a href="/">Back to the shop</a></p></section>`);
  },

  error(sid) {
    return layout(sid, 'Error', `<section class="narrow"><h1>Something went wrong</h1><p>Please try again in a moment.</p></section>`);
  },
};

// ---------------------------------------------------------------------------
// API

async function readBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
  } catch {
    return {};
  }
}

const api = {
  async 'POST /api/cart/add'(req, res, sid) {
    const { slug } = await readBody(req);
    if (!findProduct(slug)) return send(res, 404, { error: 'Unknown product' });
    const cart = cartFor(sid);
    cart.set(slug, (cart.get(slug) ?? 0) + 1);
    send(res, 200, { count: [...cart.values()].reduce((a, b) => a + b, 0) });
  },

  async 'POST /api/cart/update'(req, res, sid) {
    const { slug, qty } = await readBody(req);
    const cart = cartFor(sid);
    if (!cart.has(slug)) return send(res, 404, { error: 'Not in cart' });
    const n = parseInt(qty, 10);
    if (Number.isNaN(n)) return send(res, 400, { error: 'Quantity must be a number' });
    if (n === 0) cart.delete(slug);
    else cart.set(slug, n);
    send(res, 200, { ok: true });
  },

  async 'POST /api/coupon'(req, res, sid) {
    const { code } = await readBody(req);
    const { coupon, subtotal, discount, shipping, total } = cartTotals(sid, code);
    if (!coupon) return send(res, 200, { valid: false, message: 'That coupon code is not valid.' });
    send(res, 200, { valid: true, message: `${coupon.label} applied.`, subtotal: money(subtotal), discount: `−${money(discount)}`, shipping, total: money(total) });
  },

  async 'POST /api/orders'(req, res, sid) {
    const body = await readBody(req);
    const missing = ['name', 'email', 'address', 'city'].filter((k) => !String(body[k] ?? '').trim());
    if (missing.length) return send(res, 400, { error: `Please fill in: ${missing.join(', ')}.` });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) return send(res, 400, { error: 'Please enter a valid email address.' });
    const { lines, total } = cartTotals(sid, body.coupon);
    if (!lines.length) return send(res, 400, { error: 'Your cart is empty.' });

    const order = {
      id: nextOrderId++,
      sid,
      name: body.name.trim(),
      email: body.email.trim(),
      items: lines.reduce((a, l) => a + l.qty, 0),
      total,
      createdAt: new Date().toISOString(),
    };
    orders.push(order);
    // Let the fulfilment proxy route the receipt without parsing the body.
    res.setHeader('X-Order-Ref', `${order.id}:${order.name}`);
    send(res, 201, { id: order.id });
  },

  async 'POST /__reset'(_req, res) {
    if (process.env.NODE_ENV === 'production') return send(res, 404, { error: 'Not found' });
    carts.clear();
    orders = [];
    nextOrderId = 1041;
    send(res, 200, { ok: true });
  },
};

function send(res, status, data) {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(data));
}

function html(res, status, body) {
  res.writeHead(status, { 'content-type': 'text/html; charset=utf-8' });
  res.end(body);
}

function session(req, res) {
  const m = /(?:^|;\s*)kiln_sid=([\w-]+)/.exec(req.headers.cookie ?? '');
  if (m) return m[1];
  const sid = randomUUID();
  res.setHeader('set-cookie', `kiln_sid=${sid}; Path=/; HttpOnly; SameSite=Lax`);
  return sid;
}

// ---------------------------------------------------------------------------

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const sid = session(req, res);
  try {
    const handler = api[`${req.method} ${url.pathname}`];
    if (handler) return await handler(req, res, sid);
    if (req.method !== 'GET') return send(res, 405, { error: 'Method not allowed' });

    if (url.pathname === '/') return html(res, 200, pages.home(sid));
    if (url.pathname === '/cart') return html(res, 200, pages.cart(sid));
    if (url.pathname === '/checkout') return html(res, 200, pages.checkout(sid));
    if (url.pathname === '/orders') return html(res, 200, pages.orders(sid));
    if (url.pathname === '/search') return html(res, 200, pages.search(sid, decodeURIComponent(url.searchParams.get('q') ?? '')));
    const product = /^\/product\/([\w-]+)$/.exec(url.pathname);
    if (product) {
      const page = pages.product(sid, product[1]);
      return page ? html(res, 200, page) : html(res, 404, pages.notFound(sid));
    }
    const order = /^\/order\/(\d+)$/.exec(url.pathname);
    if (order) {
      const page = pages.order(sid, order[1]);
      return page ? html(res, 200, page) : html(res, 404, pages.notFound(sid));
    }
    html(res, 404, pages.notFound(sid));
  } catch (err) {
    console.error(`${req.method} ${url.pathname}:`, err.message);
    if (res.headersSent) return res.end();
    res.removeHeader('X-Order-Ref');
    if (url.pathname.startsWith('/api/')) return send(res, 500, { error: 'Internal Server Error' });
    html(res, 500, pages.error(sid));
  }
}).listen(PORT, () => console.log(`Kiln is open at http://localhost:${PORT}`));
