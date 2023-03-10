import React, { FC } from 'react';
import {
  ActionProps,
  BaseActionComponent,
  BasePropertyJSON,
  useCurrentAdmin,
} from 'adminjs';

const CustomAction: FC<ActionProps> = (props) => {
  const [currentAdmin] = useCurrentAdmin();
  const newProps = { ...props };

  newProps.action = { ...newProps.action, component: undefined };

  const filter = (property: BasePropertyJSON, name: string) => {
    if (!property.custom[`${name}`]) return true;
    return (property.custom[`${name}`] as string[]).includes(
      currentAdmin?.role,
    );
  };

  const { resource } = newProps;
  resource.listProperties = resource.listProperties.filter((a) => filter(a, 'list'));
  resource.editProperties = resource.editProperties.filter((a) => filter(a, 'edit'));
  resource.showProperties = resource.showProperties.filter((a) => filter(a, 'show'));
  resource.filterProperties = resource.filterProperties.filter((a) => filter(a, 'filter'));

  return <BaseActionComponent {...newProps} />;
};

export default CustomAction;
