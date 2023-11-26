export default class Percursos {
    percursos = [];

    async fetchPercursos() {
        try {
            const response = await fetch('http://localhost:3000/api/percurso/listAllPercursos');
            this.percursos = await response.json();
        } catch (error) {
            console.error(error);
        }
    }
}
