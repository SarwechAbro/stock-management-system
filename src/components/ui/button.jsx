export function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md text-white font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
