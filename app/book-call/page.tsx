import { redirect } from "next/navigation";
import { CALENDLY_URL } from "@/lib/constants";

export default function BookCall() {
  redirect(CALENDLY_URL);
}
