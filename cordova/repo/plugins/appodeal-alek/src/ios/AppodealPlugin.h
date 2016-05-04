#import <Cordova/CDV.h>

@interface AppodealPlugin : CDVPlugin

- (void) initialize:(CDVInvokedUrlCommand*)command;
- (void) initializeAdType:(CDVInvokedUrlCommand*)command;
- (void) enableIntertitialCallbacks:(CDVInvokedUrlCommand*)command;
- (void) enableVideoCallbacks:(CDVInvokedUrlCommand*)command;
- (void) enableBannerCallbacks:(CDVInvokedUrlCommand*)command;
- (void) isLoaded:(CDVInvokedUrlCommand*)command;
- (void) isPrecache:(CDVInvokedUrlCommand*)command;
- (void) show:(CDVInvokedUrlCommand*)command;
- (void) hide:(CDVInvokedUrlCommand*)command;
- (void) showWithPriceFloor:(CDVInvokedUrlCommand*)command;
- (void) setAutoCache:(CDVInvokedUrlCommand*)command;
- (void) cacheBanner:(CDVInvokedUrlCommand*)command;
- (void) setOnLoadedTriggerBoth:(CDVInvokedUrlCommand*)command;
- (void) disableNetwork:(CDVInvokedUrlCommand*)command;
- (void) disableLocationCheck:(CDVInvokedUrlCommand*)command;

@end
