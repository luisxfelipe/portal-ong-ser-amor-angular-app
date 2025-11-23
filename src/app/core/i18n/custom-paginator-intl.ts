import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();

    // Tradução dos Rótulos
    this.itemsPerPageLabel = 'Itens por página:';
    this.nextPageLabel = 'Próxima página';
    this.previousPageLabel = 'Página anterior';
    this.firstPageLabel = 'Primeira página';
    this.lastPageLabel = 'Última página';

    // Personalização do texto "1 – 10 de 100"
    this.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }

      length = Math.max(length, 0);
      const startIndex = page * pageSize;

      // Se o índice inicial ultrapassar o tamanho, retorna 0 de X
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;

      return `${startIndex + 1} – ${endIndex} de ${length}`;
    };
  }
}
