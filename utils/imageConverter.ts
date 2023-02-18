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
