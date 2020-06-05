function populateUFs(){
    const ufSelect = document.querySelector('select[name=uf]')
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then( response => response.json()).then(states =>{

        for(let state of states ){

            ufSelect.innerHTML +=`<option value="${state.id}">${state.nome}</option>`

        }

        

    })
}

populateUFs()

function getCities(event){

    const citySelect = document.querySelector('[name=city]')
    const stateInput=document.querySelector('[name=state]')

    const ufValue= event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value= event.target.options[indexOfSelectedState].text

    const url=`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML="<option value> Selecione a cidade </option"
    citySelect.disabled=true

    fetch(url)
    .then(response => response.json() ).then(cities => {
        
        for(let city of cities){
            citySelect.innerHTML +=`<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled= false
    })

}




document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)


//Itens de Coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(let item of itemsToCollect){
    item.addEventListener('click', handleSelectedItem)
}
const collectedItems=document.querySelector('input[name=items]')

let selectedItems =[]

function handleSelectedItem(event){
    const itemLi = event.target
    
    //adicionar ou remover uma classe com javaScript

    itemLi.classList.toggle("selected")

    const itemId=itemLi.dataset.id

    

   
    //Verificar se existem itens selecionados, se sim
    //pegar os itens selecionados

    const alreadySelected= selectedItems.findIndex( (item) =>{
        const itemFound = item == itemId
        return itemFound
    })

    //se ja estiver selecionado tirar da seleção
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter( (item) =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        
        selectedItems = filteredItems
    }else{
        //se nao tiver selecionado adicionar na seleção

        selectedItems.push(itemId)

    }

    
    //atualizer o campo escondido com os items atualizados
    
    collectedItems.value=selectedItems

}