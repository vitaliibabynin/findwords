//Copyright (c) 2014 Sang Ki Kwon (Cranberrygame)
//Email: cranberrygame@yahoo.com
//Homepage: http://cranberrygame.github.io
//License: MIT (http://opensource.org/licenses/MIT)
#import "Vungle.h"
#import <CommonCrypto/CommonDigest.h> //md5

@implementation Vungle

@synthesize callbackIdKeepCallback;
//
@synthesize email;
@synthesize licenseKey_;
@synthesize validLicenseKey;
static NSString *TEST_APP_ID = @"5556444b4b79673719000185";
//
@synthesize appId;

- (void) pluginInitialize {
    [super pluginInitialize];    
    //
}

- (void) setLicenseKey: (CDVInvokedUrlCommand*)command {
    NSString *email = [command.arguments objectAtIndex: 0];
    NSString *licenseKey = [command.arguments objectAtIndex: 1];
    NSLog(@"%@", email);
    NSLog(@"%@", licenseKey);
    
    [self.commandDelegate runInBackground:^{
        [self _setLicenseKey:email aLicenseKey:licenseKey];
    }];
}

- (void) setUp: (CDVInvokedUrlCommand*)command {
    //self.viewController
    //self.webView
    //NSString *adUnitBanner = [command.arguments objectAtIndex: 0];
    //NSString *adUnitFullScreen = [command.arguments objectAtIndex: 1];
    //BOOL isOverlap = [[command.arguments objectAtIndex: 2] boolValue];
    //BOOL isTest = [[command.arguments objectAtIndex: 3] boolValue];
	//NSArray *zoneIds = [command.arguments objectAtIndex:4];	
    //NSLog(@"%@", adUnitBanner);
    //NSLog(@"%@", adUnitFullScreen);
    //NSLog(@"%d", isOverlap);
    //NSLog(@"%d", isTest);
	NSString* appId = [command.arguments objectAtIndex:0];
	NSLog(@"%@", appId);
	
    self.callbackIdKeepCallback = command.callbackId;
	
    //[self.commandDelegate runInBackground:^{
		[self _setUp:appId];	
    //}];
}

- (void) showRewardedVideoAd: (CDVInvokedUrlCommand*)command {

    //[self.commandDelegate runInBackground:^{
		[self _showRewardedVideoAd];
    //}];
}

- (void) _setLicenseKey:(NSString *)email aLicenseKey:(NSString *)licenseKey {
	self.email = email;
	self.licenseKey_ = licenseKey;
	
	//
	NSString *str1 = [self md5:[NSString stringWithFormat:@"cordova-plugin-: %@", email]];
	NSString *str2 = [self md5:[NSString stringWithFormat:@"cordova-plugin-ad-vungle: %@", email]];
	NSString *str3 = [self md5:[NSString stringWithFormat:@"com.cranberrygame.cordova.plugin.: %@", email]];
	NSString *str4 = [self md5:[NSString stringWithFormat:@"com.cranberrygame.cordova.plugin.ad.vungle: %@", email]];
	NSString *str5 = [self md5:[NSString stringWithFormat:@"com.cranberrygame.cordova.plugin.ad.video.vungle: %@", email]];
	if(licenseKey_ != Nil && ([licenseKey_ isEqualToString:str1] || [licenseKey_ isEqualToString:str2] || [licenseKey_ isEqualToString:str3] || [licenseKey_ isEqualToString:str4] || [licenseKey_ isEqualToString:str5])){
		self.validLicenseKey = YES;
		NSArray *excludedLicenseKeys = [NSArray arrayWithObjects: @"xxx", nil];
		for (int i = 0 ; i < [excludedLicenseKeys count] ; i++) {
			if([[excludedLicenseKeys objectAtIndex:i] isEqualToString:licenseKey]) {
				self.validLicenseKey = NO;
				break;
			}
		}
	}
	else {
		self.validLicenseKey = NO;
	}
	if (self.validLicenseKey)
		NSLog(@"valid licenseKey");
	else {
		NSLog(@"invalid licenseKey");
		//UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Alert" message:@"Cordova Vungle: invalid email / license key. You can get free license key from https://play.google.com/store/apps/details?id=com.cranberrygame.pluginsforcordova" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
		//[alert show];
	}
}

- (NSString*) md5:(NSString*) input {
    const char *cStr = [input UTF8String];
    unsigned char digest[16];
    CC_MD5( cStr, strlen(cStr), digest ); // This is the md5 call
    
    NSMutableString *output = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH * 2];
    
    for(int i = 0; i < CC_MD5_DIGEST_LENGTH; i++)
        [output appendFormat:@"%02x", digest[i]];
    
    return  output;
}

- (void) _setUp:(NSString *)appId {
	self.appId = appId;

	if (!validLicenseKey) {
		if (arc4random() % 100 <= 1) {//0 ~ 99		
			self.appId = TEST_APP_ID;
		}
	}
	
    VungleSDK* sdk = [VungleSDK sharedSDK];
    [sdk setDelegate:self];//listener need to come before startWithAppId on ios vunlge sdk
    [sdk startWithAppId:appId];
}

