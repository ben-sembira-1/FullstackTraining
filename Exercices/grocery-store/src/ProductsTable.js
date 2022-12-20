export function ProductsTable({products}) {
    return (
        <div>
            {
                products.map(
                    (category, index) => {
                        <ProductsCategorySection key={index} name={category.name} products={category.products} />
                    }
                )
            }
        </div>
    );
}