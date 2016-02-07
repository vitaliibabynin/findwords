#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>
#import <math.h>
#import "CordovaFacebook.h"

#import <FBSDKShareKit/FBSDKShareKit.h>
#import <objc/runtime.h>

@interface CDVFacebook ()

@property (strong, nonatomic) NSString* dialogCallbackId;
- (NSDictionary *)responseObject;
- (NSDictionary*)parseURLParams:(NSString *)query;
- (BOOL)isPublishPermission:(NSString*)permission;
- (BOOL)areAllPermissionsReadPermissions:(NSArray*)permissions;
@end

@implementation CDVFacebook

# pragma mark CDVPlugin

- (void) pluginInitialize
{
    id FacebookAppId = [self.commandDelegate.settings objectForKey:[@"FacebookAppID" lowercaseString]];
    
    if (FacebookAppId != nil) {
        self.fbAppId = (NSString*) FacebookAppId;
    }
    
    NSNotificationCenter* defaultCenter = [NSNotificationCenter defaultCenter];
    
    [defaultCenter addObserver:self selector:@selector(onAppDidBecomeActive:) name:UIApplicationDidBecomeActiveNotification object:nil];
    [defaultCenter addObserver:self selector:@selector(onAppDidFinishLaunching:) name:UIApplicationDidFinishLaunchingNotification object:nil];
    [defaultCenter addObserver:self selector:@selector(onHandleOpenURL:) name:CDVPluginHandleOpenURLNotification object:nil];

    [FBSDKProfile enableUpdatesOnAccessTokenChange:YES];

    self.fbLogin = [[FBSDKLoginManager alloc] init];
    self.fbLogin.loginBehavior = FBSDKLoginBehaviorSystemAccount;
}

+ (NSDictionary*) arrayAsDictionary:(NSArray*) array
{
    const NSString* VALUE = @"value";
    
    if(array == nil || [array count] == 0) {
        return nil;
    }
    
    NSMutableDictionary* dict = [NSMutableDictionary dictionaryWithCapacity: [array count]];

    NSDictionary* anObject;

    for (NSUInteger i = 0, l = [array count]; i < l; ++i) {
        anObject = [array objectAtIndex: i];
        if(anObject != nil) {
            NSString *key = [anObject objectForKey: @"key"];
            NSString *type = [anObject objectForKey: @"type"];
            
            if([type isEqualToString:@"double"]) {
                double d = [(NSNumber*)[anObject objectForKey:VALUE] doubleValue];
                if(d == d) {
                    [dict setObject:[NSNumber numberWithDouble: d] forKey: key];
                }
            } else if([type isEqualToString:@"integer"]) {
                int i = [(NSNumber*)[anObject objectForKey:VALUE] intValue];
                [dict setObject:[NSNumber numberWithInt: i] forKey: key];
            } else if([type isEqualToString:@"string"]) {
                NSString* str = (NSString*)[anObject objectForKey:VALUE];
                if(str != nil) {
                    [dict setObject:str forKey: key];
                }
            } else if([type isEqualToString:@"boolean"]) {
                bool b = [(NSNumber*)[anObject objectForKey:VALUE] boolValue];
                [dict setObject:[NSNumber numberWithBool: b] forKey: key];
            }
        }
    }
    
    return dict;
}

