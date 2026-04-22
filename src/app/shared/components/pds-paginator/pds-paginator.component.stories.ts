import type { Meta, StoryObj } from '@storybook/angular';
import { PdsPaginatorComponent } from './pds-paginator.component';

const meta: Meta<PdsPaginatorComponent> = {
  title: 'DS v2/Paginator',
  component: PdsPaginatorComponent,
  tags: ['autodocs'],
  argTypes: {
    totalItems: { control: 'number' },
    pageSize: { control: 'select', options: [10, 20, 50, 100] },
    currentPage: { control: 'number' },
    pageSizeOptions: { control: 'object' },
    showPageSizeSelector: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<PdsPaginatorComponent>;

/** Estado por defecto: primera página, 500 ítems, 20 por página. */
export const Default: Story = {
  args: {
    totalItems: 500,
    pageSize: 20,
    currentPage: 1,
    pageSizeOptions: [10, 20, 50, 100],
    showPageSizeSelector: true,
  },
};

/** Página intermedia: los botones de navegación prev/next están activos. */
export const PaginaIntermedia: Story = {
  args: {
    totalItems: 500,
    pageSize: 20,
    currentPage: 5,
    pageSizeOptions: [10, 20, 50, 100],
    showPageSizeSelector: true,
  },
};

/** Última página: los botones siguiente y última página están deshabilitados. */
export const UltimaPagina: Story = {
  args: {
    totalItems: 500,
    pageSize: 20,
    currentPage: 25,
    pageSizeOptions: [10, 20, 50, 100],
    showPageSizeSelector: true,
  },
};

/** Sin selector de items por página — solo estado y navegación. */
export const SinSelectorPagina: Story = {
  args: {
    totalItems: 200,
    pageSize: 50,
    currentPage: 2,
    showPageSizeSelector: false,
  },
};

/** Pocos resultados: una sola página — todos los controles de navegación deshabilitados. */
export const PocosResultados: Story = {
  args: {
    totalItems: 8,
    pageSize: 20,
    currentPage: 1,
    pageSizeOptions: [10, 20, 50, 100],
    showPageSizeSelector: true,
  },
};

/** Página de 50 ítems seleccionada. */
export const PageSize50: Story = {
  args: {
    totalItems: 500,
    pageSize: 50,
    currentPage: 3,
    pageSizeOptions: [10, 20, 50, 100],
    showPageSizeSelector: true,
  },
};
