export function commonHttpHeaders(userId: number): Object {
    const headers = new Headers();
    headers.append('USERID', userId.toString());

    return {headers};
}