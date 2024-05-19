import Image from "next/image";
import Carosel from './components/carousel';

export default function Home() {
  return (
    <main id="main" className=" flex min-w-full min-h-screen flex-col items-center justify-center p-10">
      <Carosel />
    </main>
  );
}
