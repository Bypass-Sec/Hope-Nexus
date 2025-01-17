export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[url('https://cdn.discordapp.com/attachments/807935266588327956/1329349133068275753/image.png?ex=678a045b&is=6788b2db&hm=4ba5598c2d6008f1ef5aec877e98195251cbbbdfc33cd7a9d16a56cddc6aa4d4&')] bg-cover bg-center bg-no-repeat relative">
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
