export default function PlayerPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Player Profile: {params.id}</h1>
      {/* Player details will go here */}
    </div>
  );
}
