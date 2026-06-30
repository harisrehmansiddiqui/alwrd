import { revalidatePath } from "next/cache";

export function revalidatePublicContent() {
  revalidatePath("/");
  revalidatePath("/faq");
  revalidatePath("/about");
  revalidatePath("/resources");
  revalidatePath("/terms");
  revalidatePath("/privacy");
  revalidatePath("/book-umrah");
  revalidatePath("/gallery");
}
