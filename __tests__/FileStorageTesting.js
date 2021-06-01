import RNFS from "react-native-fs";
import * as FS from "../src/map/FileStorage";
import { test } from "@testing-library/react-native";

const path = RNFS.DocumentDirectoryPath + "/testFile.txt";

test("Given a path doesn't exist, when it creates it, it should return true", () => {
    expect(FS.checkFile(RNFS, path)).toBe(true);

    // Delete file after test
    RNFS.unlink(path)
    .then((success) => {
      console.log("Deleted file: " + path);
    })
    .catch((err) => {
      console.error("test file [unlink]: " + err.message);
    });
});

test("Given a path does exist, when it finds it, it should return false", () => {
    // Create file for test
    RNFS.writeFile(path, "", "utf8")
    .then((success) => {
      console.log("New file created: " + path);
    })
    .catch((err) => {
      console.error("test file [write]: " + err.message);
    });

    expect(FS.checkFile(RNFS, path)).toBe(false);
});

test("Given a path, when it deletes it, it should return true", () => {
    // Create file for test
    RNFS.writeFile(path, "", "utf8")
    .then((success) => {
      console.log("New file created: " + path);
    })
    .catch((err) => {
      console.error("test file [write]: " + err.message);
    });
    expect(FS.deleteFile(RNFS, path)).toBe(false);
});