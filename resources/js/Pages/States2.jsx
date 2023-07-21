// import React from 'react';
// import {createStore} from 'redux';
// import {Provider} from 'react-redux';
// import {useSelector} from 'react-redux';
// import {useDispatch} from 'react-redux';
//
// const initialState = {
//     count: 0,
// };
// const cartReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'INCREMENT_COUNT':
//             return {...state, count: state.count + 1};
//         default:
//             return state;
//     }
// };
//
// const store = createStore(cartReducer);
//
// const Cart = () => {
//     const itemCount = useSelector(state => state.count);
//
//     return (
//         <div>
//             <h2>Cart</h2>
//             <p>Item count: {itemCount}</p>
//         </div>
//     );
// };
//
// const AddToCartButton = () => {
//     const dispatch = useDispatch();
//
//     const handleAddToCart = () => {
//         dispatch({type: 'INCREMENT_COUNT'});
//     };
//
//     return (
//             <div>
//                 <button onClick={handleAddToCart}>Add to Cart</button>
//             </div>
//     );
// };
//
//
// const App = () => {
//     return (
//         <Provider store={store}>
//             <div className="App">
//                 <h1>Shopping Cart App</h1>
//                 <Cart/>
//                 <AddToCartButton />
//             </div>
//         </Provider>
//     );
// };
//
// export default App;
