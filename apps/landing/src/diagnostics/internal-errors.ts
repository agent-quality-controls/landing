export function missingLandingPageContentError(entryId: string): Error {
  return new Error(`Missing landing content entry: ${entryId}`);
}

export function invalidLandingPageContentError(entryId: string): Error {
  return new Error(`Invalid landing content entry: ${entryId}`);
}
