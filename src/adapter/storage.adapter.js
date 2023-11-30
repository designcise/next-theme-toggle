export const read = (key) => {
    const matches = `; ${document.cookie}`.match(`;\\s*${key}=([^;]+)`);
    return matches?.[1] ?? null;
}

export const write = (key, value, ttl = 365) => {
    const date = new Date();
    date.setTime(date.getTime() + (ttl * 24 * 60 * 60 * 1000));
    const expires = `; expires=${date.toGMTString()}`;

    document.cookie = `${key}=${value}${expires}; path=/`;
}

export const erase = (key) => {
    write(key, '', -1);
}
