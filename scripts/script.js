const jogosAnterioresUrl = 'assets/jogos-anteriores.json';

const ul = document.querySelector('ul');
const btnGerarNumeros = document.querySelector('button');

window.onload = () => {
    ul.innerHTML = '';
}

function gerarNumeroAleatorio(min = 1, max = 60) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function novoJogo() {
    const numeros = [];

    for (let i = 0; i < 6; i++) {
        const numero = gerarNumeroAleatorio();

        if (numeros.includes(numero)) {
            let resultadoDeuCerto = false;

            while (!resultadoDeuCerto) {
                const novoNumero = gerarNumeroAleatorio();

                if (!numeros.includes(novoNumero)) {
                    numeros.push(novoNumero);
                    resultadoDeuCerto = true;
                }
            }
        } else {
            numeros.push(numero);
        }
    }

    numeros.sort((a, b) => a - b);

    return numeros;
}

function adicionarAoHTML(numero) {
    const numeroFormatado = numero.toString().padStart(2, '0');

    const span = document.createElement('span');
    span.classList.add('text-3xl', 'font-medium');
    span.innerHTML = numeroFormatado;
    
    const div = document.createElement('div');
    div.className = 'bg-blue-200 rounded-full w-20 h-20 flex justify-center items-center transition ease-linear group-hover:-translate-y-4 group-hover:drop-shadow-lg';
    div.appendChild(span);

    const li = document.createElement('li');
    li.classList.add('group', 'px-2');
    li.appendChild(div);

    ul.appendChild(li);
}

fetch(jogosAnterioresUrl)
.then(resposta => {
    return resposta.json();
})
.then(respostaEmJson => {

    btnGerarNumeros.onclick = () => {
        ul.innerHTML = '';
        let numeros = novoJogo();
    
        for (const jogoAnterior of respostaEmJson) {
    
            let possuiNumeroDiferente = false;
    
            for (const num of numeros) {
                if (!jogoAnterior.numbers.includes(num)) {
                    possuiNumeroDiferente = true;
                }
            }
    
            if (!possuiNumeroDiferente) {
                numeros = novoJogo();
                break;
            }
        }
    
        for (const [index, num] of numeros.entries()) {
            setTimeout(() => {
                adicionarAoHTML(num);
            }, 1000 * index);
        }
    }
});
