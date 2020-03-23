import { LightningElement, track } from 'lwc';

const urlViacep = 'https://viacep.com.br/ws/';

export default class ConsultaCEP extends LightningElement {

    @track cep;
    @track rua;
    @track bairro;
    @track cidade;
    @track uf;
    @track loaded = true;

    handleChangeCEP(event) {
        this.cep = event.target.value;
    }

    handleBlurCEP(event) {
        this.loaded = false;
        fetch(`${urlViacep + this.cep}/json/`, // End point URL
            {
                // Request type
                method: "GET",
            })
            .then((response) => {
                return response.json(); // returning the response in the form of JSON
            })
            .then((jsonResponse) => {

                let responseObj = jsonResponse;

                this.cep = responseObj['cep'];
                this.rua = responseObj['logradouro'];
                this.bairro = responseObj['bairro'];
                this.cidade = responseObj['localidade'];
                this.uf = responseObj['uf'];

                this.loaded = true;
            })
            .catch(error => {
                window.console.log('callout error ===> ' + JSON.stringify(error));
            })
    }
}