export function VideoRoomsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Video Rooms</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border">Invite Friend (Free)</button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Start Room</button>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="rounded-xl border overflow-hidden">
          <div className="aspect-video bg-slate-100 grid place-items-center">
            <div className="text-center">
              <div className="text-6xl">🎥</div>
              <div className="text-slate-600">Your camera preview</div>
            </div>
          </div>
          <div className="p-4 border-t flex items-center justify-center gap-3">
            <button className="px-3 py-2 rounded-md border">Mute</button>
            <button className="px-3 py-2 rounded-md border">Stop Video</button>
            <button className="px-3 py-2 rounded-md border">Share Screen</button>
            <button className="px-3 py-2 rounded-md bg-red-600 text-white">End</button>
          </div>
        </div>

        <aside className="rounded-xl border flex flex-col">
          <div className="p-4 border-b font-semibold">Chat</div>
          <div className="flex-1 p-4 space-y-3 overflow-auto">
            {[{u:'Aisha',m:'Ready to start!'},{u:'Leo',m:'Let’s do 50/10 pomodoro.'}].map((x,i)=> (
              <div key={i} className="text-sm"><span className="font-medium">{x.u}:</span> {x.m}</div>
            ))}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input className="flex-1 rounded-md border px-3 py-2" placeholder="Type a message..." />
            <button className="px-3 py-2 rounded-md bg-blue-600 text-white">Send</button>
          </div>
        </aside>
      </div>
    </div>
  )
}

