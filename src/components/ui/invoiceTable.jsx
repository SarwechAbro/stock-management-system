import { AddInvoiceTransactionModel } from "./addInvoiceModal";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";







export function PageHeader( { onAddClick }) {
  return (
    <div className="flex justify-between items-center pb-2 ">
      <div>
        <h1 className="text-3xl font-bold text-gray-600">Invoices & History</h1>
        <p className="text-gray-500 text-sm">view and analyze your stock invoices</p>
      </div>
      <Button className="bg-green-700 hover:bg-green-800" onClick={onAddClick}>+ Add Invoice</Button>
    </div>
  );
}

export function InvioceHeader() {
  return (
    <>
      <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
         Invoices & purchases
      </h2>
      <p className="text-sm text-gray-500 mb-2">A list of all invoices and purchases in the stock</p>
    </>
  );
}

export function InvoiceSearch( { search, setSearch }) {
    const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY
  };


  const handleExport = async () => {
  if (!startDate || !endDate) {
    alert('Please select both start and end dates.');
    return;
  }

  try {
    const response = await axios.get('http://127.0.0.1:8000/api/export-stockin-csv', {
      params: {
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
      },
      responseType: 'blob', // important to handle binary content
    });

     const filename = `stock-in_${startDate}_to_${endDate}.csv`;

    const blob = new Blob([response.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename; // 💡 use custom filename
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('CSV Export Error:', error);
    alert('Error exporting CSV. Please check your date range or try again.');
  }

  
 
};
   
   return (<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
     
      <Input value={search}
      onChange={(e) => setSearch(e.target.value)} placeholder="Search items by name, date, category or reciever..." className="w-full md:w-1/2" />
       <div className="flex gap-2 w-full md:w-auto">
        <Input value={startDate}
        onChange={(e) => setStartDate(e.target.value)} type="date" className="w-full md:w-auto" />
        <Input value={endDate}
        onChange={(e) => setEndDate(e.target.value)} type="date" className="w-full md:w-auto" />
        <Button className="bg-green-700 hover:bg-green-800 " onClick={handleExport}>Export</Button>
      </div>
    </div>
   )
}



export function InvoiceTableBody({ items , search, filterdata }) {

   const filteredData = filterdata(items, search);
  
  return (
    <tbody>
      {filteredData.map((item, idx) => (
        <tr key={idx} className="border-b hover:bg-gray-50">
           <td className="p-3 ">{item.item_name}</td>
            <td className="pl-7 text-green-600">{item.quantity}</td>
           <td className="pl-4 ">{item.date_of_entry}</td>
          <td className="p-3">{item.item_category}</td>
          <td className="pl-5 ">{item.reciever}</td>
          <td className="p-3">{item.remarks}</td>
        </tr>
      ))}
    </tbody>
  );
}



export default function InvoicePage() {

  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

    const fetchItems = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/stocks");
      setItems(res.data);
    } catch (error) {
      console.error("Failed to fetch items", error);
    }
  };

useEffect(() => {
    fetchItems();
  }, []);

   const closeModal = () => {
    setShowModal(false);
    fetchItems(); // Refresh data after closing modal
  };

  const filterdata = (items, query) => {
    const lowerSearch = query.toLowerCase();
     
    return items.filter(item =>
      (item.item_name.toLowerCase() || "").includes(lowerSearch) ||
      (item.item_category?.toLowerCase() || "").includes(lowerSearch) ||
      (item.reciever?.toLowerCase() || "").includes(lowerSearch) ||
      (item.date_of_entry?.toLowerCase() || "").includes(lowerSearch)
    );
  }

  return (
    

    <div className="w-full h-600 overflow-hidden p-6">
     <PageHeader onAddClick={() => setShowModal(true)}/>
      <AddInvoiceTransactionModel isOpen={showModal} onClose={closeModal  } />
      <Card  className="h-full flex flex-col">
       <CardContent className="p-5 flex-1 flex flex-col overflow-hidden">
          <InvioceHeader />
          <InvoiceSearch search={searchTerm} setSearch={setSearchTerm} />
         <div className="overflow-auto  max-h-[372px] border rounded-lg">
            <table className="w-full table-fixed border-collapse">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr className="border-b text-left text-gray-500">
                  <th className="p-3">Item Name</th>
                   <th className="p-3">Quantity</th>
                  <th className="p-3">Date Of Entry</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Reciever</th>
                  <th className="p-3">Remarks</th>
                </tr>
              </thead>
              <InvoiceTableBody items={items} search={searchTerm} filterdata={filterdata}/>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
