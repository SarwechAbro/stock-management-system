import { Card, CardContent } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { useState, useEffect } from "react";
import { StockTransactionModel } from "./addStockModal";
import axios from "axios";







export function PageHeader( { onAddClick }) {
  return (
    <div className="flex justify-between items-center pb-2">
      <div>
        <h1 className="text-3xl font-bold text-gray-600">Stock History</h1>
        <p className="text-gray-500 text-sm">view and analyse your stock</p>
      </div>
      <Button className="bg-green-700 hover:bg-green-800" onClick={onAddClick}>+ Add Stock Transition</Button>
    </div>
  );
}

export function StockHeader() {
  return (
    <>
      <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
         Stock Items
      </h2>
      <p className="text-sm text-gray-500 mb-2">A list of all outgoing items from stock</p>
    </>
  );
}

export function StockSearch( { search, setSearch }) {
   

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
    const response = await axios.get('http://127.0.0.1:8000/api/export-stockout-csv', {
      params: {
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
      },
      responseType: 'blob', // important to handle binary content
    });

     const filename = `stock-out_${startDate}_to_${endDate}.csv`;

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
      onChange={(e) => setSearch(e.target.value)} placeholder="Search items by name, date, category, section or employee..." className="w-full md:w-1/2" />
       <div className="flex gap-2 w-full md:w-auto">
        <Input value={startDate}
        onChange={(e) => setStartDate(e.target.value)} type="date" className="w-full md:w-auto" />
        <Input  value={endDate}
        onChange={(e) => setEndDate(e.target.value)} type="date" className="w-full md:w-auto" />
        <Button className="bg-green-700 hover:bg-green-800" onClick={handleExport}>Export</Button>
      </div>
    </div>
   )
}

  

export function StockTableBody({ items, filterdata, search }) {
  
  const filteredData = filterdata(items, search);

  return (
    <tbody>
      {filteredData.map((item, idx) => (
        <tr key={idx} className="border-b hover:bg-gray-50">
         <td className="p-3 ">{item.item_name}</td>
         <td className="pl-8 text-green-600">{item.quantity}</td>
           <td className="p-3 ">{item.date_of_issue}</td>
         
          <td className="p-3">{item.item_category}</td>
          <td className="pl-6 ">{item.section_name}</td>
         
          <td className="pl-8">{item.emp_name}</td>
          
          <td className="p-3">{item.remarks}</td>
        </tr>
      ))}
    </tbody>
  );
}



export default function StockPage() {

   const [showModal, setShowModal] = useState(false);
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    const fetchItems = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/stockout");
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
      (item.emp_name?.toLowerCase() || "").includes(lowerSearch) ||
      (item.date_of_issue?.toLowerCase() || "").includes(lowerSearch) ||
      (item.section_name?.toLowerCase() || "").includes(lowerSearch)
    );
  }

  return (
    

     <div className="w-full h-600 overflow-hidden p-6">
     <PageHeader onAddClick={() => setShowModal(true)}/>
      <StockTransactionModel isOpen={showModal} onClose={closeModal  } />
     
       <Card  className="h-full flex flex-col">
        <CardContent className="p-5 flex-1 flex flex-col overflow-hidden">
          <StockHeader />
          <StockSearch  search={searchTerm} setSearch={setSearchTerm}/>
          <div className="overflow-auto  max-h-[373px] border rounded-lg">
            <table className="w-full table-fixed border-collapse">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr className="border-b text-left text-gray-500">
                  <th className="p-3">Item</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Date of issue</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Section</th>
                  <th className="p-3">Name Of Employee</th>
                  <th className="p-3">Remarks</th>
                </tr>
              </thead>
              <StockTableBody items={items} filterdata={filterdata} search={searchTerm}/>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
