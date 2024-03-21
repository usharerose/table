export const zh = {
  translation: {
    filter: {
      label: '筛选器',
      labels: '筛选器',
      add: '新增筛选器',
      manage: '管理筛选器',
      show_filters: '展开筛选器',
      hide_filters: '收起筛选器',
      field: {
        widget: '控件',
        visible_in: '在...视图中可见',
        key_placeholder: '用于引用此筛选器，需保持唯一',
        label_placeholder: '用于展示的标签文案',
        auto_submit: '自动提交',
        order: '排列次序',
      },
      widget: {
        names: {
          select: '单选',
          multi_select: '多选',
          tree_select: '树形选择器',
          text_input: '文本框',
          checkbox: '勾选框',
          date_range: '日期范围',
        },
        common: {
          use_query_data_as_options: '使用所查数据为选项',
          or_fetch_options_from_datasource: '或从数据源查选项',
        },
        text_input: {
          default_value: '默认值',
          required: '必填',
        },
        select: {
          width: '控件宽度',
          required: '必选',
          configure_options: '配置选项',
          default_selection: '默认选项',
          no_default_selection: '无',
          select_first_option_by_default: '默认选中第一个选项',
        },
      },
    },
    view: {
      label: '视图',
      labels: '视图',
      add: '新增视图',
      download_schema: '下载此视图描述文件',
    },
    interactions: {
      label: '交互',
      add: '新增交互',
      interactions_viewer: '纵览交互',
    },
    query_variable: {
      label: '查询变量',
      labels: '查询变量',
      add: '新增变量',
      guide: {
        tabs: {
          guide: '使用指南',
          variables_in_this_dashboard: '本看板中的查询变量',
          global_sql_snippets: '全局SQL片段',
        },
      },
      open: '查看查询变量',
    },
    sql_snippet: {
      label: 'SQL片段',
      labels: 'SQL片段',
      add: '新增SQL片段',
      delete: '删除这个SQL片段',
      delete_unused: '删除未用到的SQL片段',
      manage: '管理SQL片段',
      usage: {
        label: '使用情况',
      },
    },
    global_sql_snippet: {
      label: '全局SQL片段',
      labels: '全局SQL片段',
      description: '管理员负责在系统设置中维护全局SQL片段',
    },
    common: {
      titles: {
        settings: '设置',
        edit: '编辑',
        config: '配置',
      },
      id: 'ID',
      name: '名称',
      key: '键',
      label: '标签',
      value: '值',
      type: '类型',
      info: '信息',
      data_field: '数据字段',
      action: '操作',
      actions: {
        open: '打开',
        close: '关闭',
        save: '保存',
        save_changes: '保存改动',
        revert: '还原',
        revert_changes: '还原改动',
        reset_to_default: '重置为初始值',
        select_all: '全选',
        clear_selection: '撤销选择',
        refresh: '刷新',
        download_data: '下载数据',
        download_schema: '下载描述文件',
        download_screenshot: '下载截图',
        enter_fullscreen: '全屏',
        duplicate: '复制',
        delete: '删除',
        cancel: '取消',
        confirm: '确认',
        add_an_option: '新增选项',
      },
    },
    breakpoint: {
      label_one: '屏幕尺寸',
      label_other: '屏幕尺寸',
      add: '新增屏幕尺寸',
      manage: '管理屏幕尺寸',
      breakpoint: '最小宽度',
    },
    context: {
      label: '上下文',
    },
    mock_context: {
      label: '模拟上下文',
      hint: '内容格式为JSON',
    },
    panel: {
      label: '卡片',
      labels: '卡片',
      add: '新增卡片',
      delete: '删除这个卡片',
      panel_name: '卡片名',
      panel_description: '卡片描述',
      show_title: '展示卡片标题',
      use_name_as_title: '使用卡片名作为标题',
      settings: {
        change_view: '移至另一个视图下',
        change_view_title: '移动此卡片至另一个视图下',
        choose_queries: '关联查询',
      },
      style: {
        label: '样式',
        width: '宽',
        width_postfix: '之 36 栏',
        height: '高',
        height_postfix: 'px',
        border: '边框',
      },
      variable: {
        label: '变量',
        labels: '变量',
        add: '新增变量',
        delete: '删除此变量',
        aggregation: {
          label: '聚合',
          fallback_value: '兜底值',
          fallback_value_description: '当数据为空或聚合结果非数字时，使用此兜底值',
        },
        styles: {
          label: '样式',
          font_size: {
            label: '字号',
            placeholder: '10px, 1em, 1rem, 100%...',
          },
          font_weight: {
            label: '字重',
          },
        },
      },
    },
    query: {
      label: '查询',
      labels: '查询',
      add: '新增查询',
      delete: '删除这个查询',
      cant_delete: '此查询在使用中，不能删除。请查看“使用情况”标签页以了解详情',
      delete_unused: '删除未用到的查询',
      name: '名称',
      name_description: '唯一名称',
      manage: '管理查询',
      open: '打开此查询',
      configurations: '配置',
      basics: '基本信息',
      conditions: '条件',
      run_by_condition: {
        label: '以下条件满足时，才运行本查询',
        unset: '看板加载时便运行本查询',
      },
      re_run_condition: {
        label: '当以下条件改变时，重新运行此查询',
        unset: '留空则永不重新运行此查询',
      },
      dependency: {
        label: '依赖',
        has_none: '此查询无依赖',
      },
      edit_sql: '编辑SQL',
      preview_sql: '预览SQL',
      request: '请求',
      build_request: '构造请求',
      process_request: '加工请求',
      process_result: '加工结果',
      usage: {
        label: '使用情况',
        in_views: '所在视图',
      },
    },
    data: {
      label: '数据',
      preview_data: '预览数据',
      empty_data: '无数据',
    },
    data_source: {
      label: '数据源',
      explore: '查看数据源',
      explorer: '数据源查看器',
      see_table_structure: '查看数据表结构',
    },
    visualization: {
      label: '可视化',
      component: '可视化组件',
      label_short: '可视化',
    },
    numbro: {
      format: {
        label: '格式',
        absolute: '绝对值',
        absolute_description: '非负',
        abbreviation: '缩写',
        abbreviation_description: '如1.23k、1.23m',
        mantissa: '小数',
        trim_mantissa: '抹零',
        trim_mantissa_description: '省略末尾的零',
        preview: {
          open: '展开预览',
          close: '收起预览',
          input: '输入',
          output: '输出',
        },
      },
    },
    import: {
      label: '导入...',
      cant: '请先选择一个标签页',
      title: '自描述文件导入看板内容',
      json_file: '描述文件（JSON格式）',
      this_dashboard: '此看板',
      this_file: '此文件',
    },
  },
};
