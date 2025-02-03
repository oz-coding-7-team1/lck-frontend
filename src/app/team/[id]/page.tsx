export default function TeamPage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Team Profile: {params.id}</h1>
        {/* Team details will go here */}
      </div>
    </div>
  );
}
