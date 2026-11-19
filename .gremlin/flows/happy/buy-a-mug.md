---
title: A shopper can buy a mug
type: happy
platforms:
  - web
start: /
source: gremlin init
status: active
tags:
  - checkout
  - cart
created: 2026-11-18T10:00:00.000Z
---

1. Open the Ash Glaze Mug from the shop
2. Click "Add to cart"
3. Open the cart and click "Checkout"
4. Fill in the checkout form with the name "Sam Rivera", the email sam@example.test, the address "12 Clay Street" and the city "Portland"
5. Click "Place order"

## Expect

- An order confirmation page says "Thank you, Sam Rivera!"
- The confirmation shows an order number
