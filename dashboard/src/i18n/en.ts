export const en = {
  translation: {
    filter: {
      label: 'Filter',
      labels: 'Filters',
      add: 'Add a Filter',
      manage: 'Manage Filters',
      show_filters: 'Show Filters',
      hide_filters: 'Hide Filters',
      field: {
        widget: 'Widget',
        visible_in: 'Visible in...',
        key_placeholder: 'A unique key to refer',
        label_placeholder: 'Label for this field',
        auto_submit: 'Submit automatically',
        order: 'Placement Order',
        custom_default_value: {
          trigger: 'Custom',
          title: 'Custom default value',
          tips: 'Tips',
          tip_1: "Function has the highest priority of getting filter's default value",
          tip_2: 'Leave this editor empty to disable this feature',
        },
      },
      widget: {
        names: {
          select: 'Select',
          multi_select: 'Multi Select',
          tree_select: 'Tree Select',
          text_input: 'Text Input',
          checkbox: 'Checkbox',
          date_range: 'Date Range',
        },
        common: {
          use_query_data_as_options: 'Use query data as options',
          fetch_options_from_datasource: 'Fetch options from datasource',
          or_fetch_options_from_datasource: 'Or fetch options from datasource',
          selector_option_empty: 'Not found',
          see_data_structure: 'Click to see expected data structure',
          using_query: 'Using query',
          default_selection_count: 'Select first N options by default',
          min_width: 'Min width',
          x_selected: '{{count}} selected',
        },
        text_input: {
          default_value: 'Default Value',
          required: 'Required',
        },
        select: {
          width: 'Width',
          required: 'Required',
          clearable: 'Clearable',
          configure_options: 'Configure options',
          default_selection: 'Default Selection',
          no_default_selection: 'none',
          select_first_option_by_default: 'Select the first option by default',
        },
        multi_select: {
          width_description: 'At least 160px',
        },
        tree_select: {
          strictly: 'Parent and children nodes are not associated',
        },
        checkbox: {
          description: 'Description',
          default_checked: 'Default checked',
        },
        date_range: {
          required: 'Required',
          allow_single_date: 'Allow choosing 1 day',
          display_format: 'Display format',
          max_days: 'Max days',
          one_day: '1 day',
          x_days: '{{count}} days',
          x_max_days: '{{max_days}} days max',
          default_value: 'Default value',
          default_by_shortcut: 'Default by shortcut',
          defualt_by_shortcut_placeholder: 'Priors default value',
          start_date: 'Start date',
          end_date: 'End date',
          shortcut: {
            last: {
              label: 'last',
              d: 'yesterday',
              w: 'week',
              m: 'month',
              m2: '2 months',
              m3: '3 months',
              y: 'year',
              full: {
                d: 'yesterday',
                w: 'last week',
                m: 'last month',
                m2: 'last 2 months',
                m3: 'last 3 months',
                y: 'last year',
              },
            },
            recent: {
              label: 'recent',
              d7: '7 days',
              d30: '30 days',
              d60: '60 days',
              d90: '90 days',
              d180: '180 days',
              d365: '365 days',
              full: {
                d7: 'recent 7 days',
                d30: 'recent 30 days',
                d60: 'recent 60 days',
                d90: 'recent 90 days',
                d180: 'recent 180 days',
                d365: 'recent 365 days',
              },
            },
            this: {
              label: 'this',
              d: 'today',
              w: 'week',
              m: 'month',
              y: 'year',
              full: {
                d: 'today',
                w: 'this week',
                m: 'this month',
                y: 'this year',
              },
            },
            this_so_far: {
              label: 'this...so far',
              w: 'week',
              m: 'month',
              y: 'year',
              full: {
                w: 'this week so far',
                m: 'this month so far',
                y: 'this year so far',
              },
            },
          },
        },
      },
    },
    view: {
      label: 'View',
      labels: 'Views',
      add: 'Add a View',
      delete: 'Delete this View',
      download_schema: 'Download this View',
      component: {
        div: {
          label: 'Division',
        },
        tabs: {
          label: 'Tabs',
          tabs_settings: 'Tabs Settings',
          tab: {
            name: 'Tab Name',
            view: 'View',
            order: 'Placement Order',
            color: 'Color',
            delete: 'Delete this tab',
            switch_to_view: 'Swith to View: {{name}}',
          },
        },
        modal: {
          label: 'Modal',
          modal_settings: 'Modal settings',
          title: 'Modal Title',
          custom_title: 'Customize modal title',
          width: 'Width',
          height: 'Height',
        },
      },
    },
    interactions: {
      label: 'Interactions',
      add: 'Add an interaction',
      interactions_viewer: 'Interactions Viewer',
      unavailable: 'Unavailable',
      unavailable_reason: 'This visualization does not have available interactions to choose from',
      trigger: {
        setup: 'Setup Trigger',
        label: 'Trigger',
        payload: 'Payload',
      },
      operation: {
        setup: 'Operation Settings',
        label: 'Operation',
        settings: 'Settings',
        variables: 'Variables',
        console_log: {
          label: 'console.log | debug',
          log_content: 'log content',
        },
        open_link: {
          label: 'Open Link',
          url: 'URL',
          open_in_new_tab: 'Open in new tab',
        },
        open_view: {
          label: 'Open View',
          view: 'View',
        },
        set_filter_values: {
          label: 'Set Filter Values',
          set_filter: 'Set filter',
          with: 'with',
        },
        clear_filter_values: {
          label: 'Clear Filter Values',
          select_filter: 'Select filters to clear',
        },
      },
    },
    query_variable: {
      label: 'Query Variable',
      labels: 'Query Variables',
      add: 'Add a Variable',
      guide: {
        tabs: {
          guide: 'Guide',
          variables_in_this_dashboard: 'Variables in this dashboard',
          global_sql_snippets: 'Global SQL Snippets',
        },
      },
      open: 'See Query Variables',
    },
    sql_snippet: {
      label: 'SQL Snippet',
      labels: 'SQL Snippets',
      add: 'Add a SQL Snippet',
      delete: 'Delete this SQL Snippet',
      delete_unused: 'Delete unused SQL Snippets',
      manage: 'Manage SQL Snippets',
      key: 'Key',
      key_occupied: 'This key is occupied by another snippet',
      edit_snippet: 'Edit SQL Snippet',
      preview_snippet: 'Preview SQL Snippet',
      usage: {
        label: 'Usage',
      },
    },
    global_sql_snippet: {
      label: 'Global SQL Snippet',
      labels: 'Global SQL Snippets',
      description: 'SQL snippets worth sharing between dashboards are managed in System Settings by admins.',
    },
    common: {
      titles: {
        settings: 'Settings',
        edit: 'Edit',
        config: 'Config',
      },
      pagination: {
        page_size: 'Page Size',
        total: 'Total',
        total_rows: 'Total {{total}} row',
      },
      align: {
        horizontal: {
          label: 'Horizontal Align',
          left: 'left',
          center: 'center',
          right: 'right',
        },
        vertical: {
          label: 'Vertical Align',
          left: 'top',
          center: 'center',
          right: 'bottom',
        },
      },
      id: 'ID',
      name: 'Name',
      key: 'Key',
      label: 'Label',
      value: 'Value',
      type: 'Type',
      info: 'Info',
      min: 'Min',
      max: 'Max',
      data_field: 'Data Field',
      name_data_field: 'Name Data Field',
      value_data_field: 'Value Data Field',
      color_data_field: 'Color Data Field',
      enabled: 'Enabled',
      copied: 'Copied to clipboard',
      action: 'Action',
      actions: {
        open: 'Open',
        close: 'Close',
        save: 'Save',
        save_changes: 'Save Changes',
        revert: 'Revert',
        revert_changes: 'Revert Changes',
        reset_to_default: 'Reset to default',
        select_all: 'Select All',
        clear_selection: 'Clear Selection',
        refresh: 'Refresh',
        download_data: 'Download Data',
        download_schema: 'Download Schema',
        download_screenshot: 'Screenshot',
        enter_fullscreen: 'Full Screen',
        duplicate: 'Duplicate',
        delete: 'Delete',
        cancel: 'Cancel',
        confirm: 'Confirm',
        add_an_option: 'Add an Option',
        edit: 'Edit',
        end_editing: 'End editing <1>{{name}}</1>',
      },
      tabs: {
        variant: {
          label: 'Variant',
          default: 'Default',
          outline: 'Outline',
          pills: 'Pills',
        },
        orientation: {
          label: 'Orientation',
          horizontal: 'Horizontal',
          vertical: 'Vertical',
        },
        grow_tabs: 'Grow Tabs',
      },
      choose_a_tab_first: 'Please choose a tab first',
    },
    breakpoint: {
      label_one: 'Screen size',
      label_other: 'Screen sizes',
      add: 'Add a screen size',
      manage: 'Manage screen sizes',
      breakpoint: 'Min Width',
    },
    context: {
      label: 'Context',
    },
    mock_context: {
      label: 'Mock Context',
      hint: 'A valid json string is required',
    },
    panel: {
      label: 'Panel',
      labels: 'Panels',
      add: 'Add a Panel',
      delete: 'Delete This Panel',
      panel_name: 'Panel Name',
      panel_description: 'Description',
      panel_description_click: 'Click to see description',
      show_title: 'Show title',
      use_name_as_title: 'Use name as title',
      settings: {
        change_view: 'Move into Another View',
        change_view_title: 'Move panel into another view',
        choose_queries: 'Choose queries',
      },
      style: {
        label: 'Style',
        width: 'Width',
        width_postfix: 'of 36 columns',
        height: 'Height',
        height_postfix: 'px',
        border: 'Border',
      },
      variable: {
        label: 'Variable',
        labels: 'Variables',
        add: 'Add a Variable',
        delete: 'Delete this Variable',
        aggregation: {
          label: 'Aggregation',
          fallback_value: 'Fallback Value',
          fallback_value_description: 'Used when data is empty or the aggregation yields NaN',
        },
      },
    },
    style: {
      label: 'Style',
      font_size: {
        label: 'Font Size',
        placeholder: '10px, 1em, 1rem, 100%...',
      },
      font_weight: {
        label: 'Font Weight',
      },
      size: {
        xs: 'xs',
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
      },
      flex: {
        justify_content: {
          label: 'Justify Content',
          left: 'Left',
          center: 'Center',
          right: 'Right',
          space_between: 'Space Between',
          space_around: 'Space Around',
          space_evenly: 'Space Evenly',
        },
        align_items: {
          label: 'Align Items',
          start: 'Start',
          center: 'Center',
          end: 'End',
          stretch: 'Stretch',
        },
      },
      color: {
        type: {
          label: 'Color Type',
          static: 'Static',
          interpolation: 'Interpolation',
          none: 'None',
        },
        interpolation: {
          setup: 'Setup color interpolation',
          palette: {
            label: 'Palette',
            category: {
              sequential: 'Sequential',
              diverging: 'Diverging',
            },
            red_green: 'Red / Green',
            yellow_blue: 'Yellow / Blue',
            red: 'Red',
            green: 'Green',
            blue: 'Blue',
            orange: 'Orange',
            mapping: {
              value_input_label: 'Map a value to this color',
            },
          },
        },
      },
    },
    query: {
      label: 'Query',
      labels: 'Queries',
      add: 'Add a Query',
      delete: 'Delete this Query',
      cant_delete: "Can't delete this query for it's being used, check out Usage tab for details",
      delete_unused: 'Delete unused queries',
      name: 'Name',
      name_description: 'A unique name',
      manage: 'Manage Queries',
      open: 'Open this query',
      configurations: 'Configurations',
      basics: 'Basics',
      conditions: 'Conditions',
      run_by_condition: {
        label: 'Run query when these are truthy',
        unset: 'Always run this query on load',
      },
      re_run_condition: {
        label: 'Re-run query when these changed',
        unset: 'Leave it empty to never re-run this query',
      },
      dependency: {
        label: 'Dependency',
        has_none: 'This query has no dependency',
      },
      edit_sql: 'Edit SQL',
      preview_sql: 'Preview SQL',
      request: 'Request',
      build_request: 'Build Request',
      process_request: 'Process Request',
      process_result: 'Process Result',
      usage: {
        label: 'Usage',
        in_views: 'In View(s)',
        unused_description: 'This query is not used by any filter or panel',
      },
      transform: {
        label: 'Transform',
        data_source: "Use other queries' data",
        guide: {
          pick_queries: 'Pick queries for data input',
          write_function: 'Write a function for making new data',
        },
      },
    },
    data: {
      label: 'Data',
      preview_data: 'Preview Data',
      empty_data: 'Empty Data',
    },
    data_source: {
      label: 'Data Source',
      explore: 'Explore Data Source',
      explorer: 'Data Source Explorer',
      table_structure: 'Table Structure',
      table_structure_short: 'Structure',
      see_table_structure: 'See Table Structure',
    },
    visualization: {
      label: 'Visualization',
      component: 'Visualization',
      label_short: 'Viz',
    },
    numbro: {
      format: {
        label: 'Format',
        absolute: 'Absolute',
        absolute_description: 'Non-negative',
        abbreviation: 'Abbreviation',
        abbreviation_description: 'like 1.23k, 1.23m',
        mantissa: 'Mantissa',
        trim_mantissa: 'Trim mantissa',
        trim_mantissa_description: 'hide trailing zero(s)',
        preview: {
          open: 'Open Preview',
          close: 'Close Preview',
          input: 'In',
          output: 'Out',
        },
      },
    },
    import: {
      label: 'Import...',
      title: 'Import content with schema json',
      json_file: 'JSON File',
      this_dashboard: 'This dashboard',
      this_file: 'This file',
    },
    function_utils: {
      trigger_text: "About parameter 'utils'",
      modal_title: 'About FunctionUtils',
      description: 'Parameter <code>utils</code> is <code>FunctionUtils</code>, which contains:',
      document: 'Document',
    },
    aggregation: {
      option: {
        none: 'None',
        sum: 'Sum',
        mean: 'Mean',
        median: 'Median',
        min: 'Min',
        max: 'Max',
        cov: 'Coefficient of Variation',
        std: 'Standard Variation',
        quantile: {
          label: 'Quantile',
          label_with_hint: 'Quantile(99%, 95%, ...)',
        },
        custom: {
          label: 'Custom',
          label_trigger: 'Edit Function',
          title: 'Custom Aggregation',
        },
      },
    },
    chart: {
      chart_config: 'Chart Config',
      data_field: 'Data Field',
      groups: {
        merico_suite: 'Merico suite',
        echarts_based_charts: 'ECharts-based charts',
        others: 'Others',
      },
      label: {
        label: 'Label',
        label_full: 'Label',
        label_style: 'Label Style',
        label_format: 'Label Format',
      },
      label_position: {
        label: 'Label Position',
        off: 'Off',
        top: 'Top',
        left: 'Left',
        right: 'Right',
        bottom: 'Bottom',
        inside: 'Inside',
        inside_top: 'Inside Top',
        inside_left: 'Inside Left',
        inside_center: 'Inside Center',
        inside_right: 'Inside Right',
        inside_bottom: 'Inside Bottom',
        inside_top_left: 'Inside Top Left',
        inside_top_right: 'Inside Top Right',
        inside_bottom_left: 'Inside Bottom Left',
        inside_bottom_right: 'Inside Bottom Right',
        outside: 'Outside',
      },
      number_or_dynamic_value: {
        type: {
          static: 'Static',
          dynamic: 'Dynamic',
        },
        dynamic: {
          setup: 'Setup',
          setup_title: 'Setup dynamic value',
          guide: 'Dyanmic by a custom function',
        },
      },
      orientation: {
        label: 'Orientation',
        horizontal: 'Horizontal',
        vertical: 'Vertical',
      },
      symbol_size: {
        label: 'Symbol Size',
        static: 'Static',
        dynamic: 'Dynamic',
        setup: {
          label: 'Setup',
          title: 'Setup dynamic size',
          description: 'Dynamic by a custom function',
        },
      },
      series: {
        label: 'Series',
        name: 'Name',
        y_axis: 'Y Axis',
        data_field: 'Data Field',
        delete: 'Delete this series',
        line: {
          label: 'Line',
          line_settings: 'Line Settings',
          line_style: 'Line Style',
          type: {
            label: 'Line Type',
            solid: 'Solid',
            dashed: 'Dashed',
            dotted: 'Dotted',
          },
          line_width: 'Line Width',
          step: {
            label: 'Step',
            off: 'Off',
            start: 'Start',
            middle: 'Middle',
            end: 'End',
          },
          smooth_line: 'Smooth Line',
          show_name_on_line: 'Display Name on Line',
          show_symbol_on_line: 'Show Symbol on Line',
        },
        bar: {
          label: 'Bar',
          stack: 'Stack',
          stack_hint: 'Stack bars by this ID',
          bar_gap: {
            label: 'Bar Gap',
            no_gap: 'No gap between bars',
            overlap: 'Bars overlapping on each other',
          },
          bar_width: {
            min: 'Bar Width(min)',
            exact: 'Bar Width',
            max: 'Bar Width(max)',
          },
        },
        scatter: {
          label: 'Scatter',
        },
        group_by: {
          label: 'Split into multiple seires by this field...',
          label_line: 'Split into multiple lines by this field...',
        },
      },
      axis: {
        tick_label: 'Tick Label',
        customize_label: 'Customize Label',
        overflow: {
          label: 'Overflow',
          max_width: 'Max Width',
          truncate: 'Truncate',
          break_line: 'Break Line',
          break_word: 'Break Word',
          ellipsis: 'Ellipsis',
          section_title: {
            on_axis: 'Overflow on Axis',
            in_tooltip: 'Overflow in Tooltip',
          },
        },
        section_title: {
          label_format: 'Label Format',
        },
        type: {
          value: 'Value',
          category: 'Category',
          time: 'Time',
          log: 'Log',
          click_to_learn_more: 'Click <1>here</1> to learn more about these options',
        },
      },
      name_text: {
        align: {
          label: 'Name Anchor',
          left: 'Left',
          center: 'Center',
          right: 'Right',
        },
      },
      rotate: 'Rotate',
      degree: 'degree',
      padding: 'Padding',
      content_template: {
        label: 'Content Template',
        hint: 'Average: ${avg}',
      },
      x_axis: {
        label: 'X Axis',
        labels: 'X Axes',
        label_format: 'Label Format',
        delete: 'Delete this XAxis',
        x_axis_name: 'X Axis Name',
        x_axis_data_field: 'X Axis Data Field',
        x_axis_type: 'X Axis Type',
        layout: 'Layout',
        position: {
          label: 'Position',
          top: 'Top',
          bottom: 'Bottom',
        },
        value_range: 'Value Range',
        value_min: 'Min',
        value_max: 'Max',
        behavior: 'Behavior',
        visible: 'Visible',
      },
      y_axis: {
        label: 'Y Axis',
        labels: 'Y Axes',
        label_format: 'Label Format',
        delete: 'Delete this YAxis',
        y_axis_name: 'Y Axis Name',
        y_axis_name_anchor: 'Name Anchor',
        y_axis_data_field: 'Y Axis Data Field',
        layout: 'Layout',
        position: {
          label: 'Position',
          left: 'Left',
          right: 'Right',
        },
        value_range: 'Value Range',
        value_min: 'Min',
        value_max: 'Max',
        behavior: 'Behavior',
        visible: 'Visible',
      },
      stats: {
        label: 'Stats',
        template: {
          above_chart: 'Template for stats above the chart',
          under_chart: 'Template for stats under the chart',
        },
      },
      legend: {
        label: 'Legend',
        show_legend: 'Show Legend',
        show_in_legend: 'Show in legend',
        hide_in_legend: 'Hide in legend',
        orientation: {
          label: 'Orientation',
          horizontal: 'Horizontal',
          vertical: 'Vertical',
        },
      },
      tooltip: {
        label: 'Tooltip',
        additional_metrics: {
          description: "Set additional metrics to show in scatter's tooltip",
          delete: 'Delete this Metric',
        },
        trigger: {
          label: 'Trigger',
          scatter_point: 'Scatter Point',
          x_axis: 'X Axis',
        },
      },
      style: {
        label: 'Style',
      },
      color: {
        label: 'Color',
        or: 'or',
        set_any_color: 'Set any color',
        pick_a_theme_color: 'Pick a theme color',
        background_color: 'Background Color',
        text_color: 'Text Color',
      },
      behavior: {
        label: 'Behavior',
        invisible: 'Invisible',
      },
      heatmap: {
        heatblock: {
          label: 'Heat Block',
          min_value: 'Min Value',
          max_value: 'Max Value',
          show_label: 'Show Label',
        },
      },
      reference_line: {
        label: 'Reference Line',
        labels: 'Reference Lines',
        add: 'Add a reference line',
        name_placeholder: 'Average Reference Line',
        delete: 'Remove this Reference Line',
        orientation: {
          vertical_hint: 'Works only when xAxis values are numbers',
        },
      },
      regression_line: {
        label: 'Regression Line',
        labels: 'Regression Lines',
        add: 'Add a line',
        delete: 'Delete this line',
        method: {
          label: 'Method',
          linear: 'Linear',
          exponential: 'Exponential',
          logistic: 'Logistic',
          polynomial: 'Polynomial',
          polynomial_order: 'Order',
        },
      },
      reference_area: {
        label: 'Reference Area',
        labels: 'Reference Areas',
        add: 'Add a reference area',
        delete: 'Remove this reference area',
        type: {
          label: 'Type',
          rectangle: 'Rectangle',
        },
        direction: {
          label: 'Direction',
          horizontal: 'Horizontal',
        },
        boundary: {
          upper: 'Upper Boundary',
          lower: 'Lower Boundary',
        },
        content: {
          label: 'Content',
          content_text: 'Content Text',
          text_position: 'Text Position',
        },
        endpoint: {
          labels: 'Endpoints',
          left_bottom_point: 'Left-Bottom Point',
          right_top_point: 'Right-Top Point',
        },
      },
      zooming: {
        label: 'Zooming',
        scroll: {
          label: 'Scroll to zoom',
          x_axis: 'Enable on X Axis',
          y_axis: 'Enable on Y Axis',
        },
        slider: {
          label: 'Slider for zooming',
          x_axis: 'Slider for X Axis',
          y_axis: 'Slider for Y Axis',
          y_axis_disabled: "Not available for now, will overlap y-axis's label",
        },
      },
    },
    viz: {
      viz_config_banner: 'Visualization Settings',
    },
    validation: {
      number: {
        require_a_number: 'A number is required',
      },
    },
  },
};
