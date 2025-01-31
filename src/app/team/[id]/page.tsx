export default function TeamPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Team Profile: {params.id}</h1>
      {/* Team details will go here */}
    </div>
  );
}
