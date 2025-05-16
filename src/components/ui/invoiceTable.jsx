import { AddInvoiceTransactionModel } from "./addInvoiceModal";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { useState } from "react";





const inventoryData = [
  { name: "Desk Lamp",  quantity: 56, category: "Lighting" },
  { name: "Desk Organizer", sku: "ORG-007", price: "$24.99", quantity: 68, category: "Office Accessories" },
  { name: "Ergonomic Desk Chair", sku: "CHAIR-001", price: "$249.99", quantity: 45, category: "Office Furniture" },
  { name: "Monitor Stand", sku: "STAND-003", price: "$59.99", quantity: 32, category: "Office Accessories" },
  { name: "Notebook Bundle", sku: "NB-006", price: "$19.99", quantity: 120, category: "Stationery" },
];

export function PageHeader( { onAddClick }) {
  return (
    <div className="flex justify-between items-center pb-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-600">Invoices & History</h1>
        <p className="text-gray-500 text-sm">view and analyse your stock invoices</p>
      </div>
      <Button className="bg-green-700 hover:bg-green-800" onClick={onAddClick}>+ Add Invoice</Button>
    </div>
  );
}

export function InvioceHeader() {
  return (
    <>
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
         Invoices & purchases
      </h2>
      <p className="text-sm text-gray-500 mb-4">A list of all invoices and purchases</p>
    </>
  );
}

export function InvoiceSearch() {
   
   return (<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
     
      <Input placeholder="Search items by ID, name, or category..." className="w-full md:w-1/2" />
       <div className="flex gap-2 w-full md:w-auto">
        <Input type="date" className="w-full md:w-auto" />
        <Input type="date" className="w-full md:w-auto" />
        <Button className="bg-green-700 hover:bg-green-800">Export</Button>
      </div>
    </div>
   )
}



export function InvoiceTableBody() {
  
  return (
    <tbody>
      {inventoryData.map((item, idx) => (
        <tr key={idx} className="border-b hover:bg-gray-50">
           <td className="p-3 ">{item.name}</td>
            <td className="pl-7 text-green-600">12</td>
           <td className="pl-4 ">4/20/2025</td>
          <td className="p-3">{item.category}</td>
          <td className="pl-5 ">Sarang</td>
          <td className="p-3"> The demo</td>
        </tr>
      ))}
    </tbody>
  );
}



export default function InvoicePage() {

   const [showModal, setShowModal] = useState(false);

  return (
    

    <div className="p-6">
     <PageHeader onAddClick={() => setShowModal(true)}/>
      <AddInvoiceTransactionModel isOpen={showModal} onClose={() => setShowModal(false)} />
      <Card>
        <CardContent className="p-6 space-y-4 ">
          <InvioceHeader />
          <InvoiceSearch/>
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-left border-collapse p-10">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="p-3">Item Name</th>
                   <th className="p-3">Quantity</th>
                  <th className="p-3">Date Of Entry</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Reciever</th>
                  <th className="p-3">Remarks</th>
                </tr>
              </thead>
              <InvoiceTableBody />
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
