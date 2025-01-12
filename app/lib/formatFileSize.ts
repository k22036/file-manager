export const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const kilobytes = bytes / 1024;
    if (kilobytes < 1024) return `${kilobytes.toFixed(2)} KB`;
    const megabytes = kilobytes / 1024;
    if (megabytes < 1024) return `${megabytes.toFixed(2)} MB`;
    const gigabytes = megabytes / 1024;
    return `${gigabytes.toFixed(2)} GB`;
};