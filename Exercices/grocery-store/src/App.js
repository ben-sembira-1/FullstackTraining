import { FilterableProductTable } from './FilterableProductTable'

function fetchAllProducts() {
  const products = [];
  for (let basePrice = 0; basePrice < 3; basePrice++) {
    [{ category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }].forEach(
      (value) => {
        const new_price = (+(value.price[1]) + basePrice);
        value.price = "$" + new_price;
        value.stocked = Math.random() > 0.3
        products.push(value);
      }
    )
    products.push()
  }
  return products;
}

function App() {
  return (
    <FilterableProductTable products={fetchAllProducts()} />
  );
}

export default App;
