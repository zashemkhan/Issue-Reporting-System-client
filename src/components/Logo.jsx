export default function Logo({ onClick = () => {} }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onClick}
        className="text-2xl font-bold text-[#1e91f4]"
      >
        CityFix Portal
      </button>
    </div>
  );
}
