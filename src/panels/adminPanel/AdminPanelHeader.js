import React, { useState, useEffect, useReducer } from "react";
import {
  PanelHeaderSimple,
  PanelHeaderBack,
  FixedLayout,
  Tabs,
  TabsItem,
} from "@vkontakte/vkui";

const AdminPanelHeader = ({ go, tab, activeTab }) => {
  return (
    <>
      <PanelHeaderSimple
        left={<PanelHeaderBack onClick={go} data-to="default-panel" />}
      >
        Админ панель
      </PanelHeaderSimple>

      <FixedLayout vertical="top" filled={true}>
        <Tabs>
          <TabsItem
            onClick={() => {
              tab("man");
            }}
            selected={activeTab === "man"}
          >
            Изменение ссылки на группу
          </TabsItem>
          {/* <TabsItem
            onClick={() => {
              tab("woman");
            }}
            selected={activeTab === "woman"}
          >
            Группа для женщин
          </TabsItem> */}
        </Tabs>
      </FixedLayout>
    </>
  );
};

export { AdminPanelHeader };
