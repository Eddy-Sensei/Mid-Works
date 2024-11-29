import { merge } from 'webpack-merge'
import commonConfig from './webpack.common.js'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export default merge(
    commonConfig,
    {
        mode: 'production',
        plugins:
        [
            new CleanWebpackPlugin()
        ]
    }
)