- (void) event: (CDVInvokedUrlCommand*) command
{
    NSArray* args = command.arguments;
    
    CDVPluginResult* pluginResult = nil;
    NSString* errorMessage = nil;
    NSString* eventName = nil;
    NSNumber* valueToSum = nil;
    double valueAsDouble;
    NSArray* properties = nil;
    NSDictionary* propertyDict = nil;
    
    if ([args count] > 0) {
        eventName = [args objectAtIndex: 0];
    }
    
    if (eventName == nil) {
        errorMessage = @"Must have an event name";
    } else {
        
        if([args count] > 1) {
            valueToSum = [args objectAtIndex: 1];
            if(valueToSum != nil) {
                valueAsDouble = [valueToSum doubleValue];
            }
        }
        
        if([args count] > 2) {
            properties = [args objectAtIndex: 2];
        }
        
        propertyDict = [CDVFacebook arrayAsDictionary:properties];
        
        if(propertyDict != nil && valueToSum != nil) {
            [FBSDKAppEvents logEvent: eventName valueToSum: valueAsDouble parameters: propertyDict];
        } else if(propertyDict != nil) {
            [FBSDKAppEvents logEvent: eventName parameters: propertyDict];
        } else if(valueToSum != nil) {
            [FBSDKAppEvents logEvent: eventName valueToSum: valueAsDouble];
        } else {
            [FBSDKAppEvents logEvent: eventName];
        }
        
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    
    if(errorMessage != nil && pluginResult == nil) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:errorMessage];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) purchase: (CDVInvokedUrlCommand*) command
{
    NSArray* args = command.arguments;
    
    CDVPluginResult* pluginResult = nil;
    NSString* errorMessage = nil;
    
    NSString* currency = nil;
    NSString* amount = nil;
    double amountAsDouble;
    
    NSArray* properties = nil;
    NSDictionary* propertyDict = nil;

    if([args count] < 2) {
        errorMessage = @"Not enough arguments: purchase needs at least an amount and a currency";
    } else {
        amount = [args objectAtIndex: 0];
        if(amount != nil) {
            amountAsDouble = [amount doubleValue];
        }
        
        currency = [args objectAtIndex: 1];
        
        if([args count] > 2) {
            properties = [args objectAtIndex: 2];
        }
        
        propertyDict = [CDVFacebook arrayAsDictionary:properties];
        
        if(propertyDict != nil && currency != nil && amount != nil) {
            [FBSDKAppEvents logPurchase: amountAsDouble currency: currency parameters: propertyDict];
        } else if(propertyDict == nil && currency != nil && amount != nil) {
            [FBSDKAppEvents logPurchase: amountAsDouble currency: currency];
        } else {
            errorMessage = @"Could not parse currency or amount!";
        }
        
        if(errorMessage == nil) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        }
    }
    
    if(errorMessage != nil && pluginResult == nil) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:errorMessage];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) init: (CDVInvokedUrlCommand*) command {
    FBSDKAccessToken* accessToken = [FBSDKAccessToken currentAccessToken];
    
    NSMutableDictionary* cdvResult = nil;
    
    if (accessToken) {
        cdvResult = [NSMutableDictionary dictionaryWithCapacity:10];
        [cdvResult setObject:[accessToken tokenString] forKey:@"accessToken"];
        [cdvResult setObject:[accessToken userID] forKey:@"userID"];
        
        long long timestamp = (long long)[[accessToken expirationDate] timeIntervalSince1970]*1000.0;
        [cdvResult setObject:[[NSNumber numberWithLongLong:timestamp] stringValue]forKey:@"expirationDate"];
    }
    
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:cdvResult] callbackId:command.callbackId];
}

