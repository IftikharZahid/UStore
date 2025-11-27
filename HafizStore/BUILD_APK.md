# HafizStore - Build APK Quick Start

## 🚀 Fastest Way to Build APK (Recommended)

### Option 1: EAS Build (Cloud - No Android Studio Needed)

```powershell
# 1. Install EAS CLI globally
npm install -g eas-cli

# 2. Login to your Expo account (create free account at expo.dev if needed)
eas login

# 3. Build APK (this will upload and build in the cloud)
eas build -p android --profile preview

# Wait 5-10 minutes, then download your APK from the provided URL!
```

### Option 2: Quick Local Build (Requires Android Studio)

```powershell
# 1. Generate Android project
npx expo prebuild --platform android

# 2. Build APK
cd android
./gradlew assembleRelease

# Your APK will be at: android/app/build/outputs/apk/release/app-release.apk
```

## 📱 Installing on Your Phone

1. Transfer the APK to your phone
2. Enable "Install from Unknown Sources" in Settings
3. Tap the APK file to install
4. Open HafizStore app!

## ⚠️ Important Notes

- **First time?** Use EAS Build (Option 1) - it's easier!
- **Urdu fonts:** Make sure you added the font files to `assets/fonts/` before building
- **Testing:** Test the APK on your phone before distributing

## 🔧 Troubleshooting

### Build Failed?

- Make sure you're logged into Expo: `eas whoami`
- Check all dependencies are installed: `npm install`
- Clear cache: `npx expo start -c`

### Can't Install APK?

- Enable "Unknown Sources" in Android Settings → Security
- Check Android version is 5.0+ (API 21+)

## 📦 What's Been Configured

✅ Package name: `com.hafizstore.app`
✅ Version: 1.0.0
✅ App icon: Utility Stores logo
✅ Permissions: Internet, Network State
✅ EAS Build profiles: development, preview, production

## 🎯 Next Steps

After building your APK:

1. Install on your device
2. Test all features (login, navigation, Urdu text)
3. Share with friends/testers
4. Collect feedback
5. Build new versions as needed

---

Need the detailed guide? Check `build_apk_guide.md`
