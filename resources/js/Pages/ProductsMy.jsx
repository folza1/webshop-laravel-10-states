import Button from "react-bootstrap/Button";
import States4 from "@/Pages/States4.jsx";

export default function ProductsMy({ products3 }) {
    return (
        <States4>
            {handleToBasketClick => (
                <div>
                    {products3.map((product, index) => (
                        <div className="flex items-center" key={index}>
                            <div className="p-1 m-1">{product.title}</div>
                            <div className="p-1 m-1">{product.stock}</div>
                            <Button
                                className="p-1 m-1"
                                onClick={() => {
                                    if (product.stock > 0) {
                                        handleToBasketClick();
                                        product.stock = product.stock - 1;
                                    }
                                }}
                            >
                                Add to Basket
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </States4>
    );
}

