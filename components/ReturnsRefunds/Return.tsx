import React from "react";
import Link from "next/link";

export default function Return() {
  return (
    <div className="w-full  text-gray-700 space-y-8 leading-relaxed">
      
      {/* Header */}
      <div className="border-b pb-6">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3">ELDokan Return Policy</h2>
        <p className="text-base text-gray-600">
          Items shipped from ELDokan can be returned within <strong className="text-gray-900">15 days</strong> of receipt of shipment in most cases. Items that were received damaged, defective, used, missing parts, or not as described can be returned within <strong className="text-gray-900">30 days</strong>. Some products have different policies or requirements associated with them.
        </p>
      </div>

      {/* Overview Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Overview</h3>
        <p className="text-base">
          Enjoy free, easy returns on thousands of items. You may return most new, unopened items sold and fulfilled by ELDokan within 30 days of delivery for a full refund.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 bg-gray-50 p-5 rounded-xl border border-gray-100">
          <li>Our refund and returns policy lasts 30 days. If 30 days have passed, we can’t offer a full refund or exchange.</li>
          <li>To be eligible, your item must be unused, in the same condition that you received it, and in its original packaging.</li>
          <li>A receipt or proof of purchase is required to complete your return.</li>
        </ul>
      </section>

      {/* Non-Returnable Items */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-gray-900">Non-Returnable Items</h3>
        <p className="text-base">Several types of goods are exempt from being returned, including:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-red-50/50 border border-red-100 p-4 rounded-xl text-gray-700">
            <span className="font-semibold text-red-700 block mb-1">Perishable & Consumable</span>
            Food, flowers, newspapers, magazines, and intimate/sanitary goods.
          </div>
          <div className="bg-red-50/50 border border-red-100 p-4 rounded-xl text-gray-700">
            <span className="font-semibold text-red-700 block mb-1">Digital & Special Items</span>
            Gift cards, downloadable software, hazardous materials, and flammable liquids.
          </div>
        </div>
      </section>

      {/* Refunds Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Refunds</h3>
        <p className="text-base">
          Once your return is received and inspected, we will send you an email to notify you of the approval or rejection of your refund. Approved refunds will be automatically applied to your original method of payment.
        </p>
        
        <div className="bg-blue-50/60 border border-blue-100 p-5 rounded-2xl space-y-2">
          <h4 className="font-semibold text-blue-900">Late or Missing Refunds</h4>
          <p className="text-sm text-blue-800">
            If you haven’t received a refund yet, check your bank account again, then contact your credit card company or bank as processing times may vary. If you still need help, contact us at <Link href="mailto:wecare@eldokan.com" className="text-blue-600 underline font-medium">wecare@eldokan.com</Link>.
          </p>
        </div>
      </section>

      {/* Refunds Table */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Refund Processing Times</h3>
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="p-3 border-b">Payment Method</th>
                <th className="p-3 border-b">Refund Method</th>
                <th className="p-3 border-b">Refund Time (Once Processed)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-3">Credit Card/Debit Card</td>
                <td className="p-3">Credit Card/Debit Card</td>
                <td className="p-3 font-medium text-gray-900">5-7 business days</td>
              </tr>
              <tr>
                <td className="p-3">ELDokan Gift Card</td>
                <td className="p-3">Gift Card</td>
                <td className="p-3 font-medium text-gray-900">1 business day</td>
              </tr>
              <tr>
                <td className="p-3">Cash on Delivery</td>
                <td className="p-3">Bank Account</td>
                <td className="p-3 font-medium text-gray-900">5-7 business days</td>
              </tr>
              <tr>
                <td className="p-3">Cash on Delivery</td>
                <td className="p-3">Gift Card</td>
                <td className="p-3 font-medium text-gray-900">1 business day</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Partial Refunds & Restocking Fees */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Partial Refunds or Restocking Fees</h3>
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="p-3 border-b">If You Return</th>
                <th className="p-3 border-b">You’ll Receive</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-3">Items in original condition past the return window*</td>
                <td className="p-3 font-semibold text-gray-900">80% of the item’s price</td>
              </tr>
              <tr>
                <td className="p-3">Opened CDs, DVDs, VHS, cassettes, or vinyl records</td>
                <td className="p-3 font-semibold text-gray-900">50% of the item’s price</td>
              </tr>
              <tr>
                <td className="p-3">Open software or video games (non-error related)</td>
                <td className="p-3 font-semibold text-red-600">0% of the item’s price</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500">*For most items the return window is 15 days from delivery date.</p>
      </section>

      {/* Shipping Returns */}
      <section className="space-y-3 bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">Shipping Returns</h3>
        <p className="text-base">
          To return your product, you should mail your product to:{" "}
          <Link
            href="https://www.google.com/maps/@30.1212449,31.330784,16z"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold underline hover:text-blue-700"
          >
            our location on the map
          </Link>
          .
        </p>
        <p className="text-sm text-gray-600">
          You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.
        </p>
      </section>

      {/* Need Help */}
      <div className="border-t pt-6 text-center space-y-2">
        <h3 className="text-lg font-bold text-gray-900">Need help?</h3>
        <p className="text-base">
          Contact us at{" "}
          <Link href="mailto:wecare@eldokan.com" className="text-blue-600 font-semibold underline">
            wecare@eldokan.com
          </Link>{" "}
          for questions related to refunds and returns.
        </p>
      </div>

    </div>
  );
}