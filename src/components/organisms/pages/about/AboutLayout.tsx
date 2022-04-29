// import Sidebars from '@/components/organisms/Sidebars'

export default function AboutLayout({
  title,
  subtitle,
  // cards,
  children,
}: {
  title: string
  subtitle: string
  // cards: JSX.Element[]
  children: React.ReactNode
}) {
  return (
    <div className="pretty-weirdly-shaped-gradient flex bg-[length:350%] md:bg-[length:100%]">
      <style jsx>{`
        .pretty-weirdly-shaped-gradient {
          background-image: url('/images/header-bg.svg');
          background-repeat: no-repeat;
          // background-size: 350%;
          background-position: top;
        }
      `}</style>
      {/* <Sidebars /> */}
      <main className="w-full min-h-screen mx-auto max-w-[1146px] pt-24 flex flex-col">
        <section className="flex flex-col gap-17.5">
          <header className="flex flex-col gap-2">
            <h1 className="text-[38px] leading-[38px] md:text-[100px] md:leading-[100px] font-bold font-title text-center">
              {title}
            </h1>
            <p className="text-base md:text-2xl text-center">{subtitle}</p>
          </header>
          {/* <div
            className={`flex flex-col md:grid ${
              { 4: 'grid-cols-2 md:mr-[264px]', 6: 'grid-cols-3 md:mr-[147px]' }[cards.length] || ''
            } gap-6`}
          >
            {cards}
          </div> */}
        </section>
        <section className="text-dark">{children}</section>
      </main>
    </div>
  )
}
