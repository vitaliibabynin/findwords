#import "AppodealPlugin.h"
#import <UIKit/UIKit.h>
#import <Appodeal/Appodeal.h>

////////////////////////////////////
/// utils for native sdk types /////
////////////////////////////////////

const int INTERSTITIAL  = 1;
const int VIDEO         = 2;
const int BANNER        = 4;
const int BANNER_BOTTOM = 8;
const int BANNER_TOP    = 16;
const int BANNER_CENTER = 32;
const int ALL           = 255;
const int ANY           = 255;
const int REWARDED_VIDEO= 128;

int nativeAdTypesForType(int adTypes) {
    int nativeAdTypes = 0;

    if ((adTypes & INTERSTITIAL) > 0) {
        nativeAdTypes |= AppodealAdTypeInterstitial;
    }

    if ((adTypes & VIDEO) > 0) {
        nativeAdTypes |= AppodealAdTypeVideo;
    }

    if ((adTypes & BANNER) > 0 ||
        (adTypes & BANNER_TOP) > 0 ||
        (adTypes & BANNER_CENTER) > 0 ||
        (adTypes & BANNER_BOTTOM) > 0) {

        nativeAdTypes |= AppodealAdTypeBanner;
    }

    if ((adTypes & REWARDED_VIDEO) > 0) {
      nativeAdTypes |= AppodealAdTypeRewardedVideo;
    }

    return nativeAdTypes;
}

int nativeShowStyleForType(int adTypes) {
    bool isInterstitial = (adTypes & INTERSTITIAL) > 0;
    bool isVideo = (adTypes & VIDEO) > 0;

    if (isInterstitial && isVideo) {
        return AppodealShowStyleVideoOrInterstitial;
    } else if (isVideo) {
        return AppodealShowStyleVideo;
    } else if (isInterstitial) {
        return AppodealShowStyleInterstitial;
    }

    if ((adTypes & BANNER_TOP) > 0) {
        return AppodealShowStyleBannerTop;
    }

    if ((adTypes & BANNER_CENTER) > 0) {
        return AppodealShowStyleBannerCenter;
    }

    if ((adTypes & BANNER_BOTTOM) > 0) {
        return AppodealShowStyleBannerBottom;
    }

    if ((adTypes & REWARDED_VIDEO) > 0) {
      return AppodealShowStyleRewardedVideo;
    }

    return 0;
}

////////////////////////////////////
/// implementation /////////////////
////////////////////////////////////

@interface AppodealPlugin () <AppodealInterstitialDelegate, AppodealBannerDelegate, AppodealVideoDelegate, AppodealRewardedVideoDelegate>
@end

@implementation AppodealPlugin

- (void) initialize:(CDVInvokedUrlCommand*)command
{
  CDVPluginResult* pluginResult = nil;
  pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"initialized"];

  NSString* appKey = [[command arguments] objectAtIndex:0];
  [Appodeal initializeWithApiKey:appKey];

  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) initializeAdType:(CDVInvokedUrlCommand*)command
{
  CDVPluginResult* pluginResult = nil;
  pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"ok"];

  NSString* appKey = [[command arguments] objectAtIndex:0];
  id adType = [[command arguments] objectAtIndex:1];
  [Appodeal initializeWithApiKey:appKey types:nativeAdTypesForType([adType integerValue])];

  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

/// callbacks

// banner

- (void)bannerDidLoadAd
{
  [self.webViewEngine evaluateJavaScript:@"cordova.fireDocumentEvent('onBannerLoaded')" completionHandler:nil];
}

- (void)bannerDidFailToLoadAd
{
  [self.webViewEngine evaluateJavaScript:@"cordova.fireDocumentEvent('onBannerFailedToLoad')" completionHandler:nil];
}

- (void)bannerDidClick
{
  [self.webViewEngine evaluateJavaScript:@"cordova.fireDocumentEvent('onBannerClicked')" completionHandler:nil];
}

// interstitial

- (void)interstitialDidLoadAd
{
  [self.webViewEngine evaluateJavaScript:@"cordova.fireDocumentEvent('onInterstitialLoaded')" completionHandler:nil];
}

- (void)interstitialDidFailToLoadAd
{
  [self.webViewEngine evaluateJavaScript:@"cordova.fireDocumentEvent('onInterstitialFailedToLoad')" completionHandler:nil];
}

- (void)interstitialWillPresent
{
  [self.webViewEngine evaluateJavaScript:@"cordova.fireDocumentEvent('onInterstitialShown')" completionHandler:nil];
}

- (void)interstitialDidDismiss
{
  [self.webViewEngine evaluateJavaScript:@"cordova.fireDocumentEvent('onInterstitialClosed')" completionHandler:nil];
}

- (void)interstitialDidClick
{
  [self.webViewEngine evaluateJavaScript:@"cordova.fireDocumentEvent('onInterstitialClicked')" completionHandler:nil];
}

// video

