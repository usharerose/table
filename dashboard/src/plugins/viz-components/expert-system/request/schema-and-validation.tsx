import { Badge, Group, Tabs, Text } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { useRequest } from 'ahooks';
import { useMemo } from 'react';
import { IExpertSystemConf } from '../type';
import { getExpertDataSchema } from './schema';
import Ajv from 'ajv';
const ajv = new Ajv();

function ValidationErrors({ errors }: { errors: string | null | undefined | Array<any> }) {
  if (!errors) {
    return <Text size="sm">Great! Data is valid for expert system</Text>;
  }
  if (typeof errors === 'string') {
    return <Text size="sm">{errors}</Text>;
  }
  return (
    <Prism my={8} language="json" sx={{ width: '100%' }} noCopy colorScheme="dark">
      {JSON.stringify(errors, null, 2)}
    </Prism>
  );
}

interface ISchemaAndValidation {
  conf: IExpertSystemConf;
  data: $TSFixMe[];
}
export function SchemaAndValidation({ conf, data }: ISchemaAndValidation) {
  const { data: schema = {} } = useRequest(async () => getExpertDataSchema(conf), {
    refreshDeps: [conf.scenario, conf.metric_set],
  });
  const { valid, errors } = useMemo(() => {
    try {
      if (!schema || !schema.type) {
        return {
          valid: false,
          errors: `Schema file for this ${conf.scenario}.${conf.metric_set} is missing`,
        };
      }
      const validate = ajv.compile({ ...schema });
      const valid = validate(data);
      return {
        valid,
        errors: validate.errors,
      };
    } catch (error) {
      console.error(error);
      return {
        valid: false,
        // @ts-expect-error message
        errors: error.message,
      };
    }
  }, [conf, data, schema]);

  if (!schema) {
    return null;
  }
  return (
    <Tabs defaultValue="validation">
      <Tabs.List>
        <Tabs.Tab value="validation">
          Validation <Badge color={valid ? 'green' : 'red'}>{valid ? 'Pass' : 'Failed'}</Badge>
        </Tabs.Tab>
        <Tabs.Tab value="schema">Data Schema</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="validation" pt={6}>
        <ValidationErrors errors={errors} />
      </Tabs.Panel>
      <Tabs.Panel value="schema" pt={6}>
        <Prism my={8} language="json" sx={{ width: '100%' }} noCopy colorScheme="dark">
          {JSON.stringify(schema, null, 2)}
        </Prism>
      </Tabs.Panel>
    </Tabs>
  );
}
