import path from 'path'

import TerserPlugin from 'terser-webpack-plugin'
import webpack, { Configuration } from 'webpack'

import { ROOT_PATH } from '../paths'

interface GetCacheConfigOptions {
    invalidateCacheFiles: string[]
}

export const getCacheConfig = ({ invalidateCacheFiles }: GetCacheConfigOptions): Configuration['cache'] => ({
    type: 'filesystem',
    buildDependencies: {
        // Invalidate cache on config change.
        config: [
            ...invalidateCacheFiles,
            path.resolve(ROOT_PATH, 'babel.config.js'),
            path.resolve(ROOT_PATH, 'postcss.config.js'),
        ],
    },
})

export const getTerserPlugin = (): TerserPlugin =>
    new TerserPlugin({
        terserOptions: {
            compress: {
                // Don't inline functions, which causes name collisions with uglify-es:
                // https://github.com/mishoo/UglifyJS2/issues/2842
                inline: 1,
            },
        },
    })

export const getProvidePlugin = (): webpack.ProvidePlugin =>
    new webpack.ProvidePlugin({
        process: 'process/browser',
        // Based on the issue: https://github.com/webpack/changelog-v5/issues/10
        Buffer: ['buffer', 'Buffer'],
    })
