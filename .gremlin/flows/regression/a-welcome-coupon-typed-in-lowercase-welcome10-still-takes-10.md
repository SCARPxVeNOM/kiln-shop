---
title: A welcome coupon typed in lowercase (welcome10) still takes 10% off at checkout
type: regression
platforms:
  - web
start: /product/ember-vase
source: capture:github:#1
status: active
tags:
  - checkout
  - coupon
bug: BUG-001
fail_first: RUN-20261120-020623-ba065d
created: 2026-11-19T20:32:40.239Z
---

1. Click "Add to cart"
2. Click the cart icon at the top right, then click "Checkout"
3. Click the "Coupon code" field and type welcome10 in all lowercase letters. This is the shop's real WELCOME10 welcome code, typed in lowercase the way a customer might. Then click "Apply"
4. Wait until a message appears under the "Coupon code" field

## Expect

- The "Coupon code" field still contains welcome10 in lowercase
- The message under the "Coupon code" field reads "10% welcome discount applied."
- The message "That coupon code is not valid." is not shown on the page
- In the Order summary, the Discount line shows $6.40 off, not $0.00
- In the Order summary, the Total is $57.60, not $64.00

## Notes

Captured from https://github.com/SCARPxVeNOM/kiln-shop/issues/1:
> Coupon code welcome10 doesn't work at checkout
>
> Hi Kiln team,
>
> I typed welcome10 into the coupon box at checkout but it just says "That coupon code is not valid". The newsletter said it was 10% off my first order. I tried twice.
>
> You can reach me on [redacted-phone] if you need anything.
>
> Priya
Revised after Kane's triage of RUN-20261120-020241-500477: Added that welcome10 is the shop's real WELCOME10 code typed in lowercase, so Kane doesn't treat it as bad test data. Added a wait for the coupon message so the checks don't run before it appears. Changed the expectations to quote the exact success and error text and the totals from before and after the discount.
Claude Code disputes Kane's triage: Kane blamed the test data, but this is a real product bug. WELCOME10 is a valid coupon (data.js:65, README.md:20). The server looks it up with an exact-case match, `coupons[couponCode]` (server.js:35), and never changes the code's case. So "welcome10" finds nothing, and the server replies "That coupon code is not valid." (server.js:300). The page then leaves the Discount at $0.00 and the Total unchanged (public/app.js:42-47, server.js:200). Kane's own run shows exactly this: after Apply, the Discount was $0.00 and the Total was $64.00. That matches the customer's report that welcome10 is rejected, so the flow failed for the right reason.
