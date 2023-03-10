import { ActionContext, Before, buildFeature, RecordJSON } from 'adminjs';

const roleAccessControlAfterHook = async (
  response: any,
  _: any,
  context: ActionContext,
) => {
  const { properties } = context.resource
    .decorate()
    .toJSON(context.currentAdmin);
  const targetRole = String(context.currentAdmin?.role.value);
  const propertiesToRemove = Object.entries(properties)
    .filter(
      ([_, { custom }]) =>
        custom.role &&
        String(custom.role) !== targetRole &&
        custom.notInteractableInActions,
    )
    .map(([name]) => name);

  const cleanupRecord = (record: RecordJSON) => {
    propertiesToRemove.forEach((name) => delete record.params[name]);
  };
  if (response.record) {
    cleanupRecord(response.record);
  }
  if (response.records) {
    response.records.forEach(cleanupRecord);
  }
  return response;
};

const roleAccessControlBeforeHook: Before = async (request, context) => {
  const { method, payload } = request;
  if (method !== 'post' || !payload) {
    return request;
  }
  const { properties } = context.resource
    .decorate()
    .toJSON(context.currentAdmin);
  const targetRole = String(context.currentAdmin?.role.value);
  const propertiesToRemove = Object.entries(properties)
    .filter(
      ([_, { custom }]) =>
        custom.role &&
        String(custom.role) !== targetRole &&
        custom.notInteractableInActions,
    )
    .map(([name]) => name);
  propertiesToRemove.forEach((name) => delete payload[name]);
  return request;
};

const defaultValuesBeforeHook: Before = async (request, context) => {
  const { payload, method } = request;
  if (method !== 'post' || !payload || context.action.name !== 'new') {
    return request;
  }
  const { properties } = context.resource
    .decorate()
    .toJSON(context.currentAdmin);
  Object.entries(properties).forEach(([name, { custom }]) => {
    if (custom.defaultValue && payload[name] === undefined) {
      payload[name] = custom.defaultValue;
    }
  });
  return request;
};

export const roleBasedAccessControl = buildFeature((admin) => {
  const CustomAction = admin.componentLoader.add(
    'CustomAction',
    './custom-action',
  );
  return {
    actions: {
      new: {
        component: CustomAction,
        before: [roleAccessControlBeforeHook, defaultValuesBeforeHook],
        after: [roleAccessControlAfterHook],
      },
      edit: {
        component: CustomAction,
        before: [roleAccessControlBeforeHook],
        after: [roleAccessControlAfterHook],
      },
      show: {
        component: CustomAction,
        after: [roleAccessControlAfterHook],
      },
      list: {
        component: CustomAction,
        after: [roleAccessControlAfterHook],
      },
    },
  };
});
