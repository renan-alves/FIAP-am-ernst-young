import { TableCellViewModel } from "./TableCellViewModel";

export class TableRowViewModel {
  key: string;
  rowData: { [key: string]: TableCellViewModel };
}
