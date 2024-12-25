export function extractAlphanumeric(str:string) {
    // Use regular expression to match only alphanumeric characters
    return str.replace(/[^a-zA-Z0-9]/g, '');
  }