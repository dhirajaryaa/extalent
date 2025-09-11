import pdf from "pdf-parse";
import fs from "node:fs/promises";

const parseResume = async (fileLocalPath) => {
  if (!fileLocalPath) return;
  const bufferPdf = await fs.readFile(fileLocalPath);
  const data = await pdf(bufferPdf);
  // remove after completed parser 
  await fs.unlink(fileLocalPath);
  return data.text;
};
export default parseResume;