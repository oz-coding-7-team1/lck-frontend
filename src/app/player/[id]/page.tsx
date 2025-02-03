export default async function PlayerPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Player Profile: {id}</h1>
        {/* Player details will go here */}
      </div>
    </div>
  );
}
