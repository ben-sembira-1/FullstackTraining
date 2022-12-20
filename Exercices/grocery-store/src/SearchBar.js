export function SearchBar({ filters }) {
    return (
        <>
            <input type="text" label="Search..." />
            <input type="checkbox" label="Only show products in stock" />
        </>
    );
}