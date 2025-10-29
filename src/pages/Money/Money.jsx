import { useEffect, useState } from "react";
import MoneyInput from "@/components/money/MoneyInput";
import MoneyCard from "@/components/money/MoneyCard";

function Money() {
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [direction, setDirection] = useState("USD_TO_VND");

  const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;

  const fetchConvert = async (from, to, amount) => {
    try {
      const url = `https://api.exchangerate.host/convert?access_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      console.log("API response:", data);

      if (!data?.success) {
        throw new Error(data?.error?.info || "API trả về lỗi");
      }

      const quote = data.info?.quote;
      const conv = data.result;

      if (typeof quote !== "number" || typeof conv !== "number") {
        throw new Error("Dữ liệu trả về không hợp lệ");
      }

      setRate(quote);
      return conv;
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Không thể gọi API convert");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = async (amount, dir) => {
    if (!amount || isNaN(amount)) return;
    setDirection(dir);

    const conv =
      dir === "USD_TO_VND"
        ? await fetchConvert("USD", "VND", amount)
        : await fetchConvert("VND", "USD", amount);

    setResult(conv);
  };

  useEffect(() => {
    fetchConvert("USD", "VND", 1).then(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-6">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">
          💱 Quy đổi tiền tệ USD ↔ VND
        </h1>

        {loading && <p className="text-gray-500">Đang tải dữ liệu...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <MoneyInput onConvert={handleConvert} />
            <MoneyCard rate={rate} result={result} direction={direction} />
          </>
        )}
      </div>
    </div>
  );
}

export default Money;
