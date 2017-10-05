import { NativeModules, Platform } from 'react-native';

const <%= moduleName %> = NativeModules.<%= moduleName %>;

export default {
    echo: function(message) {
        return new Promise((resolve, reject) => {
            <%= moduleName %>.echo(message, (err, result) => {
                resolve(result);
            })
        })
    },
}
