type Community = {
  id: string
  name: string
  members: number
  description: string
}

const mockCommunities: Community[] = [
  { id: 'math', name: 'Mathematics', members: 1240, description: 'Algebra, calculus, and problem-solving sessions.' },
  { id: 'cs', name: 'Computer Science', members: 980, description: 'DSA practice, project collabs, and code reviews.' },
  { id: 'bio', name: 'Biology', members: 720, description: 'Notes exchange, flashcards, and lab prep.' },
  { id: 'history', name: 'History', members: 560, description: 'Timelines, essay feedback, and debates.' },
]

export function CommunitiesPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Communities</h2>
        <button className="px-4 py-2 rounded-lg border">Create Community</button>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCommunities.map((c) => (
          <div key={c.id} className="rounded-xl border p-5 hover:shadow-sm transition">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-slate-500">{c.members.toLocaleString()} members</div>
              </div>
              <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 grid place-items-center">#</div>
            </div>
            <p className="text-sm text-slate-600 mt-3">{c.description}</p>
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-1.5 rounded-md border">Preview</button>
              <button className="px-3 py-1.5 rounded-md bg-blue-600 text-white">Join</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

