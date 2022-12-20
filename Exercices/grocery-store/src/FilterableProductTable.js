import { SearchBar } from './SearchBar';
import { ProductsTable } from './ProductsTable';

function fetchAllProducts() {
    return [
        { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
        { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
        { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
        { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
        { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
        { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
    ];
}

function filterProducts(products, filters) {
    return [
        { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
        { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
        { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
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
                { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
            ]
        }
    ];
}

export function FilterableProductTable({ groceries }) {

    const allProducts = fetchAllProducts();
    const filterdProducts = filterProducts(allProducts);
    const categorizedData = categorizeProducts(filterdProducts);

    return (
        <>
            <SearchBar />
            <ProductsTable products={categorizedData}/>
        </>
    );
}
