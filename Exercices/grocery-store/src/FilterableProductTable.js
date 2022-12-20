import { SearchBar } from './search-section/SearchBar';
import { TextInput, ToggleInput } from './search-section/Input';
import { ProductsTable } from './ProductsTable';
import { useCallback, useState } from 'react';



function filterProducts(products, filters) {
    function passedAllFilters(product) {
        filters.reduce(
            (passedUntilHere, currentFilter) => passedUntilHere && currentFilter(product)
        );
    }

    return products.filter(
        (product) => passedAllFilters(product)
    );
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
    const [searchValue, setSearchValue] = useState("");
    const [onlyStocked, setOnlyStocked] = useState(false);


    const searchFilter = useCallback(
        (product) => product.name.includes(searchValue),
        [searchValue]
    )

    const stockedFilter = useCallback(
        (product) => !onlyStocked || product.stocked,
        [onlyStocked]
    )

    const filterdProducts = filterProducts(products, [searchFilter, stockedFilter]);
    const categorizedData = categorizeProducts(filterdProducts);

    return (
        <>
            <SearchBar>
                <TextInput
                    placeholder="Search..."
                    onChange={setSearchValue}
                />
                <ToggleInput
                    label="Only show products in stock"
                    onChange={setOnlyStocked}
                />
            </SearchBar>
            <ProductsTable products={categorizedData} />
        </>
    );
}
