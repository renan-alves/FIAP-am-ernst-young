import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Caretaker } from 'src/app/_commom/caretaker';
import { CaretakerFactory } from 'src/app/_factories/caretaker.factory';
import { isNullOrUndefined } from 'src/app/_commom/util';

/**
 * Componente select dropdown da Matrix.
 *
 * @usageNotes Forneça um array de objetos a propriedade ```[objectList]="[{id: 1, codigo: 'xpto', descricao: 'descricao xpto'},..]"``` e
 * associe chave e descrição: [objectValue]="'id'" ```[objectCode]="'codigo'"``` e ```[objectDescription]="'descricao'"```.
 *
 * Por padrão, mx-select-dropdown é seleção multípla, no entanto é possível defini-lo como seleção única
 * atráves da propriedade [multipleSelect]="false". Outras customizações também são fornecidas pelo componente atráves dos
 * Input's.
 *
 * Para que a funcionalidade [disable] funcione, o SelectDropdownComponent adiciona uma popriedade .disabled
 * nos itens da lista objectList. Logo, caso a lista objectList fornecida ao SelectDropdownComponent já possua a propriedade disabled
 * isso irá atrapalhar a funcionalidade [disable] do componente como um todo.
 */
@Component({
  selector: 'select-drop-down',
  templateUrl: './select-drop-down.component.html',
  styleUrls: ['./select-drop-down.component.scss'],
})
export class SelectDropdownComponent implements OnInit, OnChanges {
  // Variaveis de controle

  /**
   * Ao clicar no botão para exibir somente os itens selecionados, essa variável faz o controle.
   */
  private showingSelected = false;

  /**
   * Guarda estados da lista de objetos do select-dropdown
   */
  private objectListCaretaker: Caretaker<any[]>;

  private internalObjectList = [];
  get objectList() {
    return this.internalObjectList;
  }
  /**
   * Lista de possível valores a serem selecionados no dropdown.
   *
   * @usageNotes Lista de objetos ```[objectList]="[{codigo: 'xpto', nome: 'nome xpto'},..]"```
   *
   * @defaultValue ```[]```
   */
  @Input() set objectList(lst: any[]) {
    this.internalObjectList = lst;
  }

  /**
   * Campo que torna os objetos disponibilizados no [objectList] únicos
   * e será o valor retornado quando solicitado um item do select-dropdown.
   *
   * @usageNotes string - ```[objectValue]="'id'"```
   *
   * @defaultValue ```undefined```
   */
  @Input() objectValue: string;

  /**
   * Campo do objeto que representa o código dele.
   *
   * @usageNotes string - ```[objectCode]="'codigo'"```
   *
   * @defaultValue ```undefined```
   */
  @Input() objectCode: string;

  /**
   * Campo apenas para efeito visua, caso ainda queira usar somente o ID, mas exibir o código
   *
   * @usageNotes string - ```[objectCodigo]="'codigo'"```
   *
   * @defaultValue ```vazio('')```
   */
  @Input() objectCodigo = '';

  /**
   * Campo do objeto que demostra uma descrição dele.
   *
   * @usageNotes string - ```[objectDescription]="'nome'"```
   *
   * @defaultValue ```undefined```
   */
  @Input() objectDescription: string;

  /**
   * Placeholder do mx-select-dropdown.
   *
   * @defaultValue ```'Selecione'```
   */
  @Input() fieldPlaceholder = 'Selecione';

  /**
   * Habilita/Desabilita a possibilidade de limpar a seleção
   *
   * @defaultValue ```true```
   */
  @Input() enableClear = true;

  /**
   * Habilita/Desabilita o filtro para pesquisa de itens no dropdown.
   *
   * @defaultValue ```true```
   */
  @Input() enableSearch = true;

  /**
   * Habilita/Desabilita seleção multípla.
   *
   * @defaultValue ```true```
   */
  @Input() multipleSelect = true;

  /**
   * Habilita/Desabilita carregamento dos itens em paginação conforme o scroll vai descendo.
   *
   * @defaultValue ```false```
   */
  @Input() virtualScrollable = false;

  /**
   * Habilita/Desabilita fechar a seleção após selecionar um item.
   *
   * @defaultValue ```false```
   */
  @Input() closeOnSelect = false;

