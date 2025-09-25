export default function Card({ title, desc }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-md transition">
      <h4 className="text-xl font-bold text-indigo-600">{title}</h4>
      <p className="mt-2 text-gray-600">{desc}</p>
    </div>
  );
}
