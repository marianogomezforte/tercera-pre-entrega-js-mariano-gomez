class Alumno{
    nombre;
    apellido;
    nota1;
    nota2;
    nota3;
    promedio;

    constructor (nombre,apellido,nota1,nota2,nota3) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
        this.promedio = (nota1 + nota2 + nota3)/3;      
    }
}