  /**
   * Texto para quando nenhum item for encontrado.
   *
   * @defaultValue ```'Nenhum item encontrado'```
   */
  @Input() notFoundText = 'Nenhum item encontrado';

  /**
   * Habilita/Desabilita botões de marcar todos e desmarcar todos.
   *
   * @usageNotes Caso seja seleção única e não multípla, informar esse atributo como false
   *
   * @defaultValue ```true```
   */
  @Input() enableButtonsCheck = true;

  /**
   * Habilita/Desabilita Checkbox's na opções do dropdown.
   *
   * @defaultValue ```true```
   */
  @Input() styleCheckbox = true;

  /**
   * Limita a quantidade de itens para exibição
   *
   * @usageNotes Caso a quantidade de itens ultrapasse o número fornecido a este atributo, será mostrado um botão
   * ao lado com a quantidade de itens a mais selecionados.
   *
   * @defaultValue ```3```
   */
  @Input() showMaxSelectedItens = 3;

  /**
   * Tooltip ao passar o mouse em cima do icone "x".
   *
   * @defaultValue ```'Limpar todos'```
   */
  @Input() textClearAll = 'Limpar todos';

  /**
   * Texto para exibir quando chegar no limite de exibição dos selecionados.
   *
   * @defaultValue ```'mais...'```
   */
  @Input() textToShowMore = 'mais...';

  /**
   * Exibe detalhes sobre o objeto a ser selecionado.
   *
   * @defaultValue ```false```
   */
  @Input() showObjectDetails = false;

  /**
   * Informa quais propriedades precisa ser mostrado nos detalhes.
   *
   * @defaultValue ```[]```
   */
  @Input() detailsObjectList: any[] = [];

  /**
   * Habilita/Desabilita botão/ícone personalizado para cada item no dropdown.
   *
   * @defaultValue ```false```
   */
  @Input() showActionButton = false;

  /**
   * Classe CSS do ícone do actionButton.
   *
   * @defaultValue ```undefined```
   */
  @Input() actionIcon: any;

  /**
   * Descrição a ser exibida em tooltip no botão de ação
   */
  @Input() actionButtonTooltip: string;

  /**
   * Nome do FormControl no form
   *
   * @usageNotes Caso não seja fornecida, o SelectDropdownComponent se responsabiliza por
   * procurar dentro do FormGroup passado pelo atributo [form] se o FormControl já foi criado ou não.
   * Caso não tenha sido instanciado, ele irá atribuir o FormControl 'seletor' ao FormGroup fornecido.
   *
   * @defaultValue ```'seletor'```
   */
  @Input() nameFormControl = 'seletor';

  /**
   * FormGroup no qual o [nameFormControl] irá pertencer.
   *
   * @usageNotes Caso não seja fornecida, o SelectDropdownComponent se responsabiliza por criar um
   * formulário proprio e instânciar o seu FormControl nele.
   *
   * @defaultValue ```undefined```
   */
  @Input() form: FormGroup;

  /**
   * Habilita/Desabilita o componente mx-select-dropdown
   *
   * @usageNotes Recomendando para quando se precisa visualizar itens já selecionados no dropdown
   * mesmo quando o componente estiver desabilitado.
   *
   * @defaultValue ```false```
   */
  @Input() disable = false;

  /**
   * Habilita/Desabilita o componente mx-select-dropdown completamente.
   *
   * @usageNotes Não é possível abrir o dropdown para visualizar os itens já selecionados. Sobrescreve o input disable.
   *
   * @defaultValue ```false```
   */
  @Input() set completelyDisable(condition: boolean) {
    if (typeof condition !== 'boolean') {
      return;
    }
    this.disable = condition;
    const action = condition ? 'disable' : 'enable';
    Promise.resolve().then(() => this.form.get(this.nameFormControl)[action]());
  }

  /**
   * Habilita/Desabilita esconder itens já previamente selecionados.
   *
   * @defaultValue ```false```
   */
  @Input() hideSelected = false;

  /**
   * Quantidade de itens selecionados permitidos de uma vez só.
   *
   * @defaultValue ```Infinity```
   */
  @Input() maxSelectedItems = Infinity;

