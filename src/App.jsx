import { Routes, Route } from "react-router-dom"
import DashboardLayout from "./layout/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import ProductList from "./components/products/ProductList"
import AddProductForm from "./components/products/AddProductForm"
import Products from "./components/products/Products"
import Contact from "./pages/Contact"
import Forms from "./pages/Login"
import ProductsDetails from "./components/products/ProductsDetails"
import { Toaster } from "@/components/ui/sonner"
import Signup from "./pages/Signup"
import Logout from "./pages/Logout"

function App() {
  return (
<>
      <Toaster />
    
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/ProductsList" element={<ProductList />} />
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/edit-product/:id" element={<AddProductForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Forms />} />
          <Route path="/products-detail/:id" element={<ProductsDetails />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
