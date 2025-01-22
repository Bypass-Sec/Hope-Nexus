import type React from "react"
import Image from "next/image"

const ProblemSolutionSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center mb-16 gap-16">
          <div className="lg:w-1/2 lg:pr-16">
            <h2 className="text-4xl md:text-6xl font-bold text-orange-500 mb-10">The Leading Problem</h2>
            <div className="space-y-6 text-lg leading-relaxed text-slate-500">
              <p className="text-2xl">
                In the aftermath of a disaster, communities face urgent and diverse needs, varying from food, clean
                water, and shelter to healthcare and sanitation supplies. However, there is often a gap between the
                immediate needs of affected populations and the timing of donations received, giving rise to challenges
                like uncoordinated donations, excessive supply of certain goods, under-supply of others as well as
                logistical challenges that cause further delays in delivering aid.
              </p>
              <p className="text-2xl">
                A recent study has shown the lack of motivation for individuals to make a difference elsewhere, along
                with the deficiency of communication and coordination between non-profit organizations has created a
                sense of distrust for people to make donations, which makes it a real problem that must be addressed.{" "}
                <span className="italic">&quot;Only a life lived for others is a life worthwhile.&quot;</span> says
                Albert Einstein, and his quote resonates with what we aim to encourage using our platform.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <Image
              src="https://images.unsplash.com/photo-1590355199953-b919e37f152f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Disaster relief efforts"
              width={600}
              height={400}
              className="rounded-3xl shadow-lg object-cover w-full h-[400px]"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="lg:w-1/2 lg:pl-16">
            <h2 className="text-4xl md:text-6xl font-bold text-orange-500 mb-10">The Digital Solution</h2>
            <div className="space-y-6 text-lg leading-relaxed text-slate-500">
              <p className="text-2xl font-bold">
                Our software, Hope Nexus, is a web app that helps coordinate, simplify, and centralize donations and
                campaigns among both individuals and non-profits.
              </p>
              <p className="text-2xl">
                It will give users who are new to donating an easy and streamlined experience at choosing which area to
                donate to, and to which nonprofit organization via an interactive, easy-to-use map with a secure payment
                system.
              </p>
              <p className="text-2xl">
                It will also allow collaboration among Non-profits around the world to communicate & create update logs
                for individuals to view & stay up to date with the progress of a certain funding campaign while having
                the authority to create new campaigns according to needs around the world.
              </p>
              <p className="text-2xl">
                These features in a single platform has not been replicated once before. Handling donations and choosing
                the right organization users want to fund has never been easier, for our objective is to create a hub
                for humanity where everybody can work together as a nexus of hope to help solve the world&apos;s biggest
                crises.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <Image
              src="https://images.unsplash.com/photo-1624640647899-081c3d30fdbb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Digital solution for donations"
              width={600}
              height={400}
              className="rounded-3xl shadow-lg object-cover w-full h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemSolutionSection