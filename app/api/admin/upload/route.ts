import { db } from "@/db";
import { images } from "@/db/schema";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return Response.json({ error: "غير مصرح" }, { status: 401 });
  }
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "لم يتم اختيار ملف" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return Response.json({ error: "الملف ليس صورة" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "حجم الصورة كبير جداً (الحد 8MB)" }, { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const [row] = await db
    .insert(images)
    .values({ mime: file.type, data: buffer })
    .returning({ id: images.id });
  return Response.json({ url: `/api/images/${row.id}` });
}
