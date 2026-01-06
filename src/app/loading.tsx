import Loading from "@/components/global/Loading";

function LoadingMain() {
  return (
    <div
      className='flex justify-center items-center w-full h-screen'
      suppressHydrationWarning
    >
      <Loading />
    </div>
  );
}

export default LoadingMain;
