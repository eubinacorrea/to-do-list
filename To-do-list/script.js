
const inputTarefa = document.getElementById('inputTarefa');
const btnAdd = document.getElementById('btnAdicionar');
const listaTarefasElemento = document.getElementById('listaTarefas'); 
const mensagemVazia = document.getElementById('mensagemVazia');

let listaDeTarefas = [];

function adicionarTarefa() {
    const tarefa = inputTarefa.value.trim();
    if (tarefa === '') {
        alert('Digite uma tarefa válida');
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        texto: tarefa,
        concluida: false
    };
    listaDeTarefas.push(novaTarefa);
    inputTarefa.value = '';
    inputTarefa.focus();
    atualizarLista();
}

function atualizarLista() {
    listaTarefasElemento.innerHTML = '';
    if (listaDeTarefas.length === 0) {
        mensagemVazia.style.display = 'block';
        return;
    }
    mensagemVazia.style.display = 'none';

    listaDeTarefas.forEach(tarefa => {
        const li = document.createElement('li');
        if (tarefa.concluida) {
            li.classList.add('concluida');
        }
        li.innerHTML = `
                    <span class="texto-tarefa">${tarefa.texto}</span>
                    <div class="botoes-tarefa">
                        <button class="btn-concluir" onclick="marcarConcluida(${tarefa.id})">
                            ${tarefa.concluida ? '↩️ Desfazer' : '✓ Pronto'}
                        </button>
                        <button class="btn-deletar" onclick="deletarTarefa(${tarefa.id})">
                            🗑️ Deletar
                        </button>
                    </div>
                `;
                listaTarefasElemento.appendChild(li);
    });
}

function marcarConcluida(id) {
    const tarefa = listaDeTarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        atualizarLista();
    }
}

function deletarTarefa(id) {
    listaDeTarefas = listaDeTarefas.filter(t => t.id !== id);
    atualizarLista();
}

btnAdd.addEventListener('click', (e) => {
    e.preventDefault();
    adicionarTarefa();
});

inputTarefa.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});
