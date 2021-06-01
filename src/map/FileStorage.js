// Function to check if file exists, if it doesn't, create one
export const checkFile = (RNFS, path) => {
  RNFS.exists(path)
    .then((success) => {
      if (!success) {
        RNFS.writeFile(path, "", "utf8")
          .then((success) => {
            console.log("New file created: " + path);
            return true
          })
          .catch((err) => {
            console.error("checkFile [write]: " + err.message);
          });
      } else {
        console.log("File already exists: " + path);
        return false
      }
    })
    .catch((err) => {
      console.error("checkFile [exists]: " + err.message);
    });
};

// Function to copy a file from filePath location to exportPath location
export const exportFile = (RNFS, filePath, exportPath) => {
  checkFile(RNFS, filePath);

  RNFS.exists(exportPath)
    .then((success) => {
      RNFS.unlink(exportPath)
        .then((success) => {
          console.log("Duplicate export file deleted. ");
        })
        .catch((err) => {
          console.error("exportFile [unlink]: " + err.message);
        });
    })
    .catch((err) => {
      console.log("exportFile [exists]: " + err.message);
    });

  RNFS.writeFile(exportPath, "", "utf8")
    .then((success) => {
      console.log("New file created: " + exportPath);
      RNFS.copyFile(filePath, exportPath)
        .then((success) => {
          console.log("Exported file to: " + exportPath);
        })
        .catch((err) => {
          console.error("exportFile [copyFile]: " + err.message);
        });
    })
    .catch((err) => {
      console.error("exportFile [writeFile]: " + err.message);
    });
};

// Function to delete a file, then create a new empty one
export const clearFile = (RNFS, path) => {
  checkFile(RNFS, path);
  RNFS.unlink(path)
    .then((success) => {
      console.log("Deleted file: " + path);
    })
    .catch((err) => {
      console.error("clearFile [unlink]: " + err.message);
    });
  checkFile(RNFS, path);
};

export const deleteFile = (RNFS, path) => {
  checkFile(RNFS, path);
  RNFS.unlink(path)
    .then((success) => {
      console.log("Deleted file: " + path);
      return true
    })
    .catch((err) => {
      console.error("deleteFile [unlink]: " + err.message);
    });
};

// Function to appeand a file and add the location as a JSON object
export const recordLocation = (RNFS, path, latitude, longitude) => {
  checkFile(RNFS, path);
  const content =
    '{"timestamp":"' +
    new Date().getTime() +
    '","latitude":"' +
    latitude +
    '","longitude":"' +
    longitude +
    '"}, ';
  RNFS.appendFile(path, content, "utf8")
    .then((success) => {
      console.log("Location recorded locally. ");
    })
    .catch((err) => {
      console.error("recordLocation: " + err.message);
    });
};

// Function to read a file to get a JSON object back for home location
export const getHomeLocation = (RNFS, path) => {
  checkFile(RNFS, path);

  var homeLocation = {
    latitude: -36.85088,
    longitude: 174.7645,
  };

  RNFS.readFile(path)
    .then((result) => {
      console.info("Read file: ", result);
      if (result == null || result == "") {
        homeLocation.latitude = -36.85088;
        homeLocation.longitude = 174.7645;
      } else {
        try {
          result = result.split(", ")[0];
          result = JSON.parse(result);
          homeLocation.latitude = parseFloat(result.latitude);
          homeLocation.longitude = parseFloat(result.longitude);
        } catch (err) {
          console.error("getHomeLocation [parse]: " + err);
        }
      }
    })
    .catch((err) => {
      console.error("printFileConsole: " + err.message);
    });

  return homeLocation;
};

// Function for debugging, reads and prints the file's contents in the console.
export const printFileConsole = (RNFS, path) => {
  checkFile(RNFS, path);
  RNFS.readFile(path)
    .then((result) => {
      console.info("Read file: ", result);
    })
    .catch((err) => {
      console.error("printFileConsole: " + err.message);
    });
};
