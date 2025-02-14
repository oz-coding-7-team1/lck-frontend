import Link from "next/link";

export default function SideMenu() {
  return (
    <nav className="p-4 text-white bg-gray-800">
      <ul className="space-y-4">
        <li>
          <Link href="/main" className="hover:underline">
            Main
          </Link>
        </li>
        <li>
          <Link href="/playerlist" className="hover:underline">
            Players
          </Link>
        </li>
        <li>
          <Link href="/teamlist" className="hover:underline">
            Teams
          </Link>
        </li>
        <li>
          <Link href="/myprofile" className="hover:underline">
            My Profile
          </Link>
        </li>
        <li>
          <Link href="/my-choeae" className="hover:underline">
            My Choeae
          </Link>
        </li>
        <li>
          <Link href="/search" className="hover:underline">
            Search
          </Link>
        </li>
      </ul>
    </nav>
  );
}
