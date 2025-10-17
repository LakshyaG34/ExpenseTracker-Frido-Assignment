import { useSelector } from "react-redux";

const Balance = () => {
  const balance = useSelector((state) => state.balance);

  if (!balance || balance.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        No balances to display
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 bg-gray-50">
      <h2 className="text-3xl font-semibold mb-10 text-gray-800 tracking-wide">
        Group Balances
      </h2>

      <div className="w-full max-w-2xl space-y-8">
        {balance.map((groupData, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              {groupData.group}
            </h3>

            {groupData.settlements.length === 0 ? (
              <p className="text-gray-500 italic">All settled up ✅</p>
            ) : (
              <ul className="space-y-3">
                {groupData.settlements.map((settle, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center bg-gray-50 border border-gray-100 p-3 rounded-lg hover:bg-gray-100 transition"
                  >
                    <span className="text-gray-800 font-medium">
                      {settle.from} ➜ {settle.to}
                    </span>
                    <span className="text-green-700 font-semibold">
                      ₹{settle.amount}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Balance;
