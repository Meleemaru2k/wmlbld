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

export async function urltoFile(
  url: string,
  filename: string,
  mimeType: string
) {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      console.log(buf);
      return new File([buf], filename, { type: mimeType });
    });
}
