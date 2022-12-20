import { SearchBar } from './search-section/SearchBar';
import { TextInput, ToggleInput } from './search-section/Input';
import { ProductsTable } from './ProductsTable';
import { useCallback, useState } from 'react';



function reduceFilters(products, filters) {
    console.log("Filtering products...");
    function passedAllFilters(product) {
        return filters.every(
            (currentFilter) => currentFilter(product)
        );
    }

    const filterdProducts = [...products].filter(
        (product) => passedAllFilters(product)
    );
    return filterdProducts;
}

const sortByCategory = (products) => [...products].sort(
    (product1, product2) => product1.category.localeCompare(product2.category)
)

function categorize(products) {
    console.log("categorizing products...")
    const newCategorySet = (categoryName) => ({ name: categoryName, products: [] });
    const sortedProducts = sortByCategory(products);

    let categorizedProducts = [];
    let lastCategory = null;
    let currentCategorySet = null;
    sortedProducts.forEach(
        (product) => {
            if (product.category !== lastCategory) {
                currentCategorySet = newCategorySet(product.category);
                categorizedProducts.push(currentCategorySet);
                lastCategory = product.category;
            }

            currentCategorySet.products.push(product)
        }
    );
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
                    textState={[searchValue, setSearchValue]}
                />
                <ToggleInput
                    label="Only show products in stock"
                    checkedState={[onlyStocked, setOnlyStocked]}
                />
            </SearchBar>
            <ProductsTable products={categorizedData} />
        </>
    );
}
