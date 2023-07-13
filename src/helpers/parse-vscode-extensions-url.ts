export default function parseVSCodeExtensionsUrl(publisher: string, extensionName: string, version: string) {
    return `https://marketplace.visualstudio.com/_apis/public/gallery/publishers/${publisher}/vsextensions/${extensionName}/${version}/vspackage`;
}