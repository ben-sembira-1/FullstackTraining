import { SearchBar } from './SearchBar';


function FilterableProductTable({ groceries }) {

    const rawData = [
        { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
        { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
        { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
        { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
        { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
        { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
    ]

    const categorizedData = [
        {
            name: "Fruits",
            products: [
                { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
                { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
                { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
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
    ]

    return (
        <>
            <SearchBar />
            <ProductTable products={data}>
                {
                    categorizedData.map(
                        (category, index) => {
                            <ProductCategorySection key={index} name={category.name} products={category.products} />
                        }
                    )
                }
            </ProductTable>
        </>
    );
}
