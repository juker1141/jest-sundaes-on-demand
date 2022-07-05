import { createContext, useContext, useState, useMemo, useEffect } from "react";

const OrderDetails = createContext();

// create custom hook to check whether we're inside a provider
function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return context;
}

function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const [total, setTotal] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    const scoopSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopSubtotal + toppingsSubtotal;

    setTotal({
      scoops: scoopSubtotal,
      toppings: toppingsSubtotal,
      grandTotal,
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };

      // update option count for this item with the new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount, 10));

      setOptionCounts(newOptionCounts);
    }

    // getter: object containing option counts for scoops and toppings, subtotals and totals.
    // setter: updateOptionCount
    return [{ ...optionCounts }, updateItemCount];
  }, [optionCounts]);

  return <OrderDetails.Provider value={value} {...props} />;
}
