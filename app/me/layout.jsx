import Sidebar from "@/components/layouts/Sidebar";

export default function UserLayout({ children }) {
  return (
    <>
      <section className="py-1 sm:py-7 bg-color1">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h1 className="text-bold text-3xl">User Dashboard </h1>
        </div>
      </section>

      <section className="py-1">
        <div className="container max-w-screen-xl mx-auto px-4 ">
          <div className="flex flex-col md:flex-row -mx-4 ">
            <Sidebar />
            <main className="md:w-2/3 lg:w-3/4 px-4 ">
              <article className="border border-gray-200 bg-color1   rounded mb-5 p-3 lg:p-5">
                {children}
              </article>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}