  /**
   * CSS Selector indicando onde o ng-dropdown-painel deve ser construído
   *
   * @defaultValue ```body''``` Normalmente deixa o ng-select tomar essa responsabilidade
   * e montar automaticamente, no entanto existem casos que não é possível deixá-lo fazer isso.
   * Exemplo: mx-select-dropdown dentro do mx-editable-table-template
   */
  @Input() appendTo: string;

  @Input() tabIndex: number;

  // Outputs

  /**
   * Evento acionado quando um item é adicionado a lista de selecionados.
   *
   * @param $event - Item selecionado.
   *
   * @usageNotes __Este evento somente é emitido quando [multipleSelect]="true".__
   */
  @Output() itemSelected = new EventEmitter();

  /**
   * Evento acionado quando um item é removido da lista de selecionados.
   *
   * @param $event - Item retirado.
   *
   * @usageNotes __Este evento somente é emitido quando [multipleSelect]="true".__
   */
  @Output() itemDeselected = new EventEmitter();

  /**
   * Evento acionado quando todos os itens são adicionados a lista de selecionados.
   *
   * @param $event - Itens selecionados
   *
   * @usageNotes __Este evento somente é emitido quando [multipleSelect]="true".__
   */
  @Output() allItensSelected = new EventEmitter();

  /**
   * Evento acionado quando todos os itens são removidos da lista de selecionados.
   *
   * @param $event - undefined
   *
   * @usageNotes __Este evento somente é emitido quando [multipleSelect]="true".__
   */
  @Output() allItensDeselected = new EventEmitter();

  /**
   * Evento acionado o mx-select-dropdown perde o foco.
   *
   * @param $event - undefined
   */
  @Output() dropdownFocusOut = new EventEmitter();

  /**
   * Evento acionado quando o valor do mx-select-dropdown muda.
   *
   * @param $event - Lista de itens selecionados. Quando for seletor único irá trazer somente o item selecionado.
   */
  @Output() modelChange = new EventEmitter();

  /**
   * Evento acionado quando o dropdown é fechado.
   *
   * @param $event - undefined
   */
  @Output() dropdownClose = new EventEmitter();

  /**
   * Evento acionado quando é clicado no "x" para limpar itens selecionados.
   *
   * @param $event - undefined
   */
  @Output() dropdownClear = new EventEmitter();

  /**
   * Evento acionado quando o mx-select-dropdown ganha foco na tela.
   *
   * @param $event - undefined
   */
  @Output() dropdownFocused = new EventEmitter();

  /**
   * Evento acionado quando realizado filtro de pesquisa.
   *
   * @param $event - Filtro da pequisa e itens filtrados.
   */
  @Output() changeFiltering = new EventEmitter();

  /**
   * Evento acionado quando o dropdown é aberto.
   *
   * @param $event - undefined
   */
  @Output() dropdownOpened = new EventEmitter();

  /**
   * Evento acionado quando o dropdown tem o scroll indo para cima ou para baixo.
   *
   * @param $event - Provê o index do começo e do final dos itens atualmente sendo mostrados no dropdown.
   *
   * @usageNotes Este evento pode ser usado para carregar dinamicamente o resto da lista antes que o usuário chegue ao final dela.
   */
  @Output() dropdownScrolled = new EventEmitter();

  /**
   * Evento acionado quando o scroll do dropdown chega ao final.
   *
   * @param $event - Provê o index do começo e do final dos itens atualmente sendo mostrados no dropdown.
   *
   * @usageNotes Este evento pode ser usado para carregar dinamicamente o resto da lista após o usuário chegar no final dela.
   */
  @Output() dropdownScrolledToEnd = new EventEmitter();

  /**
   * Evento acionado quando clica no botão de ação personalizada.
   *
   * @param $event - Item no qual a ação personalizada foi realizada.
   */
  @Output() actionButtonClicked = new EventEmitter();

  /**
   *  Recupera ng-select
   */
  @ViewChild('selectComponent') selectComponent: NgSelectComponent;

  constructor(private fb: FormBuilder, private caretakerFactory: CaretakerFactory) {}

