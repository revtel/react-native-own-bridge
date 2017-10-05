//
//  <%= moduleName %>.h
//

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#import "RCTEventEmitter.h"
#else
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#endif

@interface <%= moduleName %> : RCTEventEmitter <RCTBridgeModule> {
    
}

@end
