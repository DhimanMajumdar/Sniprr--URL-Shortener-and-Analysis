import { UAParser } from "ua-parser-js";
import supabase from "./supabase";
import supabaseUrl from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to load URLs");
  }
  return data;
}

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete("*").eq("id", id);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to delete URLs");
  }
  return data;
}

export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrFile
) {
  const short_url = Math.random().toString(36).substring(2, 7);
  const fileName = `qr-${short_url}.png`;

  // Upload QR code to storage
  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrFile, {
      contentType: "image/png",
      cacheControl: "3600",
      upsert: false,
    });

  if (storageError) {
    console.error("Storage error:", storageError);
    throw new Error("Failed to upload QR code");
  }

  const qrUrl = `${supabase.supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

  // Create URL record
  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        user_id,
        original_url: longUrl,
        custom_url: customUrl || null,
        short_url,
        qr: qrUrl,
      },
    ])
    .select();

  if (error) {
    // Clean up the uploaded QR if URL creation fails
    await supabase.storage.from("qrs").remove([fileName]);
    throw new Error("Failed to create short URL");
  }

  return data;
}

export async function getLongUrl(id) {
  const { data, error } = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

  if (error || !data) {
    console.error(error?.message || "URL not found");
    throw new Error("Short URL not found");
  }

  if (!data.original_url.startsWith("http")) {
    data.original_url = "https://" + data.original_url;
  }

  return data;
}

const parser = new UAParser();

export const storeClicks = async ({ id, originalUrl }) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop"; // Default to desktop if type is not detected

    const response = await fetch("https://ipapi.co/json");
    const { city, country_name: country } = await response.json();

    // Record the click
    await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
    });

    // Redirect to the original URL
    window.location.href = originalUrl;
  } catch (error) {
    console.error("Error recording click:", error);
  }
};
export async function getUrl({ id, user_id }) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Short Url not found");
  }

  return data;
}