- (void)videoDidLoadAd
{
  [self.webViewEngine evaluateJavaScript:@"cordova.fireDocumentEvent('onVideoLoaded')" completionHandler:nil];
}

- (void)videoDidFailToLoadAd
{
  [self.webViewEngine evaluateJavaScript:@"cordova.fireDocumentEvent('onVideoFailedToLoad')" completionHandler:nil];
}

- (void)videoDidPresent
{
  [self.webViewEngine evaluateJavaScript:@"cordova.fireDocumentEvent('onVideoShown')" completionHandler:nil];
}

- (void)videoWillDismiss
{
  [self.webViewEngine evaluateJavaScript:@"cordova.fireDocumentEvent('onVideoClosed')" completionHandler:nil];
}

- (void)videoDidFinish
{
  [self.webViewEngine evaluateJavaScript:@"cordova.fireDocumentEvent('onVideoFinished')" completionHandler:nil];
}

/// rewarded video

- (void)rewardedVideoDidLoadAd
{
  [self.webViewEngine evaluateJavaScript:@"cordova.fireDocumentEvent('onRewardedVideoDidLoadAd')" completionHandler:nil];
}

- (void)rewardedVideoDidFailToLoadAd
{
  [self.webViewEngine evaluateJavaScript:@"cordova.fireDocumentEvent('onRewardedVideoDidFailToLoadAd')" completionHandler:nil];
}

- (void)rewardedVideoWillDismiss
{
  [self.webViewEngine evaluateJavaScript:@"cordova.fireDocumentEvent('onRewardedVideoWillDismiss')" completionHandler:nil];
}

- (void)rewardedVideoDidPresent
{
  [self.webViewEngine evaluateJavaScript:@"cordova.fireDocumentEvent('onRewardedVideoDidPresent')" completionHandler:nil];
}

- (void)rewardedVideoDidFinish:(NSUInteger)rewardAmount name:(NSString *)rewardName
{
  NSString* script = [NSString stringWithFormat:@"cordova.fireDocumentEvent('onRewardedVideoDidFinish', { amount: %d, name: '%@' })", rewardAmount, rewardName];
  [self.webViewEngine evaluateJavaScript:script completionHandler:nil];
}
///

- (void) enableIntertitialCallbacks:(CDVInvokedUrlCommand*)command
{
  [Appodeal setInterstitialDelegate:self];
}

- (void) enableVideoCallbacks:(CDVInvokedUrlCommand*)command
{
  [Appodeal setVideoDelegate:self];
}

- (void) enableBannerCallbacks:(CDVInvokedUrlCommand*)command
{
  [Appodeal setBannerDelegate:self];
}

- (void) enableRewardedVideoCallbacks:(CDVInvokedUrlCommand*)command
{
  [Appodeal setRewardedVideoDelegate:self];
}

///

- (void) isLoaded:(CDVInvokedUrlCommand*)command
{
    id adType = [[command arguments] objectAtIndex:0];
    int isAdReady = [Appodeal isReadyForShowWithStyle:nativeShowStyleForType([adType integerValue])] ? 1 : 0;
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:isAdReady];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) isPrecache:(CDVInvokedUrlCommand*)command
{

}

- (void) show:(CDVInvokedUrlCommand*)command
{
  CDVPluginResult* pluginResult = nil;
  pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"ok"];

  id adType = [[command arguments] objectAtIndex:0];
  [Appodeal showAd:nativeShowStyleForType([adType integerValue]) rootViewController:self.viewController];

  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) hide:(CDVInvokedUrlCommand*)command
{
  CDVPluginResult* pluginResult = nil;
  pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"ok"];

  id adType = [[command arguments] objectAtIndex:0];
  if((nativeAdTypesForType([adType integerValue]) & (1 << 2)) > 0)
  {
    [Appodeal hideBanner];
  }

  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) showWithPriceFloor:(CDVInvokedUrlCommand*)command
{
  // copy from show
  CDVPluginResult* pluginResult = nil;
  pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"ok"];

  id adType = [[command arguments] objectAtIndex:0];
  [Appodeal showAd:nativeShowStyleForType([adType integerValue]) rootViewController:self.viewController];

  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) setAutoCache:(CDVInvokedUrlCommand*)command
{
  id adType = [[command arguments] objectAtIndex:0];
  id autoCache = [[command arguments] objectAtIndex:1];
  // nothing
  [Appodeal setAutocache:[autoCache boolValue] types:nativeAdTypesForType([adType integerValue])];

}

- (void) cacheBanner:(CDVInvokedUrlCommand*)command
{
}

- (void) setOnLoadedTriggerBoth:(CDVInvokedUrlCommand*)command
{
  // nothing
}

- (void) disableNetwork:(CDVInvokedUrlCommand*)command
{
  NSString* network = [[command arguments] objectAtIndex:0];
  [Appodeal disableNetworkForAdType:AppodealAdTypeAll name:network];
}

- (void) disableLocationCheck:(CDVInvokedUrlCommand*)command
{
  [Appodeal disableLocationPermissionCheck];
}

@end
