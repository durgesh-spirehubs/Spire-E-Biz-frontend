import { Button } from "@/components/ui/button";
import Link from "next/link";
const PageNotFound = () => {
  return (
    <div className="justify-center items-center">
      <h3 className="text-4xl font-bold">404</h3>
      You have opened any wrong URL, this page is not found
      <Link href="/">
        <Button>Home</Button>
      </Link>
    </div>
  );
};
export default PageNotFound;
