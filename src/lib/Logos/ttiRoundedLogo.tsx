import Image from "next/image";

interface TTIRoundedLogoProps {
  width?: number;
  height?: number;
}
const TTIRoundedLogo = ({ width, height }: TTIRoundedLogoProps) => {
  return (
    <div>
      <Image
        src='/img/logos/ttiLogo.png'
        alt='TTI Rounded Logo'
        width={width ? width : 100}
        height={height ? height : 100}
        className='rounded-full'
      />
    </div>
  );
};

export default TTIRoundedLogo;
