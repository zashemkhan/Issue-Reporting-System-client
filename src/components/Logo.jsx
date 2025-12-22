export default function Logo({ onClick = () => {} }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onClick}
        className="text-2xl font-extrabold bg-clip-text text-transparent 
                   bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 
                   hover:scale-105 transition-transform duration-300"
      >
        IssueRPT
      </button>
    </div>
  );
}
