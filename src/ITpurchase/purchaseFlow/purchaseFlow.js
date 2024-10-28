import { useState } from "react";
import ITPurchase from "../Itpur";
import EmailSelection from "../EmailSelection/EmailSelection";

export default function PurchaseFlow() {
    const [selectedProducts, setSelectedProducts] = useState([]);

    return (
        <div>
            {selectedProducts.length === 0 ? (
                <ITPurchase onProductsSelect={setSelectedProducts} />
            ) : (
                <EmailSelection selectedProducts={selectedProducts} />
            )}
        </div>
    );
}
