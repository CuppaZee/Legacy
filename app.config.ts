// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
var config = require('./private.config.js');

module.exports = {
  expo: {
    name: "CuppaZee",
    owner: "sohcah",
    slug: "PaperZee",
    privacy: "public",
    platforms: [
      "ios",
      "android",
      "web"
    ],
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization: "sohcah",
            project: "cuppazee",
            authToken: config.sentry_token
          }
        }
      ]
    },
    githubUrl: "https://github.com/CuppaZee/CuppaZee",
    scheme: "cuppazee",
    version: "1.3.0",
    orientation: "default",
    icon: "./assets/CuppaZeeIcon.png",
    splash: {
      image: "./assets/CuppaZeeSplash.png",
      resizeMode: "contain",
      backgroundColor: "#00C35B"
    },
    updates: {
      fallbackToCacheTimeout: 30000
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      bundleIdentifier: "uk.cuppazee.paper",
      buildNumber: "1.3.0",
      icon: "./assets/CuppaZeeIcon.png",
      requireFullScreen: false,
      supportsTablet: true,
      infoPlist: {
        NSCameraUsageDescription: "CuppaZee uses the camera to scan Munzees.",
        NSLocationWhenInUseUsageDescription: "CuppaZee uses your location when in use for maps.",
        NSLocationAlwaysAndWhenInUseUsageDescription: "CuppaZee uses your location when in use for maps, and in the background for notifications.",
        NSLocationAlwaysUsageDescription: "CuppaZee uses your location when in use for maps, and in the background for notifications.",
        NSPhotoLibraryUsageDescription: "CuppaZee uses your camera role to save screenshots."
      },
      config: {
        googleMapsApiKey: "AIzaSyAT1J1Z5S02Avk9p4IqUKPtEYOV7gI8-PA"
      },
      associatedDomains: [
        "applinks:cuppazee.app"
      ]
    },
    android: {
      config: {
        googleMaps: {
          apiKey: "AIzaSyBDgPXi66fB9Yd4XyAhEnDaA0XrqdbvEDo"
        }
      },
      package: "uk.cuppazee.paper",
      versionCode: 9,
      icon: "./assets/CuppaZeeIcon.png",
      adaptiveIcon: {
        backgroundColor: "#00C35B",
        foregroundImage: "./assets/CuppaZeeAndroid.png"
      },
      permissions: [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION",
        "CAMERA",
        "VIBRATE",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ],
      intentFilters: [
        {
          action: "VIEW",
          data: {
            scheme: "https",
            host: "cuppazee.app"
          },
          category: [
            "BROWSABLE",
            "DEFAULT"
          ]
        }
      ]
    },
    notification: {
      icon: "./assets/CuppaZeeNotification.png",
      color: "#00C35B",
      iosDisplayInForeground: true,
      androidMode: "default",
      androidCollapsedTitle: "#{unread_notifications} Alerts"
    }
  }
}
