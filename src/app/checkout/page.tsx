"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { toast } from "sonner";

const CheckoutPage = () => {
  const { cart, total, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  // Form input state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //make order
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      totalAmount: total,
      shippingAddress: formData.address,
      paymentMethod: "Cash on Delivery",
      items: cart,
    };

    //store the data into localstorage
    const existingOrders = JSON.parse(localStorage.getItem("my_orders") || "[]");
    localStorage.setItem("my_orders", JSON.stringify([newOrder, ...existingOrders]));

    toast.success("Order Placed Successfully!");
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Order Confirmed!</h2>
        <p className="text-gray-500 text-sm">Thank you for shopping with us.</p>
        <div className="flex justify-center gap-3">
          <Link href="/products" className="inline-block bg-black text-white px-6 py-2 rounded-xl text-xs">
            Back to Shopping
          </Link>
          <Link href="/orders" className="inline-block bg-[#0f172a] text-white px-6 py-2 rounded-xl text-xs">
            View My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl border">
        <h2 className="text-lg font-bold">Shipping Address</h2>
        <input required name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full p-2.5 text-xs border rounded-lg" />
        <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2.5 text-xs border rounded-lg" />
        <input required name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone (e.g. 017...)" className="w-full p-2.5 text-xs border rounded-lg" />
        <textarea required name="address" value={formData.address} onChange={handleChange} placeholder="Full Address" rows={3} className="w-full p-2.5 text-xs border rounded-lg" />
        <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold">
          Place Order 
        </button>
      </form>

      {/* Summary */}
      <div className="bg-slate-50 p-6 rounded-2xl border h-fit space-y-4">
        <h3 className="font-bold text-sm">Order Summary ({cart.length} items)</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-xs">
              <span className="truncate w-40">{item.title} x {item.quantity}</span>
              <span className="font-semibold">৳{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
        <hr />
        <div className="flex justify-between font-bold text-sm">
          <span>Total Amount:</span>
          <span className="text-[#4f46e5]">৳{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;