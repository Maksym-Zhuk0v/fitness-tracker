import { supabase } from "@/lib/supabaseClient";

export async function uploadUserPhoto(file: File, userId: string) {
  const folder = "profile-photos";
  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").toLowerCase();
  const uniqueName = `user_photo_${Date.now()}_${cleanName}`;
  const filePath = `${folder}/${userId}/${uniqueName}`;

  const { error: uploadError } = await supabase.storage
    .from(folder)
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage
    .from(folder)
    .getPublicUrl(filePath);

  const photoUrl = urlData.publicUrl;

  const { error: updateError } = await supabase
    .from("users")
    .update({ avatar_url: photoUrl })
    .eq("id", userId);

  if (updateError) throw updateError;

  return photoUrl;
}
