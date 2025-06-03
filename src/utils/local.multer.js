import multer from "multer";
import { nanoid } from "nanoid";

const uploadFileDisk = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      const fileName = `${nanoid()}-${file.originalname}`;
      cb(null, fileName);
    },
  });

  return multer({ dest: "temPath", storage });
};
export default uploadFileDisk;
