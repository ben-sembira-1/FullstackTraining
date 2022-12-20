import { SearchBar } from './search-section/SearchBar';
import { TextInput, ToggleInput } from './search-section/Input';
import { ProductsTable } from './ProductsTable';
import { useCallback, useState } from 'react';



function reduceFilters(products, filters) {
    function passedAllFilters(product) {
        return filters.reduce(
            (passedUntilHere, currentFilter) => passedUntilHere && currentFilter(product)
        );
    }

    const filterdProducts = [...products].filter(
        (product) => passedAllFilters(product)
    );
    console.log("Filtered products: " + filterdProducts)
    return filterdProducts;
}

const sortByCategory = (products) => [...products].sort(
    (product1, product2) => product1.category.localeCompare(product2.category)
)

function categorize(products) {
    const newCategorySet = (categoryName) => ({ name: categoryName, products: [] });
    const sortedProducts = sortByCategory(products);
    console.log("Sorted products: " + sortedProducts);

    let categorizedProducts = [];
    let lastCategory = null;
    let currentCategorySet = null;
    sortedProducts.forEach(
        (product) => {
            console.log(categorizedProducts, lastCategory, currentCategorySet);
            if (product.category !== lastCategory) {
                currentCategorySet = newCategorySet(product.category);
                categorizedProducts.push(currentCategorySet);
                lastCategory = product.category;
            }

            currentCategorySet.products.push(product)
        }
    );
    console.log("Categorized products: " + categorizedProducts);
    return categorizedProducts;
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

    const filterdProducts = reduceFilters(products, [searchFilter, stockedFilter]);
    const categorizedData = categorize(filterdProducts);

    return (
        <>
            <SearchBar>
                <TextInput
                    placeholder="Search..."
                    onChange={(value) => {
                        console.log("text input updated with: " + value);
                        setSearchValue(value);
                    }}
                />
                <ToggleInput
                    label="Only show products in stock"
                    onToggle={(value) => {
                        console.log("toggle input updated with: " + value);
                        setOnlyStocked(value);
                    }}
                />
            </SearchBar>
            <ProductsTable products={categorizedData} />
        </>
    );
}
