export function convertImageToBase64(image: HTMLInputElement): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!image.files || !image.files[0]) {
      reject("");
    } else {
      const file = image.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(typeof reader.result === "string" ? reader.result : "");
      };
      reader.onerror = () => {
        reject("");
      };
    }
  });
}

export async function base64ToBlob(base64: string): Promise<Blob> {
  const response = await fetch(base64);
  const blob = await response.blob();
  return blob;
}

//get mime type from base64
export function base64MimeType(encoded: string): string | null {
  let result = null;

  if (typeof encoded !== "string") {
    return result;
  }

  const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
}

export function base64FileExtension(encoded: string): string | null {
  const mime = base64MimeType(encoded);
  if (mime) {
    return mime.split("/")[1];
  } else {
    return null;
  }
}
