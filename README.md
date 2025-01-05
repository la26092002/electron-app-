# electron-app-

Error :  https://github.com/electron/forge/issues/3640

Solution : export NODE_OPTIONS=--disable-warning=DEP0174


$ npm run rebuild

> my-electron-app@1.0.0 rebuild
> electron-rebuild

✔ Rebuild Complete

MIC_SID@DESKTOP-DTJRBNP MINGW64 /c/larbi/devlopement/electron/ElectronReactSystemManagement/Electron (main)
$ npm run package

> my-electron-app@1.0.0 package
> electron-forge package

✔ Checking your system
✔ Preparing to package application
✔ Running packaging hooks
  ✔ Running generateAssets hook
  ✔ Running prePackage hook
✔ Packaging application
  ✔ Packaging for x64 on win32 [3m25s]
✔ Running postPackage hook

MIC_SID@DESKTOP-DTJRBNP MINGW64 /c/larbi/devlopement/electron/ElectronReactSystemManagement/Electron (main)
$ npm run make

> my-electron-app@1.0.0 make
> electron-forge make

✔ Checking your system
✔ Loading configuration
✔ Resolving make targets
  › Making for the following targets:
✔ Running package command
  ✔ Preparing to package application
  ✔ Running packaging hooks
    ✔ Running generateAssets hook
    ✔ Running prePackage hook
  ✔ Packaging application
    ✔ Packaging for x64 on win32 [3m51s]
  ✔ Running postPackage hook
✔ Running preMake hook
✔ Making distributables
  ✔ Making a squirrel distributable for win32/x64 [3m13s]
✔ Running postMake hook
  › Artifacts available at: C:\larbi\devlopement\electron\ElectronReactSystemManagement\Electron\out\make)}