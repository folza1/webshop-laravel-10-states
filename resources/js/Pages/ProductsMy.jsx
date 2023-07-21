import Button from "react-bootstrap/Button";
import States4 from "@/Pages/States4.jsx";

export default function ProductsMy({myState, setMyState, products3}) {
    const handleToBasketClick = () => {
        setMyState(myState + 1);
    };

    return (
        <States4>
            <div>
                {products3.map((product, index) => (
                    <div className="flex items-center" key={index}>
                        <div className="p-1 m-1">{product.title}</div>
                        <Button className="p-1 m-1" onClick={handleToBasketClick}>Add to Basket</Button>
                    </div>
                ))}
            </div>
        </States4>
    )
}
