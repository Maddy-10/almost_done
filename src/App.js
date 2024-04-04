import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Components/Home";
import Cart from "./Components/Cart";
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import NewProduct from "./Components/admin/management/NewProduct";
import AdminLogin from "./Components/admin/AdminLogin";
import UserLogin from "./Components/user/UserLogin";
import Shipment from "./Components/checkout/Shipment";
import AdminPanel from "./Components/admin/AdminPanel";
import Panel from "./Components/admin/Panel";
import ShippingDetails from "./Components/ship/ProductDetails";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import PanelLayout from "./layouts/PanelLayout";
import AdminLayout from "./layouts/AdminLayout";
import RootLayout from "./layouts/RootLayout";
import { ShopContextProvider } from "./context/ShopContext";
import ProductDetails from "./Components/ship/ProductDetails";
import UserRegister from "./Components/user/UserRegister";
import Delete from "./Components/admin/management/Delete";
import UserList from "./Components/admin/management/users/UserList";
import Orderlists from "./Components/admin/management/orders/Orderlists";

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/checkout/:id" element={<ProductDetails />} />
        <Route  path='/cart/:id' element={<Cart/>}/>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminLogin />} />
          <Route path="panel" element={<PanelLayout />}>
            <Route index element={<Panel />} />
            <Route path="add" element={<NewProduct />} />
            <Route path="userlist" element={<UserList />} />
            <Route path="orderlists" element={<Orderlists />} />
            <Route path="del/:id" element={<Delete />} />
          </Route>
        </Route>
        <Route path="/shipment" element={<Shipment />} />
        {/* <Route path='*' element={<PageNotFound />} /> */}
      </Route>
    )
  )

const App = () => {
  return (
    <div className="App">
      <ShopContextProvider>
      <HelmetProvider>
        <Helmet>
          <meta name="description" content="Default" />
        </Helmet>
          <RouterProvider router={router} />
      </HelmetProvider>
      </ShopContextProvider>
    </div>
  );
};

export default App;
//   return (
//     <div className="App">

//       <BrowserRouter>
//         <Routes>
//             <Route index path='/login' element={<UserLogin/>}/>
//             <Route index path='/' element={<Home/>}/>
//             <Route  path='/cart/:id' element={<Cart/>}/>
//             <Route  path='/buy' element={<ShippingDetails/>}/>
//             <Route  path='/new' element={<NewProduct/>}/>
//             <Route  path='/adminlogin' element={<AdminLogin/>}>
//             <Route  index element={<Panel/>}/>
//             </Route>
//             <Route  path='/shipment' element={<Shipment/>}/>

//         </Routes>
//       </BrowserRouter>

//     </div>
//   );
// }

// export default App;
