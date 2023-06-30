import Link from "next/link";
import { Button } from "../ui/button";

export async function generateStaticParams() {
  return [{}];
}

export default function Home() {
  return (
    
        <Link href="/questions">
          <h2>Es kann losgehen!</h2>
          <Button style={{ marginBottom: 0 }}>Zu den Fragen</Button>
        </Link>
      
  );
}
