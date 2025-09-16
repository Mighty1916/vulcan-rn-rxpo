type StudyPost = {
  id: string
  author: string
  subject: string
  content: string
  timeAgo: string
}

const mockPosts: StudyPost[] = [
  { id: '1', author: 'Aisha', subject: 'Calculus', content: 'Looking for a derivative practice buddy for 45 mins.', timeAgo: '10m' },
  { id: '2', author: 'Leo', subject: 'Biology', content: 'Flashcards on cell respiration, anyone join?', timeAgo: '25m' },
  { id: '3', author: 'Sam', subject: 'History', content: 'Pomodoro session on WW2 causes, 50/10.', timeAgo: '1h' },
]

export function DashboardPage() {
  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6">
      <aside className="hidden lg:block">
        <div className="rounded-xl border p-4">
          <div className="font-semibold">Quick Links</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="hover:text-blue-600" href="/communities">Find Communities</a></li>
            <li><a className="hover:text-blue-600" href="/video-rooms">Open Video Room</a></li>
            <li><a className="hover:text-blue-600" href="/profile">Edit Profile</a></li>
          </ul>
        </div>
      </aside>
      <section>
        <div className="flex items-center gap-3">
          <input className="flex-1 rounded-lg border px-4 py-2" placeholder="Search posts, subjects, buddies..." />
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Post Study Invite</button>
        </div>

        <div className="mt-6 space-y-4">
          {mockPosts.map((p) => (
            <article key={p.id} className="rounded-xl border p-4">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{p.author} • {p.subject}</span>
                <span>{p.timeAgo}</span>
              </div>
              <div className="mt-2">{p.content}</div>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1.5 rounded-md border">Save</button>
                <a href="/video-rooms" className="px-3 py-1.5 rounded-md bg-blue-600 text-white">Open Room</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

