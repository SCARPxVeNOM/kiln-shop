---
title: My cart still has the mug after I placed the order
type: regression
platforms:
  - web
start: /
source: capture:github:#5
status: active
tags: []
bug: BUG-004
fail_first: RUN-20261120-173046-174fe6
created: 2026-11-20T17:30:45.363Z
---

1. Open the Ash Glaze Mug from the shop
2. Click "Add to cart"
3. Open the cart and click "Checkout"
4. Fill in the checkout form with the name "Sam Rivera", the email sam@example.test, the address "12 Clay Street" and the city "Portland"
5. Click "Place order" and wait for the "Thank you" confirmation page
6. Click the cart icon at the top of the page to open the cart. The order has just been paid for, so do not add, remove or change anything in the cart

## Expect

- The page heading is "Your cart" and the page says "Your cart is empty."
- The cart page does not list the Ash Glaze Mug or any other item
- The cart icon at the top shows 0

## Notes

Captured from https://github.com/SCARPxVeNOM/kiln-shop/issues/5:
> My cart still has the mug after I placed the order
>
> Hi,
>
> I bought an Ash Glaze Mug: added it to the cart, checked out and got the "Thank you" page. But the cart icon at the top still shows 1, and when I open the cart the mug is still in it, so it looks like I could accidentally order it twice.
>
> I expected the cart to be empty once the order went through.
>
> Thanks,
> Maya
