import { merge } from 'webpack-merge';
import commonConfig from './webpack.common.js';
import portFinderSync from 'portfinder-sync';
import { internalIpV4 } from 'internal-ip';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const infoColor = (_message) => {
    return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`;
};

export default merge(commonConfig, {
    mode: 'development',
    devServer: {
        host: '0.0.0.0',
        port: portFinderSync.getPort(8080),
        static: {
            directory: path.resolve(__dirname, '../dist'),
        },
        watchFiles: ['../src/**/*'],
        open: true,
        allowedHosts: 'auto',
        client: {
            overlay: true,
            logging: 'warn',
            progress: true,
        },
        server: {
            type: 'http',
        },
        liveReload: true,
        },
    },
);