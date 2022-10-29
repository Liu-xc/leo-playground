import React, { useMemo } from 'react';
import {
  Route,
  Routes,
  NavLink,
  useLocation,
  Navigate,
} from 'react-router-dom';
import DynamicFormPlayground from '../pages/dynamic-form';
import { Menu, Layout } from 'antd';
import styles from './app.module.less';

export function App() {
  const location = useLocation();

  const selectedKeys = useMemo(() => [location.pathname], [location]);

  return (
    <Layout className={styles.fullpage}>
      <Layout.Sider theme="light">
        <Menu
          selectedKeys={selectedKeys}
          items={[
            {
              key: '/dashboard',
              label: (
                <NavLink key="dashboard" to="/dashboard">
                  首页
                </NavLink>
              ),
            },
            {
              key: '/dynamic-form',
              label: (
                <NavLink key="Formily" to="/dynamic-form">
                  Formily
                </NavLink>
              ),
            },
          ]}
          onSelect={(e) => console.log(e)}
        />
      </Layout.Sider>
      <Layout.Content className={styles['content']}>
        <Routes>
          <Route
            caseSensitive
            path="/dashboard"
            element={<div>hello react !</div>}
          ></Route>
          <Route
            caseSensitive
            path="/dynamic-form"
            element={<DynamicFormPlayground />}
          />
          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          ></Route>
        </Routes>
      </Layout.Content>
    </Layout>
  );
}

export default App;
