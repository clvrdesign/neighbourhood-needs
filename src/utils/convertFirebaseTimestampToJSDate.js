export function convertFirebaseTimestampToJSDate(firebaseTimestamp) {
  if (firebaseTimestamp?.seconds && firebaseTimestamp?.nanoseconds) {
    return new Date(
      firebaseTimestamp.seconds * 10 ** 3 +
        firebaseTimestamp.nanoseconds / 10 ** 9
    );
  }
  throw new Error("Date not converted, Invalid Timestamp");
}
