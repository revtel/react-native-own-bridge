# react-native-own-bridge

The missing CLI tool to generate `project specific` native bridges with a single command.

**Contributions are welcomed!**

## Why Do You Need This Tool?

Because scaffolding new native bridges is a **TEDIOUS** and **ERROR-PRONE** task!

* You might forget to add a `;` in Obj-C or Java
* You might forget to `import` in Obj-C or Java
* You might need to refer to official doc and then jump back to your editor back and force, then makes some typo...
* You might need to switch between your JS code editor and XCode / Android Studio back and forth, then again makes more typo...

And we already have some good tools targeting on **CREATING A NEW RN BRIDGE LIBRARY**, such as:

* react-native-create-library (https://github.com/frostney/react-native-create-library)
* react-native-create-bridge (https://github.com/peggyrayzis/react-native-create-bridge)

But..., what if you need to write your **OWN PRIVATE NATIVE CODES**? For cases such as: 

* Integrating existing native logic
* Multi-threading stuff
* Performance optimization
* Simply not ready / no plan to publish your native stuff as a new open-source library

Anyway, if you're planning to write some native code, we hope this tool can help you!

## Supported Platforms

Target platforms
- Android 
- iOS 

Host platforms (the machine running this CLI)
- Mac
- Linux

## Install
```shell
npm i --g react-native-own-bridge
# you might need to add `sudo` for certain platform
```

## Usage

Once installed, in your react-native project root folder:

```shell
react-native-own-bridge -n MyAwesomeModule
```

We'll create following files into corresponding directories for you:
- MyAwesomeModule.js
- (ios) MyAwesomeModule.h
- (ios) MyAwesomeModule.m
- (android) MyAwesomeModule.java
- (android) MyAwesomeModulePackage.java

Not only that, we also take care of integrating this new added stuff into your existing code.
- (ios) AppDelegate.m will be modified to include your new native module
- (android) MainApplication.java will be modified to include your new native module

You can also see other detail options via `react-native-own-bridge --help`
