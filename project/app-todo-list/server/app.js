const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "image.jpg");

const fileAlreadyExists = async () =>
  new Promise((res) => {
    fs.stat(filePath, (err, stats) => {
      if (err || !stats) return res(false);
      return res(true);
    });
  });

const img = document.getElementById("image");
if (img) {
  if (fileAlreadyExists()) {
    // img.setAttribute("src", "./assets/gto.png");
    // } else {
    img.setAttribute("src", filePath);
  }
}
