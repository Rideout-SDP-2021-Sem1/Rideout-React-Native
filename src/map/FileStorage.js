export const checkFile = (RNFS, path) => {
  RNFS.exists(path)
    .then((success) => {
      if (!success) {
        RNFS.writeFile(path, "", "utf8")
          .then((success) => {
            console.log("New file created: " + path);
          })
          .catch((err) => {
            console.error("checkFile [write]: " + err.message);
          });
      } else {
        console.log("File already exists: " + path);
      }
    })
    .catch((err) => {
      console.error("checkFile [exists]: " + err.message);
    });
};

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

export const getHomeLocation = (RNFS, path) => {
  checkFile(RNFS, path);

  var homeLocation = {
    latitude: 0,
    longitude: 0,
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