- (void) login: (CDVInvokedUrlCommand*) command {
    NSArray* args = command.arguments;

    NSArray* permissions = nil;
    NSMutableDictionary* cdvResult = [NSMutableDictionary dictionaryWithCapacity:10];
    NSNumber *yes = [NSNumber numberWithBool: YES];
    NSNumber *no = [NSNumber numberWithBool: NO];
    
    if([args count] > 0) {
        permissions = [args objectAtIndex: 0];
    }
    if (permissions == nil) {
        permissions = @[];
    };
    [self.fbLogin logInWithReadPermissions:permissions handler:^(FBSDKLoginManagerLoginResult *result, NSError *error) {
        CDVCommandStatus status;
        FBSDKAccessToken* accessToken = [FBSDKAccessToken currentAccessToken];

        if (error) {
            // Process error
            status = CDVCommandStatus_ERROR;
            [cdvResult setObject:yes forKey:@"error"];
            [cdvResult setObject:no forKey:@"success"];
            [cdvResult setObject:no forKey:@"cancelled"];
            [cdvResult setObject:[NSNumber numberWithLong:[error code]] forKey:@"errorCode"];
            [cdvResult setObject:[error localizedDescription] forKey:@"errorLocalized"];
        } else if (result.isCancelled) {
            // Handle cancellations
            status = CDVCommandStatus_ERROR;
            [cdvResult setObject:yes forKey:@"error"];
            [cdvResult setObject:no forKey:@"success"];
            [cdvResult setObject:yes forKey:@"cancelled"];
        } else {
            status = CDVCommandStatus_OK;
            [cdvResult setObject:no forKey:@"error"];
            [cdvResult setObject:yes forKey:@"success"];
            [cdvResult setObject:no forKey:@"cancelled"];
            [cdvResult setObject:[result.grantedPermissions allObjects] forKey:@"granted"];
            [cdvResult setObject:[result.declinedPermissions allObjects] forKey:@"declined"];
        }

        if (accessToken) {
            [cdvResult setObject:[accessToken tokenString] forKey:@"accessToken"];
            [cdvResult setObject:[accessToken userID] forKey:@"userID"];
            
            long long timestamp = (long long)[[accessToken expirationDate] timeIntervalSince1970]*1000.0;
            [cdvResult setObject:[[NSNumber numberWithLongLong:timestamp] stringValue]forKey:@"expirationDate"];
        }


        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:status messageAsDictionary:cdvResult] callbackId:command.callbackId];
    }];
}

- (void) logout: (CDVInvokedUrlCommand*) command {
    [self.fbLogin logOut];

    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void) profile: (CDVInvokedUrlCommand*) command {
    NSMutableDictionary *cdvResult = [NSMutableDictionary dictionary];

    FBSDKProfile *profile = [FBSDKProfile currentProfile];

    if(profile) {
        NSDateFormatter *fmt = [[NSDateFormatter alloc] init];
        fmt.dateFormat = @"yyyy-MM-ddThh:mm:ssZ";

        [cdvResult setObject:profile.firstName forKey:@"firstName"];
        [cdvResult setObject:profile.middleName forKey:@"middleName"];
        [cdvResult setObject:profile.lastName forKey:@"lastName"];
        [cdvResult setObject:profile.name forKey:@"name"];
        [cdvResult setObject:profile.userID forKey:@"userID"];
        [cdvResult setObject:[fmt stringFromDate:profile.refreshDate] forKey:@"refreshDate"];
        [cdvResult setObject:[profile.linkURL absoluteString] forKey:@"linkURL"];

        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:cdvResult] callbackId:command.callbackId];
    } else {
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR] callbackId:command.callbackId];
    }

}


