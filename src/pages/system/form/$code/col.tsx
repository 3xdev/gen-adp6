import {
  Designer,
  DesignerToolsWidget,
  ViewToolsWidget,
  Workspace,
  OutlineTreeWidget,
  HistoryWidget,
  StudioPanel,
  CompositePanel,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  ViewPanel,
  SettingsPanel,
  ComponentTreeWidget,
  ResourceListWidget,
} from '@pind/designable-react';
import { SettingsForm, setNpmCDNRegistry } from '@pind/designable-react-settings-form';
import { createDesigner, GlobalRegistry, Shortcut, KeyCode } from '@pind/designable-core';
import {
  PreviewWidget,
  SchemaEditorWidget,
  MarkupSchemaWidget,
} from '@pind/designable-formily-antd/playground/widgets';

import { ActionsWidget } from '../components/widgets';
import { saveSchema } from '../components/service';
import { sources } from '@pind/designable-formily-antd/lib';
import { Alert } from 'antd';
import userMeno from '../components/hook/useMeno';
import './col.scss';
setNpmCDNRegistry('//unpkg.com');
const { ErrorBoundary } = Alert;
GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
      Displays: '展示组件',
    },
  },
});

const visualization: React.FC = () => {
  const engine = userMeno({ createDesigner, Shortcut, KeyCode, saveSchema });
  return (
    <Designer engine={engine}>
      <StudioPanel actions={<ActionsWidget />}>
        <CompositePanel>
          <CompositePanel.Item title="panels.Component" icon="Component">
            <ResourceListWidget sources={Object.values({ ...sources })} />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanel.Item>
        </CompositePanel>
        <Workspace id="form">
          <WorkspacePanel>
            <ErrorBoundary>
              <ToolbarPanel>
                <DesignerToolsWidget />
                <ViewToolsWidget use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']} />
              </ToolbarPanel>
              <ViewportPanel style={{ height: '100%' }}>
                <ViewPanel type="DESIGNABLE">
                  {() => <ComponentTreeWidget components={{ ...sources }} />}
                </ViewPanel>
                <ViewPanel type="JSONTREE" scrollable={false}>
                  {(tree: any, onChange: any) => (
                    <SchemaEditorWidget tree={tree} onChange={onChange} />
                  )}
                </ViewPanel>
                <ViewPanel type="MARKUP" scrollable={false}>
                  {(tree: any) => <MarkupSchemaWidget tree={tree} />}
                </ViewPanel>
                <ViewPanel type="PREVIEW">{(tree: any) => <PreviewWidget tree={tree} />}</ViewPanel>
              </ViewportPanel>
            </ErrorBoundary>
          </WorkspacePanel>
        </Workspace>
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm />
        </SettingsPanel>
      </StudioPanel>
    </Designer>
  );
};

export default visualization;
