
export default function Loading() {
  return (
    <>
     <div className="mx-auto max-w-screen-xl px-20 py-10">
        <div className="flex flex-col justify-center gap-4 w-full border-2 border-[#000070] p-2 rounded-lg">
          <div className="flex gap-4 items-center justify-center">
            <div className="skeleton bg-[#000070] w-16 h-16 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton bg-[#000070] h-4 w-20"></div>
              <div className="skeleton bg-[#000070] h-4 w-28"></div>
            </div>
            <div className="skeleton bg-[#000070] w-16 h-16 rounded-md shrink-0"></div>
          </div>
          <div className="skeleton bg-[#000070] h-4 w-full"></div>
          <div className="skeleton bg-[#000070] h-4 w-full"></div>
          <div className="skeleton bg-[#000070] h-32 w-full"></div>
        </div>
      </div>
    </>
  )
}
