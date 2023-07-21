// import { useState } from 'react';
// import Button from "react-bootstrap/Button";
//
// function Cart({ cart }) {
//     return (
//         <div>
//             Cart: {cart}
//         </div>
//     );
// }
//
// function ToCartProducts({ onAddToCart }) {
//     const stockProducts = [
//         { title: 'Product 1' },
//         { title: 'Product 2' },
//         { title: 'Product 3' },
//         { title: 'Product 4' },
//         { title: 'Product 5' },
//     ];
//
//     return (
//         <div>
//             <h2 className="text-red-500">Product list</h2>
//             {stockProducts.map((product, index) => (
//                 <div key={index} className="flex items-center">
//                     <div className="p-1 m-1">{product.title}</div>
//                     <Button className="p-1 m-1" onClick={() => onAddToCart()}>Add to cart</Button>
//                 </div>
//             ))}
//         </div>
//     );
// }
//
// function App() {
//     const [cart, setCart] = useState(0);
//
//     const handleAddToCart = () => {
//         setCart(cart + 1);
//     };
//
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <Cart cart={cart} />
//                 <ToCartProducts onAddToCart={handleAddToCart} />
//             </header>
//         </div>
//     );
// }
//
// export default App;
