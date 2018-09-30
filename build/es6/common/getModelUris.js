export function getModelUris(uri, defaultModelName) {
    var defaultManifestFilename = defaultModelName + "-weights_manifest.json";
    if (!uri) {
        return {
            modelBaseUri: '',
            manifestUri: defaultManifestFilename
        };
    }
    if (uri === '/') {
        return {
            modelBaseUri: '/',
            manifestUri: "/" + defaultManifestFilename
        };
    }
    var protocol = uri.startsWith('http://') ? 'http://' : uri.startsWith('https://') ? 'https://' : '';
    uri = uri.replace(protocol, '');
    var parts = uri.split('/').filter(function (s) { return s; });
    var manifestFile = uri.endsWith('.json')
        ? parts[parts.length - 1]
        : defaultManifestFilename;
    var modelBaseUri = protocol + (uri.endsWith('.json') ? parts.slice(0, parts.length - 1) : parts).join('/');
    modelBaseUri = uri.startsWith('/') ? "/" + modelBaseUri : modelBaseUri;
    return {
        modelBaseUri: modelBaseUri,
        manifestUri: modelBaseUri === '/' ? "/" + manifestFile : modelBaseUri + "/" + manifestFile
    };
}
//# sourceMappingURL=getModelUris.js.map