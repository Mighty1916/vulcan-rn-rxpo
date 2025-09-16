export function LandingPage() {
  return (
    <div className="">
      <section className="py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Study together, stay accountable, and ace your exams.
            </h1>
            <p className="mt-4 text-slate-600">
              StudyBuddy Hub is a dedicated space to find partners, join communities, and collaborate in real-time video rooms.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="/dashboard" className="px-5 py-3 rounded-lg bg-blue-600 text-white font-medium">Open Dashboard</a>
              <a href="/communities" className="px-5 py-3 rounded-lg border font-medium">Explore Communities</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-xl border grid place-items-center bg-gradient-to-br from-blue-50 to-sky-50">
              <div className="text-center px-6">
                <div className="text-6xl">📚🤝</div>
                <div className="mt-3 text-slate-600">Focused collaboration made simple</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <h2 className="text-2xl font-semibold">Why StudyBuddy Hub?</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[{t:'Structured Groups',d:'Join topic-based communities with clear goals.'},{t:'Real-time Rooms',d:'Video, chat, and screen share built for study.'},{t:'Stay Accountable',d:'Timers, check-ins, and task lists coming soon.'}].map((f)=> (
            <div key={f.t} className="rounded-xl border p-6 hover:shadow-sm transition">
              <div className="text-3xl">🎯</div>
              <div className="mt-3 font-medium">{f.t}</div>
              <div className="text-slate-600 text-sm mt-1">{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="rounded-2xl border p-8 bg-gradient-to-r from-blue-50 to-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-lg font-semibold">Ready to study smarter?</div>
            <div className="text-slate-600">Jump into a community or open a room with a buddy.</div>
          </div>
          <div className="flex gap-3">
            <a href="/video-rooms" className="px-5 py-3 rounded-lg bg-blue-600 text-white font-medium">Start a Room</a>
            <a href="/profile" className="px-5 py-3 rounded-lg border font-medium">Build Profile</a>
          </div>
        </div>
      </section>
    </div>
  )
}

