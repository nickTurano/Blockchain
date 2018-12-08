interface Block{
    data: string;
    previousHash: string;
    nonce: number;
    blockHash: string;
}

export default Block