// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import React from 'react';
//
// function Kosar(props) {
//     return (
//         <>
//             <div className="w-100 border h-300">
//                 Kosárban lévő termék: {props.param1} db // Kosárban Product1-ből: {props.param4} db // Kosárban
//                 Product2-ből: {props.param5} db //
//             </div>
//             <div id="basket">
//                 {props.basketItems.map((item) => (
//                     <div key={item.productId}>
//                         {item.title} ({item.productId}) {item.count} DB
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// }
//
// function Product1(props) {
//     return (
//         <div className="w-100 border h-300">
//             Raktáron lévő termék: {props.param2} db
//         </div>
//     );
// }
//
// function Product2(props) {
//     return (
//         <div className="w-100 border h-300">
//             Raktáron lévő termék: {props.param3} db
//         </div>
//     );
// }
//
// function Button1(props) {
//     return (
//         <Button onClick={() => props.clickhandler(props.param1 + 1, props.param2 - 1)}>Kosárba</Button>
//     );
// }
//
// function Button2(props) {
//     return (
//         <Button onClick={() => props.clickhandler2(props.param1 + 1, props.param3 - 1)}>Kosárba</Button>
//     );
// }
//
// export default function States({ products2 }) {
//     const [kosar, setKosar] = useState(0);
//     const [stock, setStock] = useState(100);
//     const [stock2, setStock2] = useState(50);
//     const [param4, setParam4] = useState(0);
//     const [param5, setParam5] = useState(0);
//     const [updatedProducts, setUpdatedProducts] = useState([...products2]); // Új állapotváltozó a frissített termékek tárolására
//     const [basketItems, setBasketItems] = useState([]);
//
//     const handleButtonClick = () => {
//         setKosar(kosar + 1);
//         setStock(stock - 1);
//         setParam4(param4 + 1);
//     };
//
//     const handleProductButtonClick = (productId) => {
//         setKosar(kosar + 1);
//
//         // Frissítsük a product.stock értékét az adott productId alapján
//         const updatedProductList = updatedProducts.map((product) => {
//             if (product.id === productId) {
//                 return { ...product, stock: product.stock - 1 };
//             }
//             return product;
//         });
//
//         setUpdatedProducts(updatedProductList);
//
//         // Kosárba helyezés a product.title és product.id hozzáadásával
//         const productToAdd = updatedProducts.find((product) => product.id === productId);
//         if (productToAdd) {
//             const existingItem = basketItems.find((item) => item.productId === productId);
//             if (existingItem) {
//                 const updatedItems = basketItems.map((item) => {
//                     if (item.productId === productId) {
//                         return { ...item, count: item.count + 1 };
//                     }
//                     return item;
//                 });
//                 setBasketItems(updatedItems);
//             } else {
//                 setBasketItems([...basketItems, { productId, title: productToAdd.title, count: 1 }]);
//             }
//         }
//     };
//
//
//     const handleButtonClick2 = () => {
//         setKosar(kosar + 1);
//         setStock2(stock2 - 1);
//         setParam5(param5 + 1);
//     };
//
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <Kosar param1={kosar} param4={param4} param5={param5} basketItems={basketItems} />
//                 <Product1 param2={stock} />
//                 <Button1 clickhandler={handleButtonClick} param1={kosar} param2={stock} />
//                 <Product2 param3={stock2} />
//                 <Button2 clickhandler2={handleButtonClick2} param1={kosar} param3={stock2} />
//                 <div>
//                     {updatedProducts.map((product, index) => (
//                         <div key={index}>
//                             {product.title} // {product.stock} //
//                             {product.stock === 0 ? "Elfogyott" : (
//                                 <Button onClick={() => handleProductButtonClick(product.id)}>
//                                     Kosárba
//                                 </Button>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </header>
//         </div>
//     );
// }
