(function () {
  const toast = document.querySelector('.toast');
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(say.t);
    say.t = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  async function post(url, body) {
    const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  }

  document.addEventListener('click', async (e) => {
    const add = e.target.closest('[data-add-to-cart]');
    if (add) {
      const { ok, data } = await post('/api/cart/add', { slug: add.dataset.addToCart });
      if (ok) {
        document.querySelector('[data-cart-count]').textContent = data.count;
        say('Added to cart');
      }
      return;
    }

    const update = e.target.closest('[data-update]');
    if (update) {
      const slug = update.dataset.update;
      const qty = document.querySelector(`[data-qty="${slug}"]`).value;
      const { ok, data } = await post('/api/cart/update', { slug, qty });
      if (ok) location.reload();
      else say(data.error || 'Could not update the cart');
      return;
    }

    const apply = e.target.closest('[data-apply-coupon]');
    if (apply) {
      const code = document.getElementById('coupon').value;
      const msg = document.querySelector('[data-coupon-msg]');
      const { data } = await post('/api/coupon', { code });
      msg.textContent = data.message;
      msg.className = 'coupon-msg ' + (data.valid ? 'ok' : 'bad');
      if (data.valid) {
        document.querySelector('[data-discount]').textContent = data.discount;
        document.querySelector('.summary [data-total]').textContent = data.total;
      }
    }
  });

  const form = document.getElementById('checkout');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const error = document.querySelector('[data-form-error]');
      error.textContent = '';
      const body = Object.fromEntries(new FormData(form).entries());
      const { ok, status, data } = await post('/api/orders', body);
      if (ok) {
        location.href = `/order/${data.id}`;
      } else if (status >= 500) {
        error.textContent = 'Something went wrong. Please try again.';
      } else {
        error.textContent = data.error || 'Please check the form.';
      }
    });
  }
})();
