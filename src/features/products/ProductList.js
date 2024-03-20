// import { useEffect, useState } from "react";
// import { getProductsFromServer } from "./productsApi.js";
// import ListItem from "./ListItem.js";
// import { Link } from "react-router-dom";
// import { Button, Stack } from "@mui/material";
// import Pagination from "@mui/material/Pagination";

// const ProductList = () => {
//   const userRole = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).role : null;
//   const itemsPerPage = 5; // מספר הפריטים לכל עמוד
//   const [pageNumber, setPageNumber] = useState(1);
//   const [productsArr, setProductsArr] = useState([]);
//   const [totalPages, setTotalPages] = useState(1); // סך הכל מספר עמודים

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getProductsFromServer(pageNumber, itemsPerPage);
//         setProductsArr(response.data);
//         setTotalPages(Math.ceil(response.data.length / itemsPerPage));
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     fetchData();
//   }, [pageNumber, itemsPerPage]);

//   const handlePageChange = (event, value) => {
//     setPageNumber(value);
//   };

//   console.log("pageNumber: " + pageNumber);

//   return (
//     <div>
//       {productsArr.length > 0 &&
//         <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
//           {productsArr.map((item) => (
//             <li key={item._id}>
//               <ListItem one={item} />
//             </li>
//           ))}
//         </ul>}
//       <Stack spacing={2}>
//         {console.log("totalPages: "+totalPages)}
//         <Pagination count={5} page={pageNumber} onChange={handlePageChange} />
//       </Stack>
//       {userRole === "admin" && <Link to="/add">
//         <div style={{ textAlign: 'center', marginTop: '20px' }}>
//           <Button sx={{ margin: "auto" }}>הוספת מוצר חדש</Button>
//         </div>
//       </Link>}
//     </div>
//   );
// };

// export default ProductList;


import { useEffect, useState } from "react";
import { getProductsFromServer } from "./productsApi.js";
import ListItem from "./ListItem.js";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const ProductList = () => {
  const userRole = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).role : null;
  const [pageNumber] = useState(1);
  const [productsArr, setProductsArr] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductsFromServer();
        setProductsArr(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, [pageNumber]);
  return (
    <div>
      {productsArr.length > 0 &&
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
          {productsArr.map((item) => (
            <li key={item._id}>
              <ListItem one={item} />
            </li>
          ))}

        </ul>}
      {userRole === "admin" && <Link to="/add">
        <Button sx={{ margin: "auto" }}>הוספת מוצר חדש</Button>
      </Link>}
    </div >
  );
}
export default ProductList;