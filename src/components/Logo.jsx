export default function Logo({ onClick = () => {} }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onClick}
        className="text-2xl font-bold text-[#8b0000] hover:text-[#b22222] transition-colors duration-300"
      >
        IssueRPT
      </button>
    </div>
  );
}
