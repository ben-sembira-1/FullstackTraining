export function SearchBar({ filters }) {
    return (
        <>
            <div>
                <input type="text" placeholder="Search..." />
            </div>
            <div>
                <input type="checkbox" />
                <label>Only show products in stock</label>
            </div>
        </>
    );
}