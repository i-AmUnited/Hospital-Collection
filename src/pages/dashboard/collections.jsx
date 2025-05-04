import { useState } from "react";
import { useCollections } from "../reuseableEffects";
import InputComp from "../../components/inputComp";

const Collections = () => {
  const collections = useCollections();
  // console.log(collections);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredCollections = collections.filter((entry) =>
    Object.values(entry).some((value) =>
      (value ?? '').toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  

  return (
    <div>
      <div className="font-extrabold">Collections</div>
      <div className="my-5 w-full md:w-2/3 lg:w-1/3">
        <InputComp 
          type={"text"}
          placeholder={"Search by any field..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 whitespace-nowrap overflow-x-auto border border-lightGray/24 rounded-md mt-6">
        <table className="w-full text-sm text-left bg-white">
          <thead className="border-b border-lightGray/24 bg-lightGray/20 text-xs">
            <tr>
              <th className="ps-6 pe-2 py-[18px] bg-white sticky left-0 z-10">No.</th>
              <th className="ps-4 pe-6 py-[18px]">Invoice number</th>
              <th className="px-6 py-[18px]">Description</th>
              <th className="px-6 py-[18px]">Invoice date</th>
              <th className="px-6 py-[18px]">Item</th>
              <th className="px-6 py-[18px]">Payer name</th>
              <th className="px-6 py-[18px]">Amount</th>
              <th className="px-6 py-[18px]">Total</th>
              <th className="px-6 py-[18px]">Debited</th>
              <th className="px-6 py-[18px]">Channel</th>
              <th className="px-6 py-[18px]">Notification status</th>
              <th className="px-6 py-[18px]">POS payment status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCollections.length === 0 ? (
              <tr>
                <td colSpan="12" className="text-center py-6">
                  No matching records found.
                </td>
              </tr>
            ) : (
              filteredCollections.map((row, index) => (
                <tr key={index} className="hover:bg-[#c4c4c416] transition duration-500 text-xs font-medium">
                  <td className="py-4 ps-6 pe-2 sticky left-0 bg-white z-10">{index + 1}</td>
                  <td className="py-4 ps-4">{row.invoiceNo}</td>
                  <td className="py-4 px-6 truncate">{row.invoiceDescription}</td>
                  <td className="py-4 ps-6">{row.invoiceDate}</td>
                  <td className="py-4 ps-6 max-w-[300px] truncate">{row.invoiceItems}</td>
                  <td className="py-4 ps-6">{row.invoicePayerName}</td>
                  <td className="py-4 ps-6">{row.invoiceAmount}</td>
                  <td className="py-4 ps-6">{row.invoiceTotalPayable}</td>
                  <td className="py-4 ps-6">{row.amountDebited}</td>
                  <td className="py-4 ps-6">{row.channel}</td>
                  <td className="py-4 ps-6">{row.notificationStatus}</td>
                  <td className="py-4 px-6">{row.invoicePOSPaymentStatus}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Collections;
