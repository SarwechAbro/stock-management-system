import InventoryTable from '../ui/inventoryTable.jsx';
import Sidebar from '../layout/Sider.jsx';
import StockPage from '../ui/stockTable.jsx';
import InvoicePage from '../ui/invoiceTable.jsx';
import { useState } from 'react';



const Dashboard = () => {
 const [activeTab, setActiveTab] = useState("inventory"); // or "inventory", etc.
 
 
  return (
    <>
   

      <div className="flex min-h-screen">
  
  <aside >
  
  <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
  
  </aside>
 
  
  <main className="flex-1 ">
  {activeTab === "Item Management" && <InventoryTable />}
  
  {activeTab === "Stock Management" && <StockPage />}
  
  {activeTab === "Invoices" && <InvoicePage/>}

  
  </main>
</div>

    </>
  );
};

export default Dashboard;
