//
//  <%= moduleName %>.m
//

#import "<%= moduleName %>.h"
#import "React/RCTBridge.h"
#import "React/RCTConvert.h"
#import "React/RCTEventDispatcher.h"

@implementation <%= moduleName %>

RCT_EXPORT_MODULE();

- (instancetype)init
{
    if (self = [super init]) {
        NSLog(@"module created");
    }
    
    return self;
}

// you can then use [self sendEventWithName: body:] to emit an event to JS
- (NSArray<NSString *> *)supportedEvents
{
    return @[
             @"MyNativeEvent",
             ];
}

RCT_EXPORT_METHOD(echo:(NSString *)message callback: (nonnull RCTResponseSenderBlock)callback)
{
  NSLog(@"echo: %@", message);
  callback(@[[NSNull null], message]);
}

@end
