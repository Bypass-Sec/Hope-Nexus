import { Card, CardHeader, CardContent, CardFooter } from "../Forum/ui/card"

export function ForumCardSkeleton() {
  return (
    <Card className="mb-4 bg-white text-slate-900 border border-slate-200">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-slate-100 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-48 bg-slate-100 rounded animate-pulse" />
            <div className="h-3 w-32 bg-slate-100 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex space-x-2 mt-2">
          <div className="h-5 w-16 bg-slate-100 rounded-full animate-pulse" />
          <div className="h-5 w-16 bg-slate-100 rounded-full animate-pulse" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-slate-100 rounded animate-pulse" />
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex space-x-4">
          <div className="h-8 w-16 bg-slate-100 rounded animate-pulse" />
          <div className="h-8 w-16 bg-slate-100 rounded animate-pulse" />
        </div>
      </CardFooter>
    </Card>
  )
}
