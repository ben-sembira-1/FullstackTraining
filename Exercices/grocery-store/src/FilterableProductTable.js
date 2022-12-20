import { SearchBar } from './SearchBar';
import { ProductsTable } from './ProductsTable';



function filterProducts(products, filters) {
    return [
        { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
        { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
        { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
        { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
        { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
    ];
}

function categorizeProducts(products) {
    return [
        {
            name: "Fruits",
            products: [
                { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
                { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
            ]
        },
        {
            name: "Vegetables",
            products: [
                { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
                { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
                { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
            ]
        }
    ];
}

export function FilterableProductTable({ products }) {

    const filterdProducts = filterProducts(products, [((product) => true)]);
    const categorizedData = categorizeProducts(filterdProducts);

    return (
        <>
            <SearchBar />
            <ProductsTable products={categorizedData} />
        </>
    );
}
