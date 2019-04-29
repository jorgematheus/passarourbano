class ItemCarrinho {
    constructor(
        public id: number,
        public img: object,
        public tituto: string,
        public descricao: string,
        public preco: number,
        public quantidade: number
    ){}
}

export { ItemCarrinho }