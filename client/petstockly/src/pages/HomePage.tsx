import landingpage from '../assets/Mundo Pet.jpg';

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col bg-slate-100 font-sans">
      {/* MAIN */}
      <main className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* IMAGE SECTION – FULL KIRI */}
        <section className="hidden h-full w-7/12 bg-slate-100 lg:block">
          <img
            src={landingpage}
            alt="Pet inventory illustration"
            className="h-full w-full object-cover"
          />
        </section>

        {/* versi mobile: gambar di atas form */}
        <section className="order-1 flex h-52 w-full items-center justify-center bg-slate-100 px-4 lg:hidden">
          <img
            src={landingpage}
            alt="Pet inventory illustration"
            className="h-full w-auto object-contain"
          />
        </section>

        {/* LOGIN SECTION – KANAN, TANPA CARD PUTIH */}
        <section className="order-2 flex h-full w-full items-center justify-center px-6 py-6 lg:order-none lg:w-5/12 lg:px-16">
          <div className="w-full max-w-md">
            {/* di Hacktiv di sini biasanya ada logo, kalau nanti mau ditambah tinggal taruh di atas */}
            <h1 className="text-3xl font-semibold text-[#163c77] lg:text-4xl">
              Manage Pet Stock
            </h1>
            <p className="mt-3 mb-8 text-sm text-slate-500 lg:text-base">
              Track supplies, monitor deliveries, and restock faster with PetStockly.
            </p>

            <form className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-[#1c274c]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@petstockly.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-[#163c77] focus:outline-none focus:ring-2 focus:ring-[#163c77]/20"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-semibold text-[#1c274c]">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-[#163c77] focus:outline-none focus:ring-2 focus:ring-[#163c77]/20"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#163c77] py-3 text-sm font-semibold text-white transition hover:bg-[#112e5d] lg:text-base"
              >
                Login
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="flex items-center justify-between bg-[#0f2f63] px-6 py-3 text-xs text-slate-100 sm:px-12 lg:px-16">
        <span>© 2025 PetStockly. All Rights Reserved.</span>
        <nav className="flex gap-5">
          <a href="#" className="hover:underline">
            Terms &amp; Condition
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </nav>
      </footer>
    </div>
  );
}
