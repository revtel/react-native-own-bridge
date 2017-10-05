package <%= androidPkg %>;

import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;
import android.content.Intent;
import android.util.Log;
import android.app.Activity;
import android.support.annotation.Nullable;
import java.util.Map;

public class <%= moduleName %> extends ReactContextBaseJavaModule {
    private static final String NAME = "<%= moduleName %>";
    private static String sInitialUrl = null;

    public <%= moduleName %>(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void echo(String message, Callback callback) {
        Log.d(NAME, message);
        callback.invoke(null, message);
    }

    private void emitEvent(String eventName, @Nullable WritableMap params) {
        getReactApplicationContext()
            .getJSModule(RCTNativeAppEventEmitter.class)
            .emit(eventName, params);
    }
}
