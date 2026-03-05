import { Laptop } from "@/types";

interface ComparisonTableProps {
  laptops: { laptop: Laptop; score: number }[];
}

const ComparisonTable = ({ laptops }: ComparisonTableProps) => {
  const specs = [
    { label: "Price", key: (l: Laptop) => `₹${l.price.toLocaleString("en-IN")}` },
    { label: "CPU", key: (l: Laptop) => l.cpu },
    { label: "GPU", key: (l: Laptop) => l.gpu },
    { label: "RAM", key: (l: Laptop) => l.ram },
    { label: "Storage", key: (l: Laptop) => l.storage },
    { label: "Display", key: (l: Laptop) => l.screen_size },
    { label: "Weight", key: (l: Laptop) => l.weight },
    { label: "Battery", key: (l: Laptop) => l.battery_life },
    { label: "Rating", key: (l: Laptop) => `${l.rating}/5` },
    { label: "Performance", key: (l: Laptop) => `${l.performance_score}/100` },
    { label: "Portability", key: (l: Laptop) => `${l.portability_score}/100` },
    { label: "Battery Score", key: (l: Laptop) => `${l.battery_score}/100` },
    { label: "Screen Score", key: (l: Laptop) => `${l.screen_score}/100` },
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface">
            <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Spec</th>
            {laptops.map(({ laptop }, i) => (
              <th key={i} className="px-4 py-3 text-left font-semibold text-card-foreground">
                {laptop.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specs.map((spec, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-surface/50"}>
              <td className="px-4 py-2.5 font-medium text-muted-foreground">{spec.label}</td>
              {laptops.map(({ laptop }, j) => (
                <td key={j} className="px-4 py-2.5 text-card-foreground">
                  {spec.key(laptop)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
