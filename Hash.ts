import * as crypto from 'crypto';

export default function hash(input: string): string{
    return crypto.createHash('sha256').update(input).digest('hex');
}
