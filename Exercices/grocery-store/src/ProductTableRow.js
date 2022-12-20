export function ProductTableRow({ product }) {
    return (
        <tr className={product.stocked ? "" : "product_row--out_of_stock"}>
            <td>{product.name}</td>
            <td>{product.price}</td>
        </tr>
    );
}