export default function HeadingSection() {
  return (
    <div className="bg-white" >
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-4">
        <div className="relative isolate overflow-hidden bg-white-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-8 md:pt-24 lg:flex lg:gap-x-20 lg:px-12 lg:pt-0">
         
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left" >
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Hackathon
             
            </h2>
            <br />
            <h1 style={{fontSize:20}}>Join us for an exciting hackathon experience where students, teachers, and organizations come together to innovate, collaborate, and compete in a dynamic and inspiring environment!</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {/* XXXXXXXXXXXXXX */}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#"
                className="rounded-md bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-black">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div style={{width:600,height:400}}>
            <img src="boostImage.jpeg" alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
}
