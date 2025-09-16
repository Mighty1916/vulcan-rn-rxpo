export function ProfilePage() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold">Your Profile</h2>
      <div className="mt-6 rounded-xl border p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-600">Full Name</label>
            <input className="mt-1 w-full rounded-md border px-3 py-2" placeholder="e.g. Priya Sharma" />
          </div>
          <div>
            <label className="text-sm text-slate-600">School/College</label>
            <input className="mt-1 w-full rounded-md border px-3 py-2" placeholder="e.g. NIT Trichy" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-slate-600">Subjects</label>
            <input className="mt-1 w-full rounded-md border px-3 py-2" placeholder="e.g. Calculus, Physics" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-slate-600">About</label>
            <textarea className="mt-1 w-full rounded-md border px-3 py-2" rows={4} placeholder="Short intro, goals, schedule..." />
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Save</button>
          <button className="px-4 py-2 rounded-lg border">Cancel</button>
        </div>
      </div>
    </div>
  )
}

