import Image from "next/image";
import AyurLinkSearch from "../component/AyurLinkSearch";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-full">
        <AyurLinkSearch />
      </div>
    </main>
  )
}
