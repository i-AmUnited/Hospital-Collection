import { useState } from "react";
import {usePartnerSettlementDetails, useSettlementDetails } from "../reuseableEffects";
import InputComp from "../../components/inputComp";

const Settlements = () => {
  const settlementDetails = useSettlementDetails();
  const partnerSettlement = usePartnerSettlementDetails();
  // console.log(settlementDetails[0].luthInvoiceNotifications[0].rrn);

  const [activeTab, setActiveTab] = useState("tabOne");
  const [ tabOne, setTabOne] = useState(true)
  const [ tabTwo, setTabTwo] = useState(false)

  const openTabOne = () => {
    setTabOne(true);
    setTabTwo(false);
    setActiveTab("tabOne")
  };
  
  const openTabTwo = () => {
    setTabOne(false);
    setTabTwo(true);
    setActiveTab("tabTwo")
  };
  

  const [searchSettlementQuery, setSearchSettlementQuery] = useState("");
  const [partnerSettlementsearchQuery, setpartnerSettlementSearchQuery] = useState("");

  const filteredsettlements = settlementDetails.filter((entry) =>
    Object.values(entry).some((value) =>
      (value ?? '').toString().toLowerCase().includes(searchSettlementQuery.toLowerCase())
    )
  );

  const filteredPartnerSettlement = partnerSettlement.filter((entry) => {
    // Combine top-level values and nested merchantAccount values
    const combinedValues = {
      ...entry,
      ...(entry.merchantAccount || {}) // avoid error if merchantAccount is undefined
    };
  
    return Object.values(combinedValues).some((value) =>
      (value ?? '').toString().toLowerCase().includes(partnerSettlementsearchQuery.toLowerCase())
    );
  });
  
  

  return (
    <div>
      <div className="font-extrabold">Settlements</div>
      <div className="overflow-x-auto whitespace-nowrap">
              <div className="flex text-xs bg-white border border-lightGray/40 text-lightGray rounded py-3 w-fit divide-x my-5">
                <span className={`${activeTab === "tabOne" ? "text-primary font-semibold" : ""} px-4 cursor-pointer`} onClick={openTabOne}> Settlement details </span>
                <span className={`${activeTab === "tabTwo" ? "text-primary font-semibold" : ""} px-4 cursor-pointer`} onClick={openTabTwo}> Partner settlement summary </span>
              </div>
      </div>

      { tabOne && (
      <div>
        <div className="mb-3 w-full md:w-2/3 lg:w-1/3">
          <InputComp
            type={"text"}
            placeholder={"Search by any invoice number..."}
            value={searchSettlementQuery}
            onChange={(e) => setSearchSettlementQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 whitespace-nowrap overflow-x-auto border border-lightGray/24 rounded-md">
          <table className="w-full text-sm text-left bg-white">
            <thead className="border-b border-lightGray/24 bg-lightGray/20 text-xs">
              <tr>
                <th className="ps-6 pe-2 py-[18px] bg-white sticky left-0 z-10">No.</th>
                <th className="ps-4 pe-6 py-[18px]">Invoice number</th>
                <th className="px-6 py-[18px]">Description</th>
                <th className="px-6 py-[18px]">RRR number</th>
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
              {filteredsettlements.length === 0 ? (
                <tr>
                  <td colSpan="12" className="text-center py-6">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                filteredsettlements.map((row, index) => (
                  <tr key={index} className="hover:bg-[#c4c4c416] transition duration-500 text-xs font-medium">
                    <td className="py-4 ps-6 pe-2 sticky left-0 bg-white z-10">{index + 1}</td>
                    <td className="py-4 ps-4">{row.invoiceNo}</td>
                    <td className="py-4 px-6 truncate">{row.luthInvoiceNotifications[0].invoiceDescription}</td>
                    <td className="py-4 px-6 truncate">{row.luthInvoiceNotifications[0].rrrNo}</td>
                    <td className="py-4 ps-6">{row.luthInvoiceNotifications[0].invoiceDate}</td>
                    <td className="py-4 ps-6 max-w-[300px] truncate">{row.luthInvoiceNotifications[0].invoiceItems}</td>
                    <td className="py-4 ps-6">{row.luthInvoiceNotifications[0].invoicePayerName}</td>
                    <td className="py-4 ps-6">{row.luthInvoiceNotifications[0].invoiceAmount}</td>
                    <td className="py-4 ps-6">{row.luthInvoiceNotifications[0].invoiceTotalPayable}</td>
                    <td className="py-4 ps-6">{row.luthInvoiceNotifications[0].amountDebited}</td>
                    <td className="py-4 ps-6">{row.luthInvoiceNotifications[0].channel}</td>
                    <td className="py-4 ps-6">{row.luthInvoiceNotifications[0].notificationStatus}</td>
                    <td className="py-4 px-6">{row.luthInvoiceNotifications[0].invoicePOSPaymentStatus}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>)
      }

{ tabTwo && (
        <div>
        <div className="mb-3 w-full md:w-2/3 lg:w-1/3">
          <InputComp
            type={"text"}
            placeholder={"Search by any field..."}
            value={partnerSettlementsearchQuery}
            onChange={(e) => setpartnerSettlementSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 whitespace-nowrap overflow-x-auto border border-lightGray/24 rounded-md">
          <table className="w-full text-sm text-left bg-white">
            <thead className="border-b border-lightGray/24 bg-lightGray/20 text-xs">
              <tr>
                <th className="ps-6 pe-2 py-[18px] bg-white sticky left-0 z-10">No.</th>
                <th className="ps-4 pe-6 py-[18px]">Processing date</th>
                <th className="px-6 py-[18px]">Settlement date</th>
                <th className="px-6 py-[18px]">Beneficiary name</th>
                <th className="px-6 py-[18px]">Account number</th>
                <th className="px-6 py-[18px]">Bank name</th>
                <th className="px-6 py-[18px]">RRR</th>
                <th className="px-6 py-[18px]">Total amount</th>
                <th className="px-6 py-[18px]">Status</th>
                <th className="px-6 py-[18px]">Processing error</th>
              </tr>
            </thead>
            <tbody>
              {filteredPartnerSettlement.length === 0 ? (
                <tr>
                  <td colSpan="12" className="text-center py-6">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                filteredPartnerSettlement.map((row, index) => (
                  <tr key={index} className="hover:bg-[#c4c4c416] transition duration-500 text-xs font-medium">
                    <td className="py-4 ps-6 pe-2 sticky left-0 bg-white z-10">{index + 1}</td>
                    <td className="py-4 ps-4  max-w-[300px] truncate">{row.processingDate}</td>
                    <td className="py-4 px-6 truncate">{row.settlementDate}</td>
                    <td className="py-4 ps-6">{row.merchantAccount?.beneficiaryName}</td>
                    <td className="py-4 ps-6">{row.merchantAccount?.accountNumber}</td>
                    <td className="py-4 ps-6">{row.merchantAccount?.bankName}</td>
                    <td className="py-4 ps-6">{row.rrr}</td>
                    <td className="py-4 ps-6">{row.totalAmount}</td>
                    <td className="py-4 ps-6">{row.status}</td>
                    <td className="py-4 ps-6">{row.processingError}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </div>
  );
};

export default Settlements;
