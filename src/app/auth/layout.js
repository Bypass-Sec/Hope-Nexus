export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1582721478779-0ae163c05a60?q=80&w=1942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 to-slate-950/50 z-[1]"></div>
      <div className="relative z-[2] min-h-screen flex flex-col pt-24">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md px-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
