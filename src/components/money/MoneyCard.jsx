function MoneyCard({ rate, result, direction }) {
  return (
    <div className="mt-6 bg-blue-50 rounded-xl p-4 shadow-inner">
      <p className="text-gray-600 mb-2">
        💹 Tỷ giá hiện tại:{" "}
        <span className="font-semibold text-blue-700">
          1 {direction === "USD_TO_VND" ? "USD" : "VND"} ={" "}
          {rate?.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
          {direction === "USD_TO_VND" ? "VND" : "USD"}
        </span>
      </p>

      {result !== null && (
        <p className="text-xl font-bold text-blue-900">
          💰 Kết quả:{" "}
          {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
          {direction === "USD_TO_VND" ? "VND" : "USD"}
        </p>
      )}
    </div>
  );
}

export default MoneyCard;
