export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-muted" />
        <div className="h-4 w-32 bg-muted rounded" />
      </div>
    </div>
  )
}
