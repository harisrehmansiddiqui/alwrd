import { revalidatePath, updateTag } from "next/cache";

export function revalidatePublicContent() {
  updateTag("site-media");
  revalidatePath("/");
  revalidatePath("/faq");
  revalidatePath("/about");
  revalidatePath("/resources");
  revalidatePath("/terms");
  revalidatePath("/privacy");
  revalidatePath("/admin/media");
  revalidatePath("/gallery");
  revalidatePath("/contact");
  revalidatePath("/collaborations");
  revalidatePath("/our-services", "layout");
  revalidatePath("/book-umrah");
}
