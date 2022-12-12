{
    const path = require("path");
    module.exports = {
        entry: path.resolve(__dirname, "src") + "/MediaHiderPlugin.plugin.js",
        output: {
            filename: "./build/MediaHiderPlugin.plugin.js",
            pathinfo: true,
        },
        resolve: {
            fallback: {
                fs: false,
                tls: false,
                net: false,
                path: false,
                zlib: false,
                http: false,
                https: false,
                stream: false,
                crypto: false,
                request: false,
            },
            extensions: [".tsx", ".ts", ".js"],
        },
        watch: true,
        watchOptions: {
            followSymlinks: true,
        },
        mode: "development",
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.m?tsx$/,
                    exclude: /(node_modules)/,
                    use: {
                        // `.swcrc` can be used to configure swc
                        loader: "swc-loader",
                    },
                },
                {
                    test: /\.ts$/,
                    exclude: /(node_modules)/,
                    use: { loader: "ts-loader" },
                },
                {
                    test: /\.css$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: "css-loader",
                    },
                },
            ],
        },
    };
}
