export function SearchBar({ filters }) {
    return (
        <form>
            <div>
                <input type="text" placeholder="Search..." />
            </div>
            <div>
                <input type="checkbox" />
                <label>Only show products in stock</label>
            </div>
        </form>
    );
}