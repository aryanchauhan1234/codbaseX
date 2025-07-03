export function Card({ className = "", children }) {
  return (
    <div className={`rounded-xl border bg-white p-4 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ className = "", children }) {
  return (
    <div className={`p-2 ${className}`}>
      {children}
    </div>
  );
}
