export interface IVizConfig {
  type: string;
  conf: Record<string, any>;
}

export interface IDataSource {
  type: 'postgresql',
  key: string;
  sql: string;
}

export interface IDashboardPanel {
  id: string;
  title: string;
  description: string;
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
    moved?: boolean;
    static?: boolean;
  },
  dataSource: IDataSource;
  viz: IVizConfig;
}

export enum DashboardMode {
  Use = 'use',
  Edit = 'edit',
}

export interface ISQLSnippet {
  key: string;
  value: string;
}

export interface IDashboardDefinition {
  sqlSnippets: ISQLSnippet[];
}

export interface IDashboard {
  id: string;
  name: string;
  definition: IDashboardDefinition;
  panels: IDashboardPanel[];
}