

export function includesWord(text: string, word:string): boolean {
    const regex = new RegExp(`${word}`, 'i');
    return regex.test(text);
}