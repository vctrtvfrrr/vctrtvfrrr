import * as cheerio from "cheerio";
import type Metalsmith from "metalsmith";
import fs from "node:fs";
import path from "node:path";
import slugify from "slugify";

type File = {
  contents: Buffer;
  path: string;
  collection: string[];
};

type AssociativeArray = {
  [key: string]: string;
};

const defaultOptions = {
  source: "assets",
  destination: "_images",
};

function formatDirectories(subDirectories: string, suffix: string) {
  const regex = new RegExp(`/${suffix}$`, "g");
  return subDirectories
    .replace(regex, "")
    .split("/")
    .map((s) => slugify(s).toLowerCase())
    .join("/");
}

function images(options: typeof defaultOptions = defaultOptions) {
  options = Object.assign({}, defaultOptions, options);

  return function images(
    files: { [key: string]: File },
    metalsmith: Metalsmith,
    done: Function
  ) {
    const debug = metalsmith.debug("helpers/images");
    const imagesFiles = metalsmith.match(
      `**/${options.source}/*`,
      Object.keys(files)
    );
    const changedFiles: AssociativeArray = {};

    imagesFiles.forEach((filePath: string) => {
      const data: File = files[filePath];

      const subDirectories = formatDirectories(
        path.dirname(filePath),
        options.source
      );
      const filename = path.basename(filePath);
      const extension = path.extname(filePath);
      const newFileName =
        slugify(path.basename(filePath, extension)) + extension;
      const newFilePath = `${subDirectories}/${newFileName}`;

      const source = metalsmith.path(metalsmith.source(), data.path);
      const destination = metalsmith.path(
        metalsmith.destination(),
        `${options.destination}/${newFilePath}`
      );

      debug.info('Copying file "%s" to directory "%s"', source, destination);

      try {
        fs.cpSync(source, destination);

        try {
          const success = delete files[filePath];
          if (success === false) throw new Error();
          debug.info('Copied asset file "%s"', filePath);
        } catch (_err) {
          debug.error('Failed to copy asset file at "%s"', filePath);
        }

        changedFiles[`${options.source}/${filename}`] = newFilePath;
      } catch (err) {
        debug.error(err);
        done("An error occured while copying the directory");
      }
    });

    metalsmith.match("**/*.html", Object.keys(files)).forEach((filePath) => {
      const contents = files[filePath].contents.toString();
      const $ = cheerio.load(contents);

      const imgs = $("img");
      if (imgs.length === 0) return;

      imgs.each((_, img) => {
        const src = $(img).attr("src");
        if (!src || !changedFiles[src]) return;
        $(img).attr("src", `/${options.destination}/${changedFiles[src]}`);
      });

      files[filePath].contents = Buffer.from($.html());
    });

    done();
  };
}

export default images;
