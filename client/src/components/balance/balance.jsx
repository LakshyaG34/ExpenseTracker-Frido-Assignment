import { useSelector } from "react-redux";

const Balance = () => {
  const balance = useSelector((state) => state.balance);

  if (!balance || balance.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        No balances to show
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-pink-800">
        Group-wise Balances
      </h2>

      <div className="w-full max-w-2xl space-y-6">
        {balance.map((groupData, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-5 border border-gray-100"
          >
            <h3 className="text-xl font-medium mb-3 text-blue-600">
              {groupData.group}
            </h3>

            {groupData.settlements.length === 0 ? (
              <p className="text-gray-500 italic">All settled up</p>
            ) : (
              <ul className="space-y-2">
                {groupData.settlements.map((settle, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
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
