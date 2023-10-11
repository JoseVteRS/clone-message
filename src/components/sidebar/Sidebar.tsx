import { DesktopSidebar } from "./DesktopSidebar"

export const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <DesktopSidebar />
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  )
}
