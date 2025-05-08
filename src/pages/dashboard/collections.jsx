import { useState } from "react";
import { useBankTransferCollections, useCollections, useEndOfDaySummary } from "../reuseableEffects";
import InputComp from "../../components/inputComp";

const Collections = () => {
  const collections = useCollections();
  const endOfDaySummary = useEndOfDaySummary();
  const bankCollections = useBankTransferCollections();
  // console.log(bankCollections);

  const [activeTab, setActiveTab] = useState("tabOne");
  const [ tabOne, setTabOne] = useState(true)
  const [ tabTwo, setTabTwo] = useState(false)
  const [ tabThree, setTabThree] = useState(false)

  const openTabOne = () => {
    setTabOne(true);
    setTabTwo(false);
    setTabThree(false);
    setActiveTab("tabOne")
  };
  
  const openTabTwo = () => {
    setTabOne(false);
    setTabTwo(true);
    setTabThree(false);
    setActiveTab("tabTwo")
  };
  
  const openTabThree = () => {
    setTabOne(false);
    setTabTwo(false);
    setTabThree(true);
    setActiveTab("tabThree")
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [eodsearchQuery, setEodSearchQuery] = useState("");
  const [banksearchQuery, setBanksearchQuery] = useState("")

  const filteredCollections = collections.filter((entry) =>
    Object.values(entry).some((value) =>
      (value ?? '').toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredEOD = endOfDaySummary.filter((entry) =>
    Object.values(entry).some((value) =>
      (value ?? '').toString().toLowerCase().includes(eodsearchQuery.toLowerCase())
    )
  );

  const filteredBankCollections = bankCollections.filter((entry) =>
    Object.values(entry).some((value) =>
      (value ?? '').toString().toLowerCase().includes(banksearchQuery.toLowerCase())
    )
  );
  

  return (
    <div>
      <div className="font-extrabold">Collections</div>
      <div className="overflow-x-auto whitespace-nowrap">
              <div className="flex text-xs bg-white border border-lightGray/40 text-lightGray rounded py-3 w-fit divide-x my-5">
                <span className={`${activeTab === "tabOne" ? "text-primary font-semibold" : ""} px-4 cursor-pointer`} onClick={openTabOne}> Collection details summary </span>
                <span className={`${activeTab === "tabTwo" ? "text-primary font-semibold" : ""} px-4 cursor-pointer`} onClick={openTabTwo}> Bank transfer collections </span>
                <span className={`${activeTab === "tabThree" ? "text-primary font-semibold" : ""} px-4 cursor-pointer`} onClick={openTabThree}> End of day summary </span>
              </div>
      </div>

      { tabOne && (
      <div>
        <div className="mb-3 w-full md:w-2/3 lg:w-1/3">
          <InputComp
            type={"text"}
            placeholder={"Search by any field..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 whitespace-nowrap overflow-x-auto border border-lightGray/24 rounded-md">
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
      </div>)
      }

      { tabTwo && (
        <div>
        <div className="mb-3 w-full md:w-2/3 lg:w-1/3">
          <InputComp
            type={"text"}
            placeholder={"Search by any field..."}
            value={banksearchQuery}
            onChange={(e) => setBanksearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 whitespace-nowrap overflow-x-auto border border-lightGray/24 rounded-md">
          <table className="w-full text-sm text-left bg-white">
            <thead className="border-b border-lightGray/24 bg-lightGray/20 text-xs">
              <tr>
                <th className="ps-6 pe-2 py-[18px] bg-white sticky left-0 z-10">No.</th>
                <th className="ps-4 pe-6 py-[18px]">Transaction ref</th>
                <th className="px-6 py-[18px]">Transaction description</th>
                <th className="px-6 py-[18px]">Request ref</th>
                <th className="px-6 py-[18px]">Transaction date</th>
                <th className="px-6 py-[18px]">Customer reference</th>
                <th className="px-6 py-[18px]">Amount</th>
                <th className="px-6 py-[18px]">Payer name</th>
                <th className="px-6 py-[18px]">Payer phone</th>
                <th className="px-6 py-[18px]">Payer email</th>
                <th className="px-6 py-[18px]">Provider</th>
                <th className="px-6 py-[18px]">Status</th>
                <th className="px-6 py-[18px]">Requester</th>
                <th className="px-6 py-[18px]">Payment channel</th>
              </tr>
            </thead>
            <tbody>
              {filteredBankCollections.length === 0 ? (
                <tr>
                  <td colSpan="12" className="text-center py-6">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                filteredBankCollections.map((row, index) => (
                  <tr key={index} className="hover:bg-[#c4c4c416] transition duration-500 text-xs font-medium">
                    <td className="py-4 ps-6 pe-2 sticky left-0 bg-white z-10">{index + 1}</td>
                    <td className="py-4 ps-4">{row.transaction_ref}</td>
                    <td className="py-4 px-6 truncate">{row.transaction_desc}</td>
                    <td className="py-4 ps-6">{row.request_ref}</td>
                    <td className="py-4 ps-6 max-w-[300px] truncate">{row.time_in}</td>
                    <td className="py-4 ps-6">{row.customer_ref}</td>
                    <td className="py-4 ps-6">{row.amount}</td>
                    <td className="py-4 ps-6">{row.customer_surname} {row.customer_firstname === row.customer_surname ? "" : row.customer_surname}</td>
                    <td className="py-4 ps-6">{row.customer_mobile_no}</td>
                    <td className="py-4 ps-6">{row.customer_email}</td>
                    <td className="py-4 ps-6">{row.provider}</td>
                    <td className="py-4 px-6">{row.status}</td>
                    <td className="py-4 px-6">{row.requester}</td>
                    <td className="py-4 px-6">{row.transaction_type}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}

{ tabThree && (
        <div>
        <div className="mb-3 w-full md:w-2/3 lg:w-1/3">
          <InputComp
            type={"text"}
            placeholder={"Search by any field..."}
            value={eodsearchQuery}
            onChange={(e) => setEodSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 whitespace-nowrap overflow-x-auto border border-lightGray/24 rounded-md">
          <table className="w-full text-sm text-left bg-white">
            <thead className="border-b border-lightGray/24 bg-lightGray/20 text-xs">
              <tr>
                <th className="ps-6 pe-2 py-[18px] bg-white sticky left-0 z-10">No.</th>
                <th className="ps-4 pe-6 py-[18px]">Merchant account</th>
                <th className="px-6 py-[18px]">Total amount</th>
                <th className="px-6 py-[18px]">Transaction count</th>
                <th className="px-6 py-[18px]">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEOD.length === 0 ? (
                <tr>
                  <td colSpan="12" className="text-center py-6">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                filteredEOD.map((row, index) => (
                  <tr key={index} className="hover:bg-[#c4c4c416] transition duration-500 text-xs font-medium">
                    <td className="py-4 ps-6 pe-2 sticky left-0 bg-white z-10">{index + 1}</td>
                    <td className="py-4 ps-4  max-w-[300px] truncate">{row.merchantAccount}</td>
                    <td className="py-4 px-6 truncate">{row.totalAmount}</td>
                    <td className="py-4 ps-6">{row.transactionCount}</td>
                    <td className="py-4 ps-6">{row.status}</td>
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

export default Collections;
