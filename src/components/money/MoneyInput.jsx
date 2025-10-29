import { useState } from "react";

function MoneyInput({ onConvert }) {
  const [amount, setAmount] = useState("");
  const [direction, setDirection] = useState("USD_TO_VND");

  const handleSubmit = (e) => {
    e.preventDefault();
    onConvert(amount, direction);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Nhập số tiền..."
        className="border border-gray-300 rounded-lg p-3 text-center"
        required
      />
      <div className="flex justify-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="USD_TO_VND"
            checked={direction === "USD_TO_VND"}
            onChange={() => setDirection("USD_TO_VND")}
          />
          USD → VND
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="VND_TO_USD"
            checked={direction === "VND_TO_USD"}
            onChange={() => setDirection("VND_TO_USD")}
          />
          VND → USD
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Quy đổi
      </button>
    </form>
  );
}

export default MoneyInput;
