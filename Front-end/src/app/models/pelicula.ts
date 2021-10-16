export class Pelicula{
    constructor(
        public id:number,
        public imagen:string,
        public titulo:string,
        public descripcion:string,
        public duracion:string,
        public trailer:string,
        public fecha_estreno:Date,
    ){}
}