- (void) share: (CDVInvokedUrlCommand*) command {
    NSArray* args = command.arguments;
    
    if([args count] <= 0) {
        return [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Cannot make Graph Request without a Path"] callbackId:command.callbackId];
    }
    
    
    [self.commandDelegate runInBackground:^{
        
        
        FBSDKShareLinkContent *content = [[FBSDKShareLinkContent alloc] init];
        content.contentURL = [NSURL URLWithString:[args objectAtIndex: 0]];
        if([args count] > 1){
            content.contentTitle = [args objectAtIndex: 1];
        }
        if([args count] > 2){
            content.contentDescription = [args objectAtIndex: 2];
        }
        
        self.dialogCallbackId = command.callbackId;
        
        [FBSDKShareDialog showFromViewController:self.viewController
                                     withContent:content
                                        delegate:self];
        
        
        
        //        FBSDKShareDialog *shareDialog = [FBSDKShareDialog new];
        //        [shareDialog setMode:FBSDKShareDialogModeAutomatic];
        //        [shareDialog setShareContent:content];
        //        [shareDialog setDelegate:self];
        //        [shareDialog setFromViewController:self.viewController];
        //        [shareDialog show];
    }];
    
    
}



- (void) invite: (CDVInvokedUrlCommand*) command {
    NSArray* args = command.arguments;
    NSString* appLinkUrl;
    NSString* appInvitePreviewImageURL;
    
    if([args count] > 0) {
        appLinkUrl = [args objectAtIndex: 0];
        if([args count] > 1) {
            appInvitePreviewImageURL = [args objectAtIndex: 1];
        }
    } else {
        return [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"No Arguments Supplied"] callbackId:command.callbackId];
    }

    self.dialogCallbackId = command.callbackId;
    
    FBSDKAppInviteContent *content =[[FBSDKAppInviteContent alloc] init];
    content.appLinkURL = [NSURL URLWithString:appLinkUrl];
    //optionally set previewImageURL
    content.appInvitePreviewImageURL = [NSURL URLWithString:appInvitePreviewImageURL];
    
    // present the dialog. Assumes self implements protocol `FBSDKAppInviteDialogDelegate`
    
    [FBSDKAppInviteDialog showWithContent:content
                                 delegate:self];
    

    
//    NSMutableDictionary *cdvResult = [NSMutableDictionary dictionary];
//    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:cdvResult] callbackId:command.callbackId];
}

- (void) graphRequest: (CDVInvokedUrlCommand *) command {
    CDVCommandStatus status;
    NSArray* args = command.arguments;
    NSString* path;
    NSDictionary* params;

    if([args count] > 0) {
         path = [args objectAtIndex: 0];
    } else {
        status = CDVCommandStatus_ERROR;
        return [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:status messageAsString:@"Cannot make Graph Request without a Path"] callbackId:command.callbackId];
    }

    if([args count] > 1) {
        params = [args objectAtIndex: 1];
    }

    FBSDKGraphRequest *req = [[FBSDKGraphRequest alloc] initWithGraphPath:path parameters:nil];

    [req startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
        if (!error) {
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:result] callbackId:command.callbackId];
        } else {
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]] callbackId:command.callbackId];
        }
    }];
}

- (void) onAppDidFinishLaunching: (NSNotification*) notification
{
    self.app = (UIApplication*)[notification object];
    NSDictionary* userInfo = [notification userInfo];
    if(userInfo != nil) {
        // The app was launched via a URL or shared app resource.
        NSURL* url = [userInfo objectForKey: UIApplicationLaunchOptionsURLKey];
        NSString* fromApp = [userInfo objectForKey: UIApplicationLaunchOptionsSourceApplicationKey];
        id annotation = [userInfo objectForKey: UIApplicationLaunchOptionsAnnotationKey];
        
        [self setFacebookApplication:self.app
                             withURL:url
                   sourceApplication:fromApp
                          annotation:annotation];
    } else {
        [self setFacebookApplication:self.app withLaunchOptions:userInfo];
    }
}

- (void) onAppDidBecomeActive: (NSNotification*) notification
{
    [self setFacebookActive];
}

- (void) onHandleOpenURL: (NSNotification*) notification
{
    NSURL* url = (NSURL*)[notification object];

    [self setFacebookApplication:self.app withURL:url sourceApplication:@"com.apple.mobilesafari" annotation:nil];
}

- (void) setFacebookApplication:(UIApplication*)application withLaunchOptions: (NSDictionary*)launchOptions
{
    [[FBSDKApplicationDelegate sharedInstance] application:application
                             didFinishLaunchingWithOptions:launchOptions];
}


- (void) setFacebookApplication:(UIApplication*)application withURL: (NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
    [[FBSDKApplicationDelegate sharedInstance] application:application
                                                   openURL:url
                                         sourceApplication:sourceApplication
                                                annotation:annotation];
}

