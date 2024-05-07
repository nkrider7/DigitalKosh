
export default function FAQ() {
  const Ques = [
    {
      ques: "What is Bitcoin?",
      ans: "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.",
    },
    {
      ques: "What is the price of Bitcoin?",
      ans: "The current price of Bitcoin is $40,000.",
    },
    {
      ques: "How to buy Bitcoin?",
      ans: "You can buy Bitcoin from various exchanges like Binance, WazirX, CoinSwitch, etc.",
    },
  ];

  return (
    <>
      <div className=" bg-neutral py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-white font-gil md:mb-6 lg:text-3xl">
              Frequently asked questions
            </h2>

            <p className="mx-auto max-w-screen-md text-center text-white md:text-lg">
              This is a section of some simple filler text, also known as
              placeholder text. It shares some characteristics of a real written
              text but is random or otherwise generated.
            </p>
          </div>

          <div className="join join-vertical  w-full">
           
            {Ques.map((q, index) => ( 
                <div className="collapse collapse-plus bg-neutral hover:bg-slate-500" key={index}>
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium ">
                    {q.ques}
                    </div>
                    <div className="collapse-content">
                    <p>{q.ans}</p>
                    </div>
                </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