  ngOnInit() {
    this.objectListCaretaker = this.caretakerFactory.create(1);

    if (!this.form) {
      this.form = this.fb.group({
        [this.nameFormControl]: [],
      });
    } else if (!this.form.contains(this.nameFormControl)) {
      this.form.addControl(this.nameFormControl, this.fb.control(null));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!isNullOrUndefined(changes.disable) || !isNullOrUndefined(changes.objectList)) {
      this.toogleDisableItens();
    }
  }

  getControl() {
    return this.form.get(this.nameFormControl);
  }

  onAdd(event: any) {
    // Dispara evento com o objeto selecionado
    this.itemSelected.emit(event);
  }

  onRemove(event: any) {
    // Dispara evento com item desmarcado
    this.itemDeselected.emit(event);
  }

  onSelectAll(event: any) {
    // Atualiza lista de selecionados passando todos os itens da lista de objetos
    const objectSelectedList = this.objectList.map((x) => x[this.objectValue]);

    // Adiciona selecionados ao formulário
    this.form.get(this.nameFormControl).patchValue(objectSelectedList);

    this.selectComponent.close();

    // Dispara evento com a lista de selecionados
    this.allItensSelected.emit(objectSelectedList);
  }

  onUnselectAll(event: any) {
    this.form.get(this.nameFormControl).reset();

    this.selectComponent.close();

    // Dispara evento
    this.allItensDeselected.emit();
  }

  onBlur(event: any) {
    this.dropdownFocusOut.emit(event);
  }

  onChange(event: any) {
    // Se está em modo multiplo, deveria ser recebido um array com os itens selecionados
    if (this.multipleSelect && event && event instanceof Array) {
      this.modelChange.emit(event);
    } else if (!this.multipleSelect) {
      // Caso contrário apenas um item selecionado
      this.modelChange.emit(event);
    }
  }

  onClose(event: any) {
    this.dropdownClose.emit(event);
  }

  onClear(event: any) {
    this.dropdownClear.emit(event);
  }

  onFocus(event: any) {
    this.dropdownFocused.emit(event);
  }

  onSearch(event: any) {
    this.changeFiltering.emit(event);
  }

  onOpen(event: any) {
    if (this.disable && !this.showingSelected) {
      this.showOnlySelecteds();
    } else if (!this.disable && this.showingSelected) {
      this.backToPrevious();
    }
    this.dropdownOpened.emit(event);
  }

  onScroll(event: any) {
    this.dropdownScrolled.emit(event);
  }

  onScrolledToEnd(event: any) {
    this.dropdownScrolledToEnd.emit(event);
  }

  onActionClicked(event: any, item: any) {
    // Evita collapse do accordion
    event.stopPropagation();

    // Faz com que href não cause acesso á página pelo browser
    event.preventDefault();

    this.actionButtonClicked.emit(item);
  }

/*   onFilter = (term: any, item: any) => {
    // Termo digitado na pesquisa transformado em minusculo
    term = term.toLocaleLowerCase();

    // Recupera descrição do item
    const itemDesc = item[this.objectDescription].toLocaleString().toLocaleLowerCase();

    // Recupera id do item
    const itemCode = item[this.objectCode].toLocaleString().toLocaleLowerCase();

    // Retorna itens que a descrição contém o termo ou o id
    return itemDesc.includes(term) || itemCode.includes(term);
  };
 */
  focus() {
    this.selectComponent.focus();
  }

  clear(item: any) {
    this.selectComponent.clearItem(item);
  }

  showOnlySelecteds() {
    this.showingSelected = true;
    this.objectListCaretaker.toRemind(this.objectList);
    this.objectList = this.selectComponent.selectedItems.map((x) => x.value);
  }

  backToPrevious() {
    this.showingSelected = false;
    this.objectList = this.objectListCaretaker.remind(0);
  }

  toogleShowOnlySelected() {
    if (this.showingSelected && !this.disable) {
      this.backToPrevious();
    } else if (!this.showingSelected) {
      this.showOnlySelecteds();
    }
  }

  private toogleDisableItens() {
    // Se existem itens (opções), atualiza propriedade disable para refletir no componente ng-select
    // Precisa utilizar a propriedade interna para não causar stackoverflow
    if (this.internalObjectList) {
      this.internalObjectList = this.internalObjectList.map((item) => {
        item.disabled = this.disable;
        return item;
      });
    }
  }
}
