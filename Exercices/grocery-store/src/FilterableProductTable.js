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

const sortProductsByCategory = (products) => [...products].sort(
    (product1, product2) => product1.category.localCompare(product2.category)
)

function categorizeProducts(products) {
    const newCategorySet = (categoryName) => ({ name: categoryName, products: [] });
    const sortedProducts = sortProductsByCategory(products);
    
    let categorizedProducts = [];
    let lastCategory = null;
    let currentCategorySet = null;
    sortedProducts.forEach(
        (product) => {
            if (product.category !== lastCategory) {
                currentCategorySet && categorizedProducts.push(categorizedProducts);
                currentCategorySet = newCategorySet(product.category);
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