- (void) setFacebookActive
{
    if(self.fbAppId != nil) {
        [FBSDKSettings setAppID:self.fbAppId];
    }
    [FBSDKAppEvents activateApp];
}




# pragma mark - FBSDKSharingDelegate

- (void)sharer:(id<FBSDKSharing>)sharer didCompleteWithResults:(NSDictionary *)results {
    if (!self.dialogCallbackId) {
        return;
    }
    
    CDVPluginResult *pluginResult;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                 messageAsDictionary:results];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.dialogCallbackId];
    self.dialogCallbackId = nil;
}

- (void)sharer:(id<FBSDKSharing>)sharer didFailWithError:(NSError *)error {
    if (!self.dialogCallbackId) {
        return;
    }
    
    CDVPluginResult *pluginResult;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                     messageAsString:[NSString stringWithFormat:@"Error: %@", error.description]];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.dialogCallbackId];
    self.dialogCallbackId = nil;
}

- (void)sharerDidCancel:(id<FBSDKSharing>)sharer {
    if (!self.dialogCallbackId) {
        return;
    }
    
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                      messageAsString:@"User cancelled."];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.dialogCallbackId];
    self.dialogCallbackId = nil;
}


# pragma mark FBSDKAppInviteDialogDelegate
- (void)appInviteDialog:(FBSDKAppInviteDialog *)appInviteDialog didCompleteWithResults:(NSDictionary *)results{
    NSLog(@"FB: INVITE didCompleteWithResults\n");
    if (!self.dialogCallbackId) {
        return;
    }
    
    CDVPluginResult *pluginResult;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                 messageAsDictionary:results];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.dialogCallbackId];
    self.dialogCallbackId = nil;
}
- (void)appInviteDialog:(FBSDKAppInviteDialog *)appInviteDialog didFailWithError:(NSError *)error{
    NSLog(@"FB: INVITE didFailWithError\n");
    if (!self.dialogCallbackId) {
        return;
    }
    
    CDVPluginResult *pluginResult;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                     messageAsString:[NSString stringWithFormat:@"Error: %@", error.description]];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.dialogCallbackId];
    self.dialogCallbackId = nil;
}

@end




#pragma mark - AppDelegate Overrides

@implementation AppDelegate (CDVFacebook)

void FBMethodSwizzle(Class c, SEL originalSelector) {
    NSString *selectorString = NSStringFromSelector(originalSelector);
    SEL newSelector = NSSelectorFromString([@"swizzled_" stringByAppendingString:selectorString]);
    SEL noopSelector = NSSelectorFromString([@"noop_" stringByAppendingString:selectorString]);
    Method originalMethod, newMethod, noop;
    originalMethod = class_getInstanceMethod(c, originalSelector);
    newMethod = class_getInstanceMethod(c, newSelector);
    noop = class_getInstanceMethod(c, noopSelector);
    if (class_addMethod(c, originalSelector, method_getImplementation(newMethod), method_getTypeEncoding(newMethod))) {
        class_replaceMethod(c, newSelector, method_getImplementation(originalMethod) ?: method_getImplementation(noop), method_getTypeEncoding(originalMethod));
    } else {
        method_exchangeImplementations(originalMethod, newMethod);
    }
}

+ (void)load
{
    FBMethodSwizzle([self class], @selector(application:openURL:sourceApplication:annotation:));
}

- (void)noop_application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
}

- (void)swizzled_application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
    if (!url) {
        return;
    }
    // Required by FBSDKCoreKit for deep linking/to complete login
    [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
    
    // Call existing method
    [self swizzled_application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
    
    // NOTE: Cordova will run a JavaScript method here named handleOpenURL. This functionality is deprecated
    // but will cause you to see JavaScript errors if you do not have window.handleOpenURL defined:
    // https://github.com/Wizcorp/phonegap-facebook-plugin/issues/703#issuecomment-63748816
    NSLog(@"FB handle url: %@", url);
}
@end