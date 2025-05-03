import { useState } from "react";
import { useCollections } from "../reuseableEffects";
import InputComp from "../../components/inputComp";

const Collections = () => {
  const collections = useCollections();
  // console.log(collections);

  const [searchQuery, setSearchQuery] = useState("");

  // const collections = [
  //   {
  //     invoiceNo: "INV001",
  //     description: "General Consultation",
  //     invoiceDate: "2025-04-01",
  //     item: "Consultation",
  //     payerName: "John Doe",
  //     amount: 5000,
  //     total: 5000,
  //     debited: true,
  //     channel: "POS",
  //     notificationStatus: "Sent",
  //     posPaymentStatus: "Successful"
  //   },
  //   {
  //     invoiceNo: "INV002",
  //     description: "X-Ray Scan",
  //     invoiceDate: "2025-04-02",
  //     item: "Radiology",
  //     payerName: "Jane Smith",
  //     amount: 8500,
  //     total: 8500,
  //     debited: false,
  //     channel: "Cash",
  //     notificationStatus: "Pending",
  //     posPaymentStatus: "N/A"
  //   },
  //   {
  //     invoiceNo: "INV003",
  //     description: "Blood Test",
  //     invoiceDate: "2025-04-03",
  //     item: "Laboratory",
  //     payerName: "Samuel Johnson",
  //     amount: 3000,
  //     total: 3000,
  //     debited: true,
  //     channel: "Transfer",
  //     notificationStatus: "Sent",
  //     posPaymentStatus: "N/A"
  //   },
  //   {
  //     invoiceNo: "INV004",
  //     description: "MRI Scan",
  //     invoiceDate: "2025-04-04",
  //     item: "Radiology",
  //     payerName: "Fatima Ali",
  //     amount: 20000,
  //     total: 20000,
  //     debited: false,
  //     channel: "POS",
  //     notificationStatus: "Failed",
  //     posPaymentStatus: "Declined"
  //   },
  //   {
  //     invoiceNo: "INV005",
  //     description: "Surgery Charges",
  //     invoiceDate: "2025-04-05",
  //     item: "Surgery",
  //     payerName: "Ahmed Musa",
  //     amount: 150000,
  //     total: 150000,
  //     debited: true,
  //     channel: "Transfer",
  //     notificationStatus: "Sent",
  //     posPaymentStatus: "N/A"
  //   },
  //   {
  //     invoiceNo: "INV006",
  //     description: "Admission Fee",
  //     invoiceDate: "2025-04-06",
  //     item: "Admission",
  //     payerName: "Chinwe Okafor",
  //     amount: 10000,
  //     total: 10000,
  //     debited: true,
  //     channel: "POS",
  //     notificationStatus: "Sent",
  //     posPaymentStatus: "Successful"
  //   },
  //   {
  //     invoiceNo: "INV007",
  //     description: "Medication Purchase",
  //     invoiceDate: "2025-04-07",
  //     item: "Pharmacy",
  //     payerName: "Ibrahim Lawal",
  //     amount: 6200,
  //     total: 6200,
  //     debited: false,
  //     channel: "Cash",
  //     notificationStatus: "Pending",
  //     posPaymentStatus: "N/A"
  //   },
  //   {
  //     invoiceNo: "INV008",
  //     description: "Dental Checkup",
  //     invoiceDate: "2025-04-08",
  //     item: "Dental",
  //     payerName: "Maryam Bello",
  //     amount: 7000,
  //     total: 7000,
  //     debited: true,
  //     channel: "POS",
  //     notificationStatus: "Sent",
  //     posPaymentStatus: "Successful"
  //   },
  //   {
  //     invoiceNo: "INV009",
  //     description: "Physiotherapy Session",
  //     invoiceDate: "2025-04-09",
  //     item: "Physiotherapy",
  //     payerName: "Kelvin Uche",
  //     amount: 4500,
  //     total: 4500,
  //     debited: false,
  //     channel: "Transfer",
  //     notificationStatus: "Failed",
  //     posPaymentStatus: "N/A"
  //   },
  //   {
  //     invoiceNo: "INV010",
  //     description: "Delivery Charges",
  //     invoiceDate: "2025-04-10",
  //     item: "Maternity",
  //     payerName: "Amina Sule",
  //     amount: 30000,
  //     total: 30000,
  //     debited: true,
  //     channel: "POS",
  //     notificationStatus: "Sent",
  //     posPaymentStatus: "Successful"
  //   }
  // ];

  const filteredCollections = collections.filter((entry) =>
    Object.values(entry).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
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
                  <td className="py-4 ps-6">{row.invoiceItems}</td>
                  <td className="py-4 ps-6">{row.invoicePayerName}</td>
                  <td className="py-4 ps-6">{row.invoiceAmount}</td>
                  <td className="py-4 ps-6">{row.invoiceTotalPayable}</td>
                  <td className="py-4 ps-6">{row.amountDebited}</td>
                  <td className="py-4 ps-6">{row.channel}</td>
                  <td className="py-4 ps-6">{row.notificationCode === "00" ? "success" : "failed"}</td>
                  <td className="py-4 ps-6">.</td>
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
