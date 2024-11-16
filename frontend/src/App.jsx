import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import TableContent from './tablecontent/TableContent'
import ContactForm from "./components/ContactForm"

function App() {
 
  const router = createBrowserRouter([
    {path:"/contacts/:id" , element:<ContactForm/>},
    {path:"/" , element:<TableContent/>},
    
  ])

  return (
    <>
     <RouterProvider router={router}/>
   </>
  )
}

export default App




