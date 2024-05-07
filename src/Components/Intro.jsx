import img from "../assets/intro.jpg";

export default function Intro() {
  return (
    <>
      <div className=" bg-neutral py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div>
              <div className="h-68 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
                <img
                  src={img}
                  loading="lazy"
                  alt="Photo Of cypto"
                  className="h-full hover:scale-95 transition w-full object-cover object-center"
                />
              </div>
            </div>

            <div className="md:pt-8">
              <p className="text-center font-bold text-white font-gil text-3xl md:text-left">
                Cryptocurrency
              </p>

              <h1 className="mb-4 text-center text-2xl  text-white sm:text-3xl md:mb-6 md:text-left">
                Token ICO will start 1998
              </h1>

              <p className="mb-6 text-white sm:text-lg md:mb-8">
                Crypton is a block chain based marketplace, where buyers &
                sellers meet to carry out operations involving digital goods &
                assets with crypto currency transactions.
              </p>

              <h2 className="mb-2 text-center text-xl font-semibold text-white font-gil sm:text-2xl md:mb-4 md:text-left">
                About us
              </h2>

              <p className="mb-6 text-white sm:text-lg md:mb-8">
                {" "}
                ✅ Crypton is a block chain based marketplace, where buyers &
                sellers meet to carry out operations.
              </p>
              <p className="mb-6 text-white sm:text-lg md:mb-8">
                {" "}
                ✅ Involving digital goods & assets with crypto currency digita
                transactions ations involving .
              </p>
              <p className="mb-6 text-white sm:text-lg md:mb-8">
                {" "}
                ✅ Also Share is a block chain based marketplace, where buyers &
                Location based in dentifiy manner contribution method is like
                demotive sellers meet to carry out operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
