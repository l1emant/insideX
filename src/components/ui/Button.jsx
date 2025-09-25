export function Button({ children }) {
  return (
    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
      {children}
    </button>
  );
}
