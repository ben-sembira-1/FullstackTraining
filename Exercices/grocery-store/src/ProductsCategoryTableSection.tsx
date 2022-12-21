import { ProductTableRow } from "./ProductTableRow";

export function ProductsCategoryTableSection({ name, products }) {
    return (
        <>
            <tr>
                <th className="products_table_full_row" colSpan={2}>{name}</th>
            </tr>
            {
                products.map(
                    (product, index) => <ProductTableRow key={index} product={product} />
                )
            }
        </>
    );
}
