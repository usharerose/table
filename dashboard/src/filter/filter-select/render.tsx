import { Select } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useModelContext } from '~/contexts';
import { FilterModelInstance } from '../../model';
import { IFilterConfig_Select } from '../../model/filters/filter/select';

interface IFilterSelect extends Omit<FilterModelInstance, 'key' | 'type' | 'config'> {
  config: IFilterConfig_Select;
  value: $TSFixMe;
  onChange: (v: $TSFixMe) => void;
}

export const FilterSelect = observer(({ label, config, value, onChange }: IFilterSelect) => {
  const model = useModelContext();
  const usingRemoteOptions = !!config.options_query_id;
  const { state } = model.getDataStuffByID(config.options_query_id);
  const loading = state === 'loading';

  useEffect(() => {
    if (!config.select_first_by_default) {
      return;
    }
    const newValue = config.options[0]?.value ?? '';
    if (value === newValue) {
      return;
    }

    console.log('Selecting the first option by default. Previous value: ', value, ', new value: ', newValue);
    onChange(newValue);
  }, [config.select_first_by_default, config.options, onChange, value]);

  return (
    <Select
      label={label}
      data={config.options}
      disabled={usingRemoteOptions ? loading : false}
      value={value}
      onChange={onChange}
      styles={{
        input: {
          borderColor: '#e9ecef',
        },
      }}
    />
  );
});
