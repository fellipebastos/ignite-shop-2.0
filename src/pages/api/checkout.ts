import { NextApiRequest, NextApiResponse } from "next";

import { stripe } from "@/src/api/stripe";

interface Product {
  defaultPriceId: string;
  quantity: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { products } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method not allowed.' } });
  }

  if (!products?.length) {
    return res.status(400).json({ error: { message: 'Products were not found.' } });
  }

  const domainURL = process.env.NEXT_URL;

  const line_items =  products.map((product: Product) => ({
    price: product.defaultPriceId,
    quantity: product.quantity,
  }));

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/`,
    mode: 'payment',
    line_items,
  });

  return res.status(200).json({
    checkoutUrl: checkoutSession.url
  });
}