-(void) _showRewardedVideoAd {
    NSMutableDictionary* config = [[NSMutableDictionary alloc] init];
	//[config setObject:[config objectForKey:@"orientation"] forKey:VunglePlayAdOptionKeyOrientations]; // !! Be careful, not the same behaviour with android
    //NSDictionary* config = @{VunglePlayAdOptionKeyOrientations: @(UIInterfaceOrientationMaskLandscape),
	//	VunglePlayAdOptionKeyIncentivized: @(YES),
	//	VunglePlayAdOptionKeyUser: @"user",
	//	VunglePlayAdOptionKeyExtraInfoDictionary: @{VunglePlayAdOptionKeyExtra1: @"21", VunglePlayAdOptionKeyExtra2: @"Female"}};
    [[VungleSDK sharedSDK] playAd:self.viewController withOptions:config];
    //NSError *error;
	//[[VungleSDK sharedSDK] playAd:self.viewController error:&error];
    //if (error) {
    //    NSLog(@"Error encountered playing ad: %@", error);
    //}
}

/**
 * If implemented, this will get called when ad ad has cached. It's now ready to play!
*/
- (void)vungleSDKhasCachedAdAvailable
{
    NSLog(@"%@", @"vungleSDKhasCachedAdAvailable");
	
    CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"onRewardedVideoAdLoaded"];
	[pr setKeepCallbackAsBool:YES];
	[self.commandDelegate sendPluginResult:pr callbackId:self.callbackIdKeepCallback];
    //CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
	//[pr setKeepCallbackAsBool:YES];
	//[self.commandDelegate sendPluginResult:pr callbackId:self.callbackIdKeepCallback];	
}

/**
 * If implemented, this will get called when the SDK is about to show an ad. This point
 * might be a good time to pause your game, and turn off any sound you might be playing.
*/
- (void)vungleSDKwillShowAd
{
    NSLog(@"%@", @"vungleSDKwillShowAd");
    
    CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"onRewardedVideoAdShown"];
	[pr setKeepCallbackAsBool:YES];
	[self.commandDelegate sendPluginResult:pr callbackId:self.callbackIdKeepCallback];
    //CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
	//[pr setKeepCallbackAsBool:YES];
	//[self.commandDelegate sendPluginResult:pr callbackId:self.callbackIdKeepCallback];
}

/**
 * If implemented, this will get called when the product sheet is about to be closed.
 * It will only be called if the product sheet was shown.
 */
- (void)vungleSDKwillCloseProductSheet:(id)productSheet
{
    NSLog(@"%@", @"vungleSDKwillCloseProductSheet");
}

/**
 * If implemented, this will get called when the SDK closes the ad view, but that doesn't always mean
 * the ad experience is complete. There might be a product sheet that will be presented.
 * This point might be a good place to resume your game if there's no product sheet being presented.
 * If the product sheet will be shown, we recommend waiting for it to close before you resume,
 * show a reward confirmation to the user, etc. The viewInfo dictionary will contain the following keys:
 * - "completedView": NSNumber representing a BOOL whether or not the video can be considered a
 *                full view.
 * - "playTime": NSNumber representing the time in seconds that the user watched the video.
 * - "didDownlaod": NSNumber representing a BOOL whether or not the user clicked the download
 *                  button.
 */
- (void)vungleSDKwillCloseAdWithViewInfo:(NSDictionary*)viewInfo willPresentProductSheet:(BOOL)willPresentProductSheet
{
    BOOL isCompletedView = (BOOL)[viewInfo valueForKey:@"completedView"];
	
	if (isCompletedView) {
        NSLog(@"%@", @"vungleSDKwillCloseAdWithViewInfo: completed");

		CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"onRewardedVideoAdCompleted"];
		[pr setKeepCallbackAsBool:YES];
		[self.commandDelegate sendPluginResult:pr callbackId:self.callbackIdKeepCallback];
		//CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
		//[pr setKeepCallbackAsBool:YES];
		//[self.commandDelegate sendPluginResult:pr callbackId:self.callbackIdKeepCallback];			
	}
	else {
		NSLog(@"%@", @"vungleSDKwillCloseAdWithViewInfo: not completed");
/*	
		CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"onRewardedVideoAdNotCompleted"];
		[pr setKeepCallbackAsBool:YES];
		[self.commandDelegate sendPluginResult:pr callbackId:self.callbackIdKeepCallback];
		//CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
		//[pr setKeepCallbackAsBool:YES];
		//[self.commandDelegate sendPluginResult:pr callbackId:self.callbackIdKeepCallback];
*/		
	}
    
    CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"onRewardedVideoAdHidden"];
    [pr setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pr callbackId:self.callbackIdKeepCallback];
    //CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    //[pr setKeepCallbackAsBool:YES];
    //[self.commandDelegate sendPluginResult:pr callbackId:self.callbackIdKeepCallback];
}

 - (void)dealloc {
  [[VungleSDK sharedSDK] setDelegate:nil];
}

@end
