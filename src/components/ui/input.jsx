export function Input({ className, ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-800 ${className}`}
      {...props}
    />
  );
}
