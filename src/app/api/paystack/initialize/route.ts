import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, amount, metadata, currency = "NGN" } = body;

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { success: false, error: "Paystack secret key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100,
        currency,
        metadata: {
          ...metadata,
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: metadata?.customer_name || "",
            },
            {
              display_name: "Phone",
              variable_name: "phone",
              value: metadata?.phone || "",
            },
          ],
        },
        channels: ["card", "bank", "ussd", "bank_transfer"],
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/success`,
      }),
    });

    const data = await response.json();

    if (!data.status) {
      throw new Error(data.message || "Paystack initialization failed");
    }

    return NextResponse.json({
      success: true,
      data: data.data,
    });

  } catch (error: any) {
    console.error("Paystack initialization error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}