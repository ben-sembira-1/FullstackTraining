export function ProductsCategoryTableSection({ name, products }) {
    return (
        <>
            <tr>
                <th className="products-table-full-row">{name}</th>
            </tr>
            {
                products.map(
                    (product, index) => {
                        <ProductTableRow product={product} />
                    }
                )
            }
        </>
    );
}