import { TranslationPatch } from '~/types/plugin';

const en = {
  table: {
    viz_name: 'Table',
    column: {
      labels: 'Columns',
      delete: 'Delete this column',
      query_id: 'Query',
      query_id_hint: 'Load table data from this query',
      use_original_data_columns: 'Use original data columns',
      width: 'Width',
      min_width: 'Min Width',
      max_width: 'Max Width',
      cell_background: 'Cell background',
      custom_cell_content: 'Custom cell content',
      value_type: {
        label: 'Value Type',
        string: 'String',
        number: 'Number',
        percentage: 'Percentage',
        eloc: 'ELOC',
        custom: 'Custom',
      },
    },
    style: {
      horizontal_spacing: 'Horizontal Spacing',
      vertical_spacing: 'Vertical Spacing',
      striped: 'Striped',
      highlight_on_hover: 'Hightlight on hover',
    },
    click_cell: {
      label: 'Click cell content',
      click_cell_content: 'Click cell content (click to config)',
      click_cell_of_x: 'Click cell of {{ x }}',
      choose_a_column: 'Choose a column',
    },
  },
};

const zh = {
  table: {
    viz_name: '表格',
    column: {
      labels: '列设置',
      delete: '删除这个列',
      query_id: '表格数据来源',
      query_id_hint: '通过所选的查询获取表格数据',
      use_original_data_columns: '使用数据本身的列',
      width: '宽度',
      min_width: '最小宽度',
      max_width: '最大宽度',
      cell_background: '单元格背景',
      custom_cell_content: '自定义单元格内容',
      value_type: {
        label: '数据类型',
        string: '文本',
        number: '数字',
        percentage: '百分比',
        eloc: 'ELOC',
        custom: '自定义',
      },
    },
    style: {
      horizontal_spacing: '水平间距',
      vertical_spacing: '垂直间距',
      striped: '隔行变色',
      highlight_on_hover: '鼠标悬停时高亮整行',
    },
    click_cell: {
      label: '点击单元格',
      click_cell_content: '点击单元格内容',
      click_cell_of_x: '点击 {{ x }} 列单元格',
      choose_a_column: '选择列',
    },
  },
};

export const translation: TranslationPatch = [
  {
    lang: 'en',
    resources: en,
  },
  {
    lang: 'zh',
    resources: zh,
  },
